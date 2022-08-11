package com.kob.backend.consumer.utils;

import com.alibaba.fastjson.JSONObject;
import com.kob.backend.consumer.WebSocketServer;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Random;
import java.util.concurrent.locks.ReentrantLock;

public class Game extends Thread {
    private final Integer rows;
    private final Integer cols;
    private final Integer inner_walls_count;
    private final boolean[][] g;
    private final Player playerA, playerB;
    private Integer nextStepA = null;
    private Integer nextStepB = null;
    private ReentrantLock lock = new ReentrantLock();
    private String status = "playing";
    private String loser = ""; // all:平局, A:A输, B:B输

    public Game(Integer rows, Integer cols, Integer inner_walls_count, Integer idA, Integer idB) {
        this.rows = rows;
        this.cols = cols;
        this.inner_walls_count = inner_walls_count;
        this.g = new boolean[rows][cols];
        this.creatMap();
        playerA = new Player(idA, rows - 2, 1, new ArrayList<>());
        playerB = new Player(idB, 1, cols - 2, new ArrayList<>());
    }

    public boolean[][] getG() {
        return g;
    }

    public Player getPlayerA() {
        return playerA;
    }

    public Player getPlayerB() {
        return playerB;
    }

    public void setNextStepA(Integer nextStepA) {
        lock.lock();
        try {
            this.nextStepA = nextStepA;
        } finally {
            lock.unlock();
        }
    }

    public void setNextStepB(Integer nextStepB) {
        lock.lock();
        try {
            this.nextStepB = nextStepB;
        } finally {
            lock.unlock();
        }
    }

    // 尝试创建地图
    private boolean draw() {
        // 初始
        for (int i = 0; i < this.rows; i++) {
            for (int j = 0; j < this.cols; j++) {
                g[i][j] = false;
            }
        }

        // 围墙
        for (int r = 0; r < this.rows; r++) {
            g[r][0] = g[r][this.cols - 1] = true;
        }
        for (int c = 0; c < this.cols; c++) {
            g[0][c] = g[this.rows - 1][c] = true;
        }

        // 创建随机墙
        Random random = new Random();
        for (int i = 0; i < this.inner_walls_count / 2; i++) {
            for (int j = 0; j < 1000; j++) {
                int r = random.nextInt(this.rows);
                int c = random.nextInt(this.cols);
                // 若墙体存在
                if (g[r][c]) continue;
                // 若墙体刷在出生点
                if (r == this.rows - 2 && c == 1 || r == 1 && c == this.cols - 2)
                    continue;

                // 斜边轴对称墙（仅限正方形地图）
                // g[r][c] = g[c][r] = true

                // 中心轴对称墙
                g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true;
                break;
            }
        }

        boolean[][] copy_g = new boolean[g.length][];
        for (int i = 0; i < g.length; i++) {
            copy_g[i] = g[i].clone();
        }
        // 判断连通性
        return check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2);
    }

    // 创建地图
    public void creatMap() {
        for (int i = 0; i < 10000; i++) {
            if (draw()) break;
        }
    }

    // 判断地图连通性
    public boolean check_connectivity(boolean[][] g, int sx, int sy, int tx, int ty) {
        if (sx == tx && sy == ty) return true;
        g[sx][sy] = true;

        int[] dx = {-1, 0, 1, 0}, dy = {0, 1, 0, -1};
        for (int i = 0; i < 4; i++) {
            int x = sx + dx[i], y = sy + dy[i];
            if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty))
                return true;
        }
        return false;
    }

    // 等待两名玩家的下一步操作
    private boolean nextStep() {
        for (int i = 0; i < 10; i++) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            lock.lock();
            try {
                if (nextStepA != null && nextStepB != null) {
                    playerA.getSteps().add(nextStepA);
                    playerB.getSteps().add(nextStepB);
                    return true;
                }
            } finally {
                lock.unlock();
            }
        }

        return false;
    }

    // 判断目标位置合法性
    private boolean check_valid(List<Cell> cellsA, List<Cell> cellsB) {
        int n = cellsA.size();
        Cell cell = cellsA.get(n - 1);
        // 判断是否撞墙
        if (g[cell.x][cell.y]) return false;

        // 判断是否撞到自己
        for (int i = 0; i < n - 1; i++) {
            if (cell.x == cellsA.get(i).x && cell.y == cellsA.get(i).y)
                return false;
        }
        // 判断是否撞到对手
        for (int i = 0; i < n - 1; i++) {
            if (cell.x == cellsB.get(i).x && cell.y == cellsB.get(i).y)
                return false;
        }

        return true;
    }

    // 判断两名玩家操作合法性
    private void judge() {
        List<Cell> cellsA = playerA.getCells();
        List<Cell> cellsB = playerB.getCells();

        boolean validA = check_valid(cellsA, cellsB);
        boolean validB = check_valid(cellsB, cellsA);

        if (!validA || !validB) {
            status = "finished";
            if (!validA && !validB) loser = "all";
            else if (!validA) loser = "A";
            else loser = "B";
        }
    }

    private void sendAllMessage(String message) {
        WebSocketServer.users.get(playerA.getId()).sendMessage(message);
        WebSocketServer.users.get(playerB.getId()).sendMessage(message);
    }

    // 向两个client玩家传递移动信息
    private void sendMove() {
        lock.lock();
        try {
            JSONObject resp = new JSONObject();
            resp.put("event", "move");
            resp.put("a_direction", nextStepA);
            resp.put("b_direction", nextStepB);
            sendAllMessage(resp.toJSONString());
            nextStepA = nextStepB = null;
        } finally {
            lock.unlock();
        }
    }

    // 游戏结束公布结果
    private void sendResult() {
        JSONObject resp = new JSONObject();
        resp.put("event", "result");
        resp.put("loser", loser);
        sendAllMessage(resp.toJSONString());
    }

    @Override
    public void run() {
        for (int i = 0; i < 1000; i++) {
            if (nextStep()) {
                judge();
                if (Objects.equals(status, "playing")) {
                    sendMove();
                } else {
                    sendResult();
                    break;
                }
            } else {
                status = "finished";
                lock.lock();
                try {
                    if (nextStepA == null && nextStepB == null) {
                        loser = "all";
                    } else if (nextStepA == null) {
                        loser = "A";
                    } else if (nextStepB == null) {
                        loser = "B";
                    }
                } finally {
                    lock.unlock();
                }
                sendResult();
                break;
            }
        }
    }
}

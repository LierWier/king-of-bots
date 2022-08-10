package com.kob.backend.consumer.utils;

import java.util.Random;

public class Game {
    private final Integer rows;
    private final Integer cols;
    private final Integer inner_walls_count;
    private final boolean[][] g;

    public Game(Integer rows, Integer cols, Integer inner_walls_count) {
        this.rows = rows;
        this.cols = cols;
        this.inner_walls_count = inner_walls_count;
        this.g = new boolean[rows][cols];
        this.creatMap();
    }

    public boolean[][] getG() {
        return g;
    }

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

    public void creatMap() {
        for (int i = 0; i < 10000; i++) {
            if (draw()) break;
        }
    }

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
}

import {AcGameObject} from "@/assets/scripts/AcGameObject";
import {Wall} from "@/assets/scripts/Wall";

export class GameMap extends AcGameObject {
    constructor(ctx, parent) {
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.L = 0

        this.rows = 13
        this.cols = 13

        this.inner_walls_count = 20
        this.walls = []
    }

    // 检查连同函数
    check_connectivity(g, sx, sy, tx, ty) {
        if (sx === tx && sy === ty) return true
        g[sx][sy] = true

        const dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1]
        for (let i = 0; i < 4; i++) {
            let x = sx + dx[i], y = sy + dy[i]
            if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty))
                return true
        }
        return false
    }

    // 创建墙函数
    create_walls() {
        // 初试布尔数组
        let g = []
        for (let r = 0; r < this.rows; r++) {
            g[r] = []
            for (let c = 0; c < this.cols; c++) {
                g[r][c] = false
            }
        }

        // 围墙
        for (let r = 0; r < this.rows; r++) {
            g[r][0] = g[r][this.cols - 1] = true
        }
        for (let c = 0; c < this.cols; c++) {
            g[0][c] = g[this.rows - 1][c] = true
        }

        // 创建随机墙
        for (let i = 0; i < this.inner_walls_count / 2; i++) {
            for (let j = 0; j < 1000; j++) {
                let r = ~~(Math.random() * this.rows)
                let c = ~~(Math.random() * this.cols)
                // 若墙体存在
                if (g[r][c]) continue
                // 若墙体刷在出生点
                if (r === this.rows - 2 && c === 1
                    || r === 1 && c === this.cols - 2)
                    continue

                // 镜像墙
                g[r][c] = g[c][r] = true
                break
            }
        }

        // 判断连通性
        const copy_g = JSON.parse(JSON.stringify(g))
        if (!this.check_connectivity(copy_g, this.rows - 2 , 1, 1, this.cols - 2)) return false

        // 生成墙
        for (const r in g) {
            for (const c in g[r]) {
                if (g[r][c]) {
                    this.walls.push(new Wall(r, c, this))
                }
            }
        }

        return true
    }

    start() {
        super.start();
        for (let i = 0; i < 1000; i++) {
            // 检查连通 生成墙
            if (this.create_walls()) break
        }
    }

    update_size() {
        // 【~~】解决白缝问题
        this.L = ~~Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows)
        this.ctx.canvas.width = this.L * this.cols
        this.ctx.canvas.height = this.L * this.rows
    }

    update() {
        super.update();
        this.update_size()
        this.render()
    }

    render() {
        const color_even = "#AAD751", color_odd = "#A2D149"
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if ((r + c) % 2 === 0)
                    this.ctx.fillStyle = color_even
                else
                    this.ctx.fillStyle = color_odd
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L)
            }
        }
    }
}
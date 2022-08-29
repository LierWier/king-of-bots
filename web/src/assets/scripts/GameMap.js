import {AcGameObject} from "@/assets/scripts/AcGameObject";
import {Wall} from "@/assets/scripts/Wall";
import {Snake} from "@/assets/scripts/Snake";

export class GameMap extends AcGameObject {
    constructor(ctx, parent, store) {
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.store = store
        this.L = 0

        this.rows = 13
        this.cols = 14

        this.walls = []

        this.snakes = [
            new Snake({
                id: 0,
                color: "#4876EC",
                r: this.rows - 2,
                c: 1
            }, this),
            new Snake({
                id: 1,
                color: "#F94848",
                r: 1,
                c: this.cols - 2
            }, this)
        ]
    }

    // 创建墙函数
    create_walls() {
        const g = this.store.state.battle.game_map
        // 生成墙
        for (let r = 0; r < this.rows; r ++ ) {
            for (let c = 0; c < this.cols; c ++ ) {
                if (g[r][c]) {
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }
    }

    add_listening_events() {
        this.ctx.canvas.focus()
        // const [snake0, snake1] = this.snakes
        this.ctx.canvas.addEventListener("keydown", e => {
            let d = -1
            if (e.key === 'ArrowUp') d = 0
            else if (e.key === 'ArrowRight') d = 1
            else if (e.key === 'ArrowDown') d = 2
            else if (e.key === 'ArrowLeft') d = 3

            if (d >= 0) {
                this.store.state.battle.socket.send(
                    JSON.stringify({
                        event: "move",
                        direction: d
                    })
                )
            }

            // 双人本地操作
            // if (e.key === 'w') snake0.set_direction(0)
            // else if (e.key === 'd') snake0.set_direction(1)
            // else if (e.key === 's') snake0.set_direction(2)
            // else if (e.key === 'a') snake0.set_direction(3)
            // else if (e.key === 'ArrowUp') snake1.set_direction(0)
            // else if (e.key === 'ArrowRight') snake1.set_direction(1)
            // else if (e.key === 'ArrowDown') snake1.set_direction(2)
            // else if (e.key === 'ArrowLeft') snake1.set_direction(3)
        })
    }
    
    add_read_record() {
        let k = 0
        const [snakeA, snakeB] = this.snakes
        const a_steps = this.store.state.record.a_steps
        const b_steps = this.store.state.record.b_steps
        const loser = this.store.state.record.record_loser
        const interval_id = setInterval(() => {
            if (k >= a_steps.length - 1) {
                if (loser === 'all' || loser === "A") {
                    snakeA.status = "die"
                }
                if (loser === "all" || loser === "B") {
                    snakeB.status = "die"
                }
                clearInterval(interval_id)
            } else {
                snakeA.set_direction(~~a_steps[k])
                snakeB.set_direction(~~b_steps[k])
            }
            k++
        }, 300)
    }

    start() {
        this.create_walls()
        
        if (this.store.state.record.is_record) {
            this.add_read_record()
        } else {
            this.add_listening_events()
        }
    }

    update_size() {
        // 【~~】解决白缝问题
        // this.L = ~~Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows)
        this.L = ~~(this.parent.clientWidth / this.cols)
        this.ctx.canvas.width = this.L * this.cols
        this.ctx.canvas.height = this.L * this.rows
    }

    // 判断蛇是否准备好下一回合
    check_ready() {
        for (const snake of this.snakes) {
            if (snake.status !== "idle") return false
            if (snake.direction === -1) return false
        }
        return true
    }

    // 让蛇进入下一回合
    next_step() {
        for (const snake of this.snakes) {
            snake.next_step()
        }
    }

    // 检测目标位置是否合法
    check_valid(cell) {
        // 判断是否撞墙
        for (const wall of this.walls) {
            if (wall.r === cell.r && wall.c === cell.c) {
                return false
            }
        }

        // 判断是否撞到蛇身
        for (const snake of this.snakes) {
            let k = snake.cells.length
            if (!snake.check_tail_increasing()) k--;  // 若蛇尾移动，则不考虑蛇尾
            for (let i = 0; i < k; i++) {
                if (snake.cells[i].r === cell.r && snake.cells[i].c === cell.c)
                    return false
            }
        }

        return true
    }

    update() {
        this.update_size()
        if (this.check_ready()) {
            this.next_step()
        }
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
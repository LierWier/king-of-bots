import {AcGameObject} from "@/assets/scripts/AcGameObject";
import {Cell} from "@/assets/scripts/Cell";

export class Snake extends AcGameObject {
    constructor(info, gameMap) {
        super();

        this.id = info.id;
        this.color = info.color;
        this.gameMap = gameMap;

        this.size = gameMap.L * 0.8  // 调节蛇的粗细

        this.cells = [new Cell(info.r, info.c)]  // 存放蛇的身体，cells[0]存放蛇头
        this.next_cell = null  // 下一步的目标位置

        this.speed = 5
        this.direction = -1  // -1表示没有指令， 0、1、2、3表示上右下左
        this.status = "idle"  // idle表示静止，move表示正在移动，die表示死亡

        this.dr = [-1, 0, 1, 0]  // 4个方向行的偏移量
        this.dc = [0, 1, 0, -1]  // 4个方向列的偏移量

        this.step = 0  // 当前回合数
        this.eps = 1e-2  // 允许的误差
    }

    start() {

    }

    set_direction(d) {
        this.direction = d
    }

    // 检测当前回合，蛇的长度是否增加
    check_tail_increasing() {
        if (this.step <= 10) return true
        return this.step % 3 === 1;
    }

    // 将蛇的状态变为走下一步
    next_step() {
        const d = this.direction
        this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d])
        this.direction = -1  // 清空操作
        this.status = "move"
        this.step++
        
        const k = this.cells.length
        for (let i = k; i > 0; i--) {
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]))
        }

        if (!this.gameMap.check_valid(this.next_cell)) {
            this.status = "die"
        }
    }

    update_move() {
        const move_distance = this.speed * this.timedelta / 1000
        const dx = this.next_cell.x - this.cells[0].x
        const dy = this.next_cell.y - this.cells[0].y
        const distance = (dx ** 2 + dy ** 2) ** 0.5

        if (distance < this.eps) {
            this.cells[0] = this.next_cell
            this.next_cell = null
            this.status = "idle"

            if (!this.check_tail_increasing()) {
                this.cells.pop()
            }
        } else {
            this.cells[0].x += move_distance * dx / distance
            this.cells[0].y += move_distance * dy / distance

            if (!this.check_tail_increasing()) {
                const k = this.cells.length
                const tail = this.cells[k - 1]
                const tail_target = this.cells[k - 2]
                const tail_dx = tail_target.x - tail.x
                const tail_dy = tail_target.y - tail.y
                tail.x += move_distance * tail_dx / distance
                tail.y += move_distance * tail_dy / distance
            }
        }
    }

    update() {
        if (this.status === 'move') {
            this.update_move()
        }
        
        this.render()
    }

    render() {
        const L = this.gameMap.L
        const size = L * 0.8
        const ctx = this.gameMap.ctx

        ctx.fillStyle = this.color
        if (this.status === "die") ctx.fillStyle = "white"

        for (const cell of this.cells) {
            ctx.beginPath()
            ctx.arc(cell.x * L, cell.y * L, size / 2, 0, Math.PI * 2)
            ctx.fill()
        }

        for (let i = 1; i < this.cells.length; i++) {
            const a = this.cells[i - 1]
            const b = this.cells[i]
            if (Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps)
                continue
            if (Math.abs(a.x - b.x) < this.eps) {
                ctx.fillRect(a.x * L - size / 2, Math.min(a.y, b.y) * L, size, Math.abs(a.y - b.y) * L)
            } else {
                ctx.fillRect(Math.min(a.x, b.x) * L, a.y  * L - size / 2, Math.abs(a.x - b.x) * L, size)
            }
        }
    }
}
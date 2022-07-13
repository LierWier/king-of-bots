const AC_GAME_OBJECTS = []

export class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this)
        this.timedelta = 0
        this.has_called_start = false
    }

    // 只执行一次
    start() {

    }

    // 每一帧执行一次，除了第一帧外
    update() {

    }

    // 删除之前执行
    on_destroy() {

    }

    // 删除
    destroy() {
        this.on_destroy()

        for (const i in AC_GAME_OBJECTS) {
            const obj = AC_GAME_OBJECTS[i]
            if (obj === this) {
                AC_GAME_OBJECTS.splice(i)
                break
            }
        }
    }
}

let last_timestamp  // 上一次执行的时刻
const step = (timestamp) => {
    for (const obj of AC_GAME_OBJECTS) {
        if (!obj.has_called_start) {
            obj.has_called_start = true
            obj.start()
        } else {
            obj.timedelta = timestamp - last_timestamp
            obj.update()
        }
    }

    last_timestamp = timestamp
    requestAnimationFrame(step)
}

requestAnimationFrame(step)
/*
 * @Author: mingxing.huang
 * @Date: 2020-07-22 14:18:17
 */
export default class Bus {
    constructor() {
        // 保存事件和回调，{ eventName: [cb1, cb2] }
        this.task = {}
    }
    // 实现订阅方法
    $on(eventName, cb) {
        this.task[eventName] = this.task[eventName] || []
        this.task[eventName].push(cb)
    }
    // 实现发布方法，实际就是将事件名对应的cb执行一次
    $emit(eventName, payload) {
        if (this.task[eventName]) {
            this.task[eventName].forEach(cb => cb(payload))
        }
    }
}
/*
 * @Author: mingxing.huang
 * @Date: 2020-07-13 17:14:02
 */
export default {
    methods: {
        // 注释：<!-- xxx -->
        comment(v) {
            return `<!-- ${v} -->`
        },
        // 开始标签：<div>
        tag1(name) {
            return `<${name}>`
        },
        // 结束标签：</div>
        tag2(name) {
            return `</${name}>`
        },
        // 开始标签：<div，用于拼接属性
        tag3(name) {
            return `<${name}`
        },
    },
}
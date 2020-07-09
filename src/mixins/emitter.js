/*
 * @Author: mingxing.huang
 * @Date: 2020-07-09 09:45:06
 */
export default {
    methods: {
        dispatch(componentName, eventName, payload) {
            let parent = this.$parent || this.$root
            let name = parent.$options.componentName
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent
                if (parent) {
                    name = parent.$options.componentName
                }
            }
            if (parent) {
                parent.$emit.call(parent, eventName, payload)
            }
        }
    }
}
### 使用方法（类似element-ui的el-form）：
```html
<MForm ref="form"
       :model="model"
       :rules="rules"
       label-position="right"
       label-width="100px">
  <MFormItem label="用户名："
             prop="username">
    <MFormInput v-model="model.username"
                placeholder="请输入用户名"></MFormInput>
  </MFormItem>
  <MFormItem label="密码："
             prop="password">
    <MFormInput type="password"
                v-model="model.password"
                placeholder="请输入密码"></MFormInput>
    </MFormItem>
  <MFormItem>
    <button @click="login">登录</button>
  </MFormItem>
</MForm>
```
```js
export default {
  data() {
    return {
      // 数据
      model: {
        username: '',
        password: '',
      },
      // 校验规则
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }],
      }
    }
  },
  methods: {
    login() {
      // 点击登录，校验数据
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$notice.success({
            title: '提示',
            content: '成功了',
          })
        } else {
          this.$notice({
            title: '提示',
            type: 'error',
            content: '校验没通过',
            duration: 3000,
          })
        }
      })
    }
  }
}
```
<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 15:45:38
--> 
<template>
  <div>
    <h2>封装form组件</h2>
    <div class="form-container">
      <div class="desc-form">
        form组件：统一管理model、rules，统一校验
        <div class="desc-form-item">
          form-item组件：处理label、error，实现单个校验方法
          <div class="desc-form-input">
            form-input组件：实现v-model，和model数据做双向绑定，触发验证
          </div>
        </div>
      </div>
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
    </div>
  </div>

</template>

<script>
import formInput from './form-input'
import formItem from './form-item'
import form from './form'

export default {
  components: {
    MForm: form,
    MFormInput: formInput,
    MFormItem: formItem
  },
  data() {
    return {
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(valid => {
        this.$notice({
          title: '提示',
          type: valid ? 'success' : 'error',
          content: valid ? '登录' : '校验没通过',
          duration: 3000
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  display: flex;
  flex-direction: row;
  .desc-form {
    padding: 5px;
    text-align: left;
    font-size: 12px;
    width: 400px;
    height: 200px;
    background: orange;
    position: relative;
    .desc-form-item {
      position: absolute;
      padding: 5px;
      color: #fff;
      top: 30px;
      right: 20px;
      left: 20px;
      bottom: 30px;
      background: green;
      .desc-form-input {
        position: absolute;
        padding: 5px;
        color: #000;
        top: 30px;
        right: 20px;
        left: 20px;
        bottom: 30px;
        background: yellow;
      }
    }
  }
}
</style>
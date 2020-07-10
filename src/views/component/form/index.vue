<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 15:45:38
--> 
<template>
  <div>
    <div class="form-container">
      <div class="desc-form form">
        form组件：
        <div>统一管理model、rules，统一校验</div>
        <div class="desc-form item">
          form-item组件：
          <div>处理label、error，实现单个校验方法</div>
          <div class="desc-form input">
            form-input组件：
            <div>实现v-model，和model数据做双向绑定，触发验证</div>
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
        if (valid) {
          this.$notice.success({
            title: '提示',
            content: '成功了'
          })
        } else {
          this.$notice({
            title: '提示',
            type: 'error',
            content: '校验没通过',
            duration: 3000
          })
        }
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
    padding: 10px;
    text-align: left;
    font-size: 12px;
    color: #fff;
    border-radius: 4px;
  }
  .form {
    width: 400px;
    height: 200px;
    background: rgb(22, 176, 122);
    position: relative;
    .item {
      position: absolute;
      top: 50px;
      right: 30px;
      left: 30px;
      bottom: 10px;
      background: rgb(230, 92, 94);
      .input {
        position: absolute;
        top: 50px;
        right: 30px;
        left: 30px;
        bottom: 10px;
        background: rgb(132, 112, 184);
      }
    }
  }
}
</style>
<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 15:45:38
--> 
<template>
  <div>
    <div class="form-container">
      <sub-title>组件设计：</sub-title>
      <rl-desc :des="desData"></rl-desc>
      <sub-title>实现效果：</sub-title>
      <div class="effect">
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
      desData: [
        {
          title: 'form组件：',
          content: '统一管理model、rules，统一校验'
        },
        {
          title: 'form-item组件：',
          content: '处理label、error，实现单个校验方法'
        },
        {
          title: 'form-input组件：',
          content: '实现v-model，和model数据做双向绑定，触发验证'
        }
      ],
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
  .effect {
    width: 500px;
    padding-left: 95px;
  }
}
</style>
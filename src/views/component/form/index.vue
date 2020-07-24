<!--
 * @Author: mingxing.huang
 * @Date: 2020-07-07 15:45:38
--> 
<template>
  <div>
    <div class="form-container">
      <rl-text v='实现效果：'></rl-text>
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
      <rl-text v='使用方法（类似element-ui的el-form）：'></rl-text>
      <mk :content="usageHtml"></mk>
      <mk :content="usageJs"></mk>
      <rl-text v='组件设计：'></rl-text>
      <rl-desc :des="desData"></rl-desc>
      <rl-text v='从内到外实现，先实现form-input组件：'></rl-text>
      <ol>
        <li>MFormInput需要和model数据的值进行双向绑定，需要实现v-model</li>
        <li>接收类似input标签的属性，比如：type、placeholder</li>
        <li>当输入的值改变时，需要根据校验规则做校验</li>
      </ol>
      <rl-text v='MFormInput.vue：'></rl-text>
      <mk :content="inputHtml"></mk>
      <mk :content="inputJs"></mk>
      <rl-text v='MFormItem.vue：'></rl-text>
      <mk :content="itemHtml"></mk>
      <mk :content="itemJs"></mk>
      <point v="规则校验库async-validator，具体使用参考：https://github.com/yiminghe/async-validator"></point>
      <rl-text v='MForm需要实现全局校验方法，对所有MFormItem进行校验，所以MForm要拿到所有MFormItem实例，并调用它们自己的validate方法，在MFormItem实例挂载后，通知MForm，并把自己实例传给MForm：'></rl-text>
      <mk :content="itemMountedJs"></mk>
      <mk :content="formJs"></mk>
      <rl-text v='优化$parent会出现的问题'></rl-text>
      <p>当父子结构被破坏时，$parent就获取不到想要的父组件，有两个地方用到了$parent：</p>
      <p>1：MFormInput触发规则校验</p>
      <p>2、MFormItem通知MForm已经挂载了</p>
      <p>参考element-ui的实现，采用mixin的方式，混入一个dispatch方法，指定要处理事件的组件，让它处理：</p>
      <mk :content="dispatchJs"></mk>
      <p>修改如下：</p>
      <p>给MFormItem.vue添加 <span class="rl-keyword">componentName: 'form-item'</span></p>
      <p>给MForm.vue添加 <span class="rl-keyword">componentName: 'form'</span></p>
      <p>给MFormItem、MFormInput混入方法：</p>
      <mk :content="mixinJs"></mk>
      <p>修改MFormInput：</p>
      <mk :content="inputExtral"></mk>
      <p>修改MForm：</p>
      <mk :content="itemExtral"></mk>
    </div>
  </div>

</template>

<script>
import formInput from './form-input'
import formItem from './form-item'
import form from './form'
import {
  usageHtml,
  usageJs,
  inputHtml,
  inputJs,
  itemHtml,
  itemJs,
  mountedJs,
  formJs,
  dispatch,
  mixinJs,
  inputExtral,
  itemExtral,
} from './content'

export default {
  components: {
    MForm: form,
    MFormInput: formInput,
    MFormItem: formItem,
  },
  data() {
    return {
      desData: [
        {
          title: 'MForm组件：',
          content: '统一管理model、rules，统一校验',
        },
        {
          title: 'MFormItem组件：',
          content: '处理label、error，实现MFormInput的数据校验方法',
        },
        {
          title: 'MFormInput组件：',
          content: '实现v-model，和model数据做双向绑定，触发验证',
        },
      ],
      model: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }],
      },
      usageHtml: this.genHtml(usageHtml),
      usageJs: this.genJs(usageJs),
      inputHtml: this.genHtml(inputHtml),
      inputJs: this.genJs(inputJs),
      itemHtml: this.genHtml(itemHtml),
      itemJs: this.genJs(itemJs),
      itemMountedJs: this.genJs(mountedJs),
      formJs: this.genJs(formJs),
      dispatchJs: this.genJs(dispatch),
      mixinJs: this.genJs(mixinJs),
      inputExtral: this.genJs(inputExtral),
      itemExtral: this.genJs(itemExtral),
    }
  },
  methods: {
    login() {
      this.$refs.form.validate((valid) => {
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
    },
  },
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
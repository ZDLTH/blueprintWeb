<template>
  <div>

    <el-form :hide-required-asterisk="true" :model="loginForm" :rules = "loginRules" ref="loginForm" label-width="60px" class="loginBox" label-position="top"
             style="margin-left: 1000px; margin-top: 50px;">
      <el-label style="width: 320px; height: 200px; margin-left: 30px; font-size: 40px; font-family: 'Microsoft YaHei UI'; padding: 40px; font-weight: bold;">
        施工设计院登入
      </el-label>
      <el-form-item label="账号" prop="logid" style="padding-top: 20px;">
        <el-input :maxlength="20" place-holder="username" prefix-icon="el-icon-user" v-model="loginForm.logid" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input :maxlength="20" place-holder="password" prefix-icon="el-icon-lock" v-model="loginForm.password" show-password clearable></el-input>
      </el-form-item>
      <el-form-item size="large" style="margin-left: 120px; margin-top: 50px;">
        <el-button  type="primary" @click="login('loginForm')" style="width: 150px">登录</el-button>
      </el-form-item>
      <p>
        <el-link href="" target="_blank" :underline="false" style="padding: 65px">忘记密码？</el-link>
        <el-link href="/programmedesigner/regist" target="_blank" :underline="false" style="padding: 65px">立即注册！</el-link>
      </p>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "DesignerLogin",
  data() {
    return {
      logidNull: false,
      passwordNull: false,
      loginForm: {
        logid:'',
        password:''
      },
      loginRules: {
        logid: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    login(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      this.$axios.post('/programmedesigner/login', this.loginForm)
          .then(res => {
            const jwt = res.headers['authorization']
            const userInfo = res.data.data
            _this.$store.commit("SET_TOKEN", jwt)
            _this.$store.commit("SET_USERINFO", userInfo);

            _this.$router.push("main")
          })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}


</script>

<style scoped>

</style>
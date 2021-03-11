<template>
  <div>
    <!-- 背景图片 -->
    <div class="background">
      <img src="../assets/image/worker-building-scaffolding-cons.png" width="100%" height="100%">
    </div>

    <div class="login_container">
      <h2 class="login_label">建筑施工单位登入</h2>
      <el-container class="login_form">
        <el-form label-position="top" ref="form" :model="loginForm" label-width="80px" size="mini" :rules="loginFormRules">
          <el-form-item label="账号" prop="logid">
            <el-input placeholder="username" prefix-icon="iconfont iconyonghu" v-model="loginForm.logid"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="password" show-password prefix-icon="iconfont iconmima" v-model="loginForm.password" type="password"></el-input>
          </el-form-item>

          <el-form-item size="large">
            <el-button class="login_btn" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-container>
      <div class="login_bottom">
        <el-link class="bottom_label" @click="toRegist()">注册账号</el-link>
        <el-link class="bottom_label">忘记密码</el-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderLogin",
  data() {
    return {
      loginForm: {
        logid: '',
        password: ''
      },
      loginFormRules: {
        logid: [
          {required: true, message: '请输入登入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入登入密码', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    login() {
      const _this = this
      this.$axios.post('/builder/login', this.loginForm)
          .then(res => {
            const jwt = res.headers['authorization']
            const userInfo = res.data.data
            _this.$store.commit("SET_TOKEN", jwt)
            _this.$store.commit("SET_USERINFO", userInfo);
            _this.$router.push("main")
          })
    },
    toRegist() {
      this.$router.push('/builder/regist')
    }
  }
}
</script>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}

.login_container {
  width: 400px;
  height: 480px;
  background-color: #faf8f8;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(0%, -50%);
  transition: 0.4s;
  background-image: url("../assets/image/build.png");
  background-size: 100% 100%;
  z-index: 1;
}

.login_container:hover {
  box-shadow: 0 0 10px #a19f9f;
}

.login_label {
  position: absolute;
  left: 100px;
  top: 30px;
}

.login_form {
  width: 100%;
  height: 50%;
  position: absolute;
  top: 22%;
  left: 23%;
}

.login_btn {
  position: absolute;
  left: 10px;
  top: 10px;
  height: 39px;
  width: 200px;
}

.login_bottom {
  width: 200px;
  height: 150px;
  position: absolute;
  left: 110px;
  top: 335px;
}

.login_bottom  .bottom_label{
  text-decoration: none;
  padding: 15px;
  color: #1f1f1f;
}

</style>

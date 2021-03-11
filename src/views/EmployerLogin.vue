<template>
    <div>
    <el-container>
      <el-form ref="form" :model="loginForm" label-width="80px" size="mini">
        <el-form-item label="账号" prop="logid">
          <el-input v-model="loginForm.logid"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item size="large">
          <el-button type="primary" @click="login">登录 </el-button>

        </el-form-item>
      </el-form>
    </el-container>

  </div>
</template>

<script>
export default {
  name: "EmployerLogin",
  data() {
    return {
      loginForm: {
        logid:'',
        password:''
      },
      aaa:{
        asdf:'',
        daf:'',
        part:[
          {
           ddd:'asdf',
            ccc:''
          },
          {
            eee:'asdf',
            fff:''
          }
        ]
      }
    };
  },
  methods: {
    login() {
      const _this = this
      this.$axios.post('/employer/login', this.loginForm)
          .then(res => {
            const jwt = res.headers['authorization']
            const userInfo = res.data.data
            _this.$store.commit("SET_TOKEN", jwt)
            _this.$store.commit("SET_USERINFO", userInfo);

            if(userInfo.userType  == 0){
              _this.$router.push('/employer/leader/main')
            }
            else if(userInfo.userType  == 1){
              _this.$router.push('/employer/enterprise/main')
            }


          })
    }
  }
}
</script>

<style scoped>

</style>
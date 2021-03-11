<template>
  <div>
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="2"><div class="grid-content bg-purple">建筑档案管理平台</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">甲方平台账号注册</div></el-col>
          <el-col :span="17"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="2"><div class="grid-content bg-purple" >帮助中心</div></el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="16" :push="4">
            <el-steps  :active="step" finish-status="success" simple style="margin-top: 20px; height: 10px">
              <el-step title="步骤 1" ></el-step>
              <el-step title="步骤 2" ></el-step>
              <el-step title="步骤 3" ></el-step>
            </el-steps>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :push="4" >
            <div class="grid-content bg-purple-dark">

              <template>
                <el-radio v-model="userType" label="1">单位（有统一社会信用代码）</el-radio>
                <el-radio v-model="userType" label="2">单位（无统一社会信用代码）</el-radio>
                <el-radio v-model="userType" label="3">个人</el-radio>
              </template>

              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="身份证号码" v-if="userType==3">
                  <el-input  v-model="form.idNumber"></el-input>
                </el-form-item>
                <el-form-item label="个人名称" v-if="userType==3">
                  <el-input  v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码" v-if="userType!=3">
                  <el-input  v-model="form.creditCode"></el-input>
                </el-form-item>
                <el-form-item label="单位名称" v-if="userType!=3">
                  <el-input  v-model="form.companyName"></el-input>
                </el-form-item>
                <el-form-item label="登录密码">
                  <el-input  v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                  <el-input  v-model="form.confirmPassword"></el-input>
                </el-form-item>
                <el-form-item label="注册验证码">
                  <el-input  v-model="form.checkCode"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">立即注册</el-button>
                </el-form-item>

              </el-form>
            </div>
          </el-col>
          <el-col :span="8" :push="4">
            <el-row>
              <div class="grid-content bg-purple-dark">
                <a href="login">已有账号？立即登录</a>
              </div>
            </el-row>
            <el-row>
              <div class="demo-image__placeholder">
                <div class="block">
                  <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
                </div>
              </div>
            </el-row>
          </el-col>

        </el-row>

      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "EmployerRegist.vue",
  data() {
    return {
      form: {
        idNumber:'',
        name:'',
        creditCode:'',
        companyName:'',
        password:'',
        confirmPassword:'',
        checkCode:''
      },
      userType:'1',
      step:0
    }
  },
  methods: {
    onSubmit() {
      var logid
      let data
      if(this.userType === 3){
        //个人用户
        logid = this.form.idNumber;
        data = {user:{"logid":logid, "password":this.form.password, "tid":"1"}, employer:{"idNumber":this.form.idNumber,"name":this.form.name, "userType":0}}
      }else {
        logid = this.form.creditCode;
        data = {user:{"logid":logid, "password":this.form.password, "tid":"1"}, employer:{"creditCode":this.form.creditCode,"companyName":this.form.companyName, "userType":1}}
      }



      this.$axios.post("/employer/regist",data)
      .then(res=>{
          alert(res.data["msg"])

      })
    }
  }

}



</script>

<style scoped>

.el-row {
  margin-bottom: 20px;
}


.el-col {
  border-radius: 4px;
}


.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}


.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-header, .el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
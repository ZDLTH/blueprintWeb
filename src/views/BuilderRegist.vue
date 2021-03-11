<template>
  <div>
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content bg-purple">建筑档案管理平台</div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">甲方平台账号注册</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple" >帮助中心</div></el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="16" :push="4">
            <el-steps  :active="step" finish-status="success" simple style="margin-top: 20px; height: 10px">
              <el-step title="1、账号信息" ></el-step>
              <el-step title="2、基本信息" ></el-step>
              <el-step title="3、激活账号" ></el-step>
            </el-steps>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :push="4" >
            <div class="grid-content bg-purple-dark">

              <template>
                <el-radio v-model="userType" label="1" v-show="step == 0">单位（有统一社会信用代码）</el-radio>
                <el-radio v-model="userType" label="2" v-show="step == 0">单位（无统一社会信用代码）</el-radio>
                <el-radio v-model="userType" label="3" v-show="step == 0">个人</el-radio>
              </template>

              <el-form ref="form" :model="form" :rules="registRules1" label-width="150px" style="padding: 60px;" v-show="step == 0">
                <el-form-item prop="idNumber" label="身份证号码" v-if="userType==3">
                  <el-input :maxlength="18" v-model="form.idNumber"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="个人名称" v-if="userType==3">
                  <el-input  v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item prop="creditCode" label="统一社会信用代码" v-if="userType!=3">
                  <el-input  :maxlength="18" v-model="form.creditCode"></el-input>
                </el-form-item>
                <el-form-item prop="companyName" label="单位名称" v-if="userType!=3">
                  <el-input  v-model="form.companyName"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="登录密码">
                  <el-input  :maxlength="20" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword" label="确认密码">
                  <el-input  :maxlength="20" v-model="form.confirmPassword"></el-input>
                </el-form-item>
                <el-form-item prop="checkCode" label="注册验证码">
                  <el-input  v-model="form.checkCode"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit('form')">下一步</el-button>
                </el-form-item>
                <el-form-item>
                  <el-checkbox>我同意并遵守 《工程建设云服务协议》</el-checkbox>
                </el-form-item>
              </el-form>
              <el-form ref="form2" :model="form2" :rules="registRules2" label-width="150px" style="padding: 60px;" v-show="step == 1">
                <el-form-item prop="phoneNumber" label="手机号码">
                  <el-input :maxlength="11" v-model="form2.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item prop="Email" label="电子邮箱">
                  <el-input  v-model="form2.Email"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit('form2')">下一步</el-button>
                </el-form-item>
              </el-form>
              <el-form v-show="step == 2">
                <el-form-item style="padding-top: 60px;">
                  <el-label style="width: 320px; height: 200px;font-size: 40px; font-family: 'Microsoft YaHei UI'; color: #1038c7;">
                    账号成功激活。
                  </el-label>
                </el-form-item>
                <el-form-item>
                  <el-label style="font-size: 15px;">
                    感谢您的注册！您的登陆账号为:<font size="20px" color="#228b22">vtest973659</font>
                  </el-label>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="width: 300px;">登陆建设单位服务平台</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="8" :push="4">
            <el-row>
              <div class="grid-content bg-purple-dark">
                已有账号？
                <a href="login">立即登录</a>
              </div>
            </el-row>
            <el-row>
              <div class="demo-image__placeholder">
                                <div class="block">
                                  <el-image :src="require('../assets/image/introduction.png')"></el-image>
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
        checkCode:'',
      },
      form2:{
        phoneNumber:'',
        Email:''
      },
      registRules1: {
        idNumber: [
          { required: true, message: '请输入身份证号！', trigger: 'blur' },
          {
            required: true,
            min: 18, max: 18,
            pattern: /^[0-9]+$/,
            message: '请输入18位数字！',
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '请输入名字！', trigger: 'blur' },
        ],
        creditCode: [
          { required: true, message: '请输入社会信用代码！', trigger: 'blur' },
        ],
        companyName: [
          { required: true, message: '请输入单位名称！', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' },
          {
            required: true,
            min:6,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '密码长度不足6位，或者使用了非法字符',
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {required: true, message: '请确认密码！', trigger: 'blur' },
          {
            required: true,
            min:6,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '密码长度不足6位，或者使用了非法字符',
            trigger: 'blur'
          }
        ],
        checkCode: [
          { required: true, message: '请输入验证码！', trigger: 'blur' },
        ],
      },
      registRules2:{
        phoneNumber: [
          {required: true, message: '请输入手机号码！', trigger: 'blur' },
          {
            min: 11, max: 11,
            pattern: /^[0-9]+$/,
            message: '请输入11位手机号码！',
            trigger: 'blur'
          }
        ],
        Email: [
          {required: true, message: '请输入邮箱！', trigger: 'blur' },
          {
            required: true,
            email: true,
            message: '请按正确的邮箱格式输入！',
            trigger: 'blur'
          }
        ]
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
        data = {user:{"logid":logid, "password":this.form.password, "tid":"5"}, builder:{"idNumber":this.form.idNumber,"name":this.form.name, "userType":0}}
      }else {
        logid = this.form.creditCode;
        data = {user:{"logid":logid, "password":this.form.password, "tid":"5"}, builder:{"creditCode":this.form.creditCode,"companyName":this.form.companyName, "userType":1}}
      }



      this.$axios.post("/builder/regist",data)
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

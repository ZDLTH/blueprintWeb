<template>
  <div>
    <el-row>
      <el-col :span="2" :push="11" align="center">

        <el-dropdown placement="top">
          <el-button @click="showPersonal" icon="el-icon-user" circle></el-button>
          <el-dropdown-menu  slot="dropdown"  >
            <el-dropdown-item @click.native="showPersonal">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>


    <el-dialog
        title="个人中心"
        :visible.sync="personalDisplay"
        width="30%">

      <el-tabs type="border-card" >
        <el-tab-pane label="个人信息" align="left">
          <div class="personal">
            <p>账号类型:
              <Span v-if="personalMsg.userType == 0">员工账号</Span>
              <Span v-if="personalMsg.userType == 1">单位账号</Span>
            </p>
            <p>
              <Span v-if="personalMsg.userType == 0">身份证号:{{personalMsg.idNumber}}</Span>
              <Span v-if="personalMsg.userType == 1">社会信用代码:{{personalMsg.creditCode}}</Span>
            </p>
            <p>
              <Span v-if="personalMsg.userType == 0">姓名:{{personalMsg.name}}</Span>
              <Span v-if="personalMsg.userType == 1">单位名称:{{personalMsg.companyName}}</Span>
            </p>
            <p>手机号:{{ personalMsg.phone }}</p>
            <p>邮箱:{{ personalMsg.email }}</p>
          </div>
        </el-tab-pane>

        <el-tab-pane label="信息修改">
          <el-form :model="msgUpdateForm" :rules="rules" ref="msgUpdateForm" label-width="100px" class="demo-ruleForm">
            <!--                输入框-->
            <el-row>
              <el-col :span="20">
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="msgUpdateForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="msgUpdateForm.email"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!--                确认-->
            <el-row>
              <el-col :span="20">
                <el-form-item>
                  <el-button type="primary" @click="updatePersonalMsg('msgUpdateForm')">保存</el-button>
                  <el-button @click="resetForm('msgUpdateForm')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="修改密码">

          <el-form :model="passwordForm" :rules="rules" ref="passwordForm" label-width="100px" class="demo-ruleForm">
            <!--                输入框-->
            <el-row>
              <el-col :span="20">
                <el-form-item label="旧的密码" prop="old_pwd">
                  <el-input v-model="passwordForm.old_pwd" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="new_pwd" >
                  <el-input v-model="passwordForm.new_pwd" show-password></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updatePassword('passwordForm')">保存</el-button>
                  <el-button @click="resetForm('passwordForm')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <!--                确认-->
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: "PersonalCenter",
  data(){
    var checkPhone = (rule, value, callback) => {

      const phoneReg = /^1[34578]\d{9}$$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
        // 所以在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }

    return{
      personalDisplay:false,
      personalMsg:JSON.parse(sessionStorage.getItem('userInfo')),
      msgUpdateForm:{
        phone:JSON.parse(sessionStorage.getItem('userInfo')).phone,
        email:JSON.parse(sessionStorage.getItem('userInfo')).email
      },
      passwordForm:{
        old_pwd:'',
        new_pwd:''
      },
      rules: {
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        mail: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    showPersonal(b){
      let target = b.target
      if(target.nodeName == 'SPAN' || target.nodeName == 'I'){
        target = b.target.parentNode;
      }
      target.blur();
      this. personalDisplay = true
    },
    updatePersonalMsg(formName){
      this.$refs[formName].validate((valid) => {

        let data = {'id':this.personalMsg.id,'phone':this.msgUpdateForm.phone, 'email':this.msgUpdateForm.email }

        if (valid) {
          this.$axios.post('/employer/updatePhoneAndEmail', data)
              .then(res => {

                alert('保存成功');
              })

        }
      });
    },
    updatePassword(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {'id':this.personalMsg.id,'oldPwd':this.passwordForm.old_pwd, 'newPwd':this.passwordForm.new_pwd }

          this.$axios.post('/user/updatePassword', data)
              .then(res => {
                alert(res.data.msg)
              })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    logOut(){
      this.$axios.get('/user/logOut')
          .then(res => {
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push("/")
          })
    }
  }
}
</script>

<style scoped>
.personal{
  line-height: 20px;
}
</style>
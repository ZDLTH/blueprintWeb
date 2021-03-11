<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <!--    标题 -->
      <el-header style="z-index: 100;height: 20%" class="title">
        <el-image style="height: 100%" fit="contain"  :src="logo_path"></el-image>
      </el-header>

      <!--登录窗口-->

      <el-main style="height: 80%;border-radius: 5px;">
        <div>
          <el-row style="margin-bottom: 15px;">
            <el-col :span="5" >
              <div class="title" style="margin-top: -25px;">
                请选择登录入口>>
              </div>
            </el-col>
          </el-row>
          <el-row style="margin-left: 50px">
            <!--建设单位登录-->
            <el-col :key="index" v-for="(role,index) in login_roles" :span="5" :push="index"  align="center">
              <el-card :body-style="{ padding: '0px',width:'100%'}"  shadow="hover" @click.native="$router.push(login_path[index])">
                <el-image  fit="contain" :src="login_img_url[index]">
                  <div style="height: 100%" slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <div style="border-top:1px solid whitesmoke;">{{role}}</div>
              </el-card>
            </el-col>
          </el-row>
        </div>

      </el-main>


    </el-container>


  </div>
</template>


<script>

export default {
  name: 'index',
  data(){
    return{
      login_roles:['建设单位','设计单位','图审机构','施工方'],
      login_path:['employer/login','designer/login','reviewer/login','builder/login'],
      login_img_url:[require('../static/img/index/employer_login_logo.jpg'),require('../static/img/index/designer_login_logo.jpg'),require('../static/img/index/reviewer_login_logo.jpg'),require('../static/img/index/builder_login_logo.jpg')],
      logo_path:require('../static/img/index/logo.png')
    }
  },
  methods:{

  }
}
</script>

<style scoped>
@import '../static/css/index/style.css';

</style>

<!--建设单位账号主页-->
<template>
  <el-container>
<!--    导航栏-->
    <el-header>
      <PersonalCenter></PersonalCenter>
    </el-header>

    <el-container style="height: 100%">
      <el-aside width="200px">

        <el-row>
          <el-col :span="10" :push="2" >
            <el-switch
                v-model="fold"
                active-text="收起">
            </el-switch>
          </el-col>


        </el-row>

        <el-row>
          <el-col :span="22">
            <el-menu
                router
                default-active="1"
                class="el-menu-vertical-demo"
                :collapse="fold">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-s-tools"></i>
                  <span>项目管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/employer/enterprise/createProject"><i class="el-icon-edit-outline"></i>创建项目</el-menu-item>
                  <el-menu-item index="/employer/enterprise/currentProject"><i class="el-icon-folder-opened"></i>当前项目</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-s-custom"></i>
                  <span>员工管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/employer/enterprise/manageStaff"><i class="el-icon-notebook-1"></i>查看员工</el-menu-item>
                  <el-menu-item index="/employer/enterprise/staffApply"><i class="el-icon-bell"></i>查看申请</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

            </el-menu>
          </el-col>
        </el-row>

      </el-aside>


      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import PersonalCenter from "@/components/employer/PersonalCenter";
export default {
  name: "EmployEnterpriseMain",
  components:{PersonalCenter},
  data(){
    return{
      fold:false
    }
  },
  methods:{
  }
}
</script>

<style scoped>
  .el-header{
    line-height: 0;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 150px;
    min-height: 450px;
  }

  .el-submenu .el-menu-item {

    min-width: 150px;
  }




</style>
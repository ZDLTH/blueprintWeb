<template>


    <el-container>
      <!--    导航栏-->
      <el-header>
        <PersonalCenter></PersonalCenter>
      </el-header>

      <el-container>
        <el-aside width="200px">
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
                    <el-menu-item index="/employer/leader/myProject"><i class="el-icon-edit-outline"></i>我的项目</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group>
                    <el-menu-item index="/employer/leader/myApply"><i class="el-icon-bell"></i>消息通知</el-menu-item>
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
  components:{PersonalCenter},
  name: "EmployerLeaderMain",

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
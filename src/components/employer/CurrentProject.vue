<template>
  <div>
    <el-row>
      <el-col v-if="projectInfoShow == false"  align="center" :span="19" :push="2">
        <el-table
            :data="projectData"
            style="width: 100%"
            :default-sort = "{prop: 'projectName', order: 'descending'}"
            max-height="500px"
            border
        >

          <el-table-column
              prop="projectName"
              label="项目名称"
              sortable
              width="280">
          </el-table-column>
          <el-table-column
              prop="startTime"
              label="开始时间"
              sortable
              width="180">
          </el-table-column>
          <el-table-column
              label="负责人">
            <template slot-scope="scope">
              <span>{{leaderData[scope.$index].name}}</span>
            </template>
          </el-table-column>

          <el-table-column label="">
            <template slot="header" slot-scope="scope">
              <el-input
                  size="mini"
                  placeholder="输入姓名搜索"/>
            </template>
            <template slot-scope="scope">

              <el-row>
                <el-col align="center" :span="4">
                  <el-tooltip class="item" effect="dark" content="查看项目信息" placement="bottom">
                    <el-button @click="projectInfoShow=true;selectProjectRowIndex=scope.$index" icon="el-icon-view" circle></el-button>
                  </el-tooltip>
                </el-col>
              </el-row>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
    </el-row>


<!--   项目信息  -->

    <div v-if="projectInfoShow">
      <el-page-header  @back="backToProject" content="项目信息">
      </el-page-header>
      <ProjectInfo :project-msg="projectData[selectProjectRowIndex]"></ProjectInfo>
    </div>
    <!--   项目设置  -->


  </div>
</template>

<script>

import ProjectInfo from "@/components/employer/enterprise/ProjectInfo";
export default {
  name: "CurrentProject",
  components:{ProjectInfo},
  data(){
    return{
      projectInfoShow:false,
      chooseLeaderDialogShow:false,
      projectData:[],
      leaderData:[],
      selectProjectRowIndex:0,
      leaderMsgForm:{

      }
    }
  },
  methods:{
    backToProject(){
      this.projectInfoShow = false;
    },
    getProject(){
      let id =  JSON.parse(sessionStorage.getItem('userInfo')).id
      this.$axios.get('/employer/getCreatedProject/' + id)
          .then(res => {
            this.projectData = res.data.data[0]
            this.leaderData = res.data.data[1]
          })
    }
  },
  mounted() {
    this.getProject();
  }
}
</script>

<style scoped>

</style>
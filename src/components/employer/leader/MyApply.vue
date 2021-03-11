<template>
  <div >
    <el-row>
      <el-col :span="24">

        <el-card class="box-card">
          <el-row v-for="(staff, index) in MyApplies[0]">
            <el-col :span="18">
              <el-card header="单位信息" class="box-card">
                <div style="height: 50px">
                  <span>单位名称 {{staff.companyName}}</span>
                  <span>信用号 {{staff.creditCode}}</span>
                  <span>负责人手机号 {{staff.phone}}</span>
                  <span>负责人邮箱 {{staff.email}}</span>
                </div>

              </el-card>
            </el-col>
            <el-col :span="3" :push="1">
              <div style="margin-top: 15%">

                <el-button disabled v-if="MyApplies[1][index] == -1" type="danger">申请拒绝</el-button>
                <div v-if="MyApplies[1][index] == 0">
                  <el-button @click="ChangeMyAppliesStatus(staff.id, 1)"  type="primary">同意申请</el-button>
                  <el-button @click="ChangeMyAppliesStatus(staff.id, -1)"  type="danger">拒绝申请</el-button>
                </div>
                <el-button disabled v-if="MyApplies[1][index] == 1" type="danger">申请已同意</el-button>

              </div>

            </el-col>

          </el-row>
        </el-card>

      </el-col>
    </el-row>
    <el-row style="margin-top: 30px;">
      <el-col :span="24">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1">
        </el-pagination>
      </el-col>
    </el-row>




  </div>

</template>

<script>
export default {
  name: "MyApply",
  data(){
    return{
      MyApplies:[]
    }
  },
  methods:{
    getMyApplies(){
      let id = JSON.parse(sessionStorage.getItem('userInfo')).id
      this.$axios.get('/employer/getMyApplies/' + id)
          .then(res => {
            this.MyApplies = res.data.data
            console.log(this.MyApplies)
          })
    },
    ChangeMyAppliesStatus(employerId, status){
      let id = JSON.parse(sessionStorage.getItem('userInfo')).id
      this.$axios.get('/employer/changeMyAppliesStatus/'+employerId +'/'+id +'/'+status )
          .then(res => {
            this.getMyApplies()
          })
    }
  },
  mounted() {
    this.getMyApplies()
  }
}
</script>

<style scoped>



</style>
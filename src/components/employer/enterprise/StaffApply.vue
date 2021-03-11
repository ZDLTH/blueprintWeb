<template>
  <div >
    <el-row>
      <el-col :span="24">

        <el-card class="box-card">
          <el-row v-for="(staff, index) in applyStaffs[0]">
            <el-col :span="18">
              <el-card header="员工信息" class="box-card">
                <div style="height: 50px">
                  <span>姓名 {{staff.name}}</span>
                  <span>身份证号 {{staff.idNumber}}</span>
                  <span>手机号 {{staff.phone}}</span>
                  <span>邮箱 {{staff.email}}</span>
                </div>

              </el-card>
            </el-col>
            <el-col :span="3" :push="1">
                <div style="margin-top: 15%">

                  <el-button disabled v-if="applyStaffs[1][index] == -1" type="danger">申请拒绝</el-button>
                  <el-button v-if="applyStaffs[1][index] == 0" type="danger">取消申请</el-button>
                  <el-button disabled v-if="applyStaffs[1][index] == 1" type="danger">申请已同意</el-button>

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
  name: "StaffApply",
  data () {
    return {
      applyStaffs:{

      }
    }
  },
  methods: {
    getStaffApply(){
      let id = JSON.parse(sessionStorage.getItem('userInfo')).id
      this.$axios.get("/employer/getStaffApplies/" + id)
          .then(res=>{
            this.applyStaffs = res.data.data;
          })
    }
  },
  mounted() {
    this.getStaffApply()
  }
}
</script>

<style scoped>

</style>
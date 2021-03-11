<template>
  <div>

<!-- 添加员工 -->
    <el-row>
      <el-col :span="3" :push="9" align="center">
        <el-tooltip class="item" effect="dark" content="添加员工" placement="bottom">
          <el-button icon="el-icon-plus" circle @click="addStaffDialogShow=true"></el-button>
        </el-tooltip>
      </el-col>
    </el-row>

    <el-dialog
        title="添加员工"
        :visible.sync="addStaffDialogShow"
        width="40%"
        center>
      <el-row>
        <el-form :inline="true" :model="addStaffForm" class="demo-form-inline">
          <el-col :span="23" :push="2">
            <el-form-item label="员工姓名">
              <el-input v-model="addStaffForm.name" size="mini"  placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="员工身份证号">
              <el-input v-model="addStaffForm.idNumber"  size="mini" placeholder="请输入身份证号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" @click="searchStaff">查询</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card">
            <div v-if="JSON.stringify(searchStaffData)=='{}'">
              请先搜索用户
            </div>
            <div v-else-if="searchStaffData == null">
              未搜索到该用户
            </div>
            <div v-else>
              <P>搜索到用户如下</P>
              <p>姓名 {{searchStaffData.name}}</p>
              <p>身份证号 {{searchStaffData.idNumber}}</p>
              <p>手机号 {{searchStaffData.phone}}</p>
              <p>邮箱 {{searchStaffData.email}}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="addStaffApply">发送申请</el-button>
        <el-button size="mini" type="danger"   @click="addStaffDialogShow=false">取消添加</el-button>
      </span>
    </el-dialog>


<!--    员工表单-->
    <el-row>
      <el-col  align="center" :span="19" :push="2">
        <el-table
            :data="staffData.filter(data => !searchName || data.name.toLowerCase().includes(searchName.toLowerCase()))"
            style="width: 100%"
            :default-sort = "{prop: 'name', order: 'descending'}"
            max-height="500px"
            border
        >

          <el-table-column
              prop="name"
              label="姓名"
              sortable
              width="180">
          </el-table-column>
          <el-table-column
              prop="idNumber"
              label="身份证号"
              sortable
              width="180">
          </el-table-column>
          <el-table-column
              prop="phone"
              label="电话号码">
          </el-table-column>
          <el-table-column
              prop="email"
              label="邮箱">
          </el-table-column>

          <el-table-column label="">
            <template slot="header" slot-scope="scope">
              <el-input
                  v-model="searchName"
                  size="mini"
                  placeholder="输入姓名搜索"/>
            </template>
            <template slot-scope="scope">

              <el-popconfirm @confirm="deleteStaff(scope.row.id)" title="确定删除该员工吗？">
                <el-button
                    size="mini"
                    type="danger"
                    slot="reference">
                  删除</el-button>
              </el-popconfirm>

            </template>
          </el-table-column>

        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ManageStaff",
  data() {
    return {
      searchName:'',
      addStaffDialogShow:false,
      staffData: [],
      addStaffForm:{
        name:'',
        idNumber:''
      },
      searchStaffData:{},
    }
  },
  methods: {
    deleteStaff(id) {
      this.$axios.get("/employer/deleteStaff/" +id)
          .then(res=>{
            this.getStaffs()
            this.$notify({
              title: '成功',
              message: res.data.msg,
              type: 'success'
            });
          })
    },
    getStaffs(){
      let id =  JSON.parse(sessionStorage.getItem('userInfo')).id
      this.$axios.get("/employer/getEmployerStaffs/" +id)
          .then(res=>{
            this.staffData = res.data.data
          })

    },
    searchStaff(){
      this.$axios.post("/employer/searchStaff", this.addStaffForm)
          .then(res=>{
            this.searchStaffData = res.data.data
          })
    },
    addStaffApply(){
      let id = JSON.parse(sessionStorage.getItem('userInfo')).id
      console.log(  id )
      console.log( this.searchStaffData.id)
      this.$axios.get("/employer/addStaffApply/" + id + "/" +  this.searchStaffData.id)
          .then(res=>{
            this.$notify({
              title: '成功',
              message: res.data.msg,
              type: 'success'
            });
          })
    }
  },
  mounted() {

    this.getStaffs()
  }
}
</script>

<style scoped>

</style>
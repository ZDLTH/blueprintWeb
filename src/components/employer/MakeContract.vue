<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div v-if="makeContractToWho == 1">
          与设计院签订合同
        </div>
        <div v-else-if="makeContractToWho == 2">
          与审核机构签订合同
        </div>
        <div v-else-if="makeContractToWho == 3">
          与施工单位签订合同
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-form :inline="true" :model="addContrastForm" class="demo-form-inline">
        <el-col :span="23" :push="2">
          <el-form-item label="">
            <el-input size="mini" v-model="addContrastForm.companyCreditCode"  placeholder="请输入单位社会信用码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="getCompanyMsg(makeContractToWho)" >查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div v-if="JSON.stringify(companyMsg) == '{}'">
           请先搜索单位
          </div>
          <div v-else>
            <p>单位名称{{companyMsg.name}}</p>
            <p>信用代码{{companyMsg.creditCode}}</p>
            <p>负责人手机{{companyMsg.phone}}</p>
            <p>负责人邮箱{{companyMsg.email}}</p>

          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-form :inline="true" :model="contrastContentForm" class="demo-form-inline">
        <el-row>
          <el-col :span="4" :push="0">
            <el-form-item label="合同日期">

            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-date-picker type="date" placeholder="合同开始日期" v-model="contrastContentForm.startTime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="8" :push="1">
            <el-date-picker type="date" placeholder="合同结束日期" v-model="contrastContentForm.endTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">

            <el-form-item label="合同金额">
            </el-form-item>
          </el-col>
          <el-col :span="8" >

            <el-form-item >
              <el-input v-model="contrastContentForm.money">
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="24">

            <el-form-item>
              <el-button @click="sendContract" type="primary">
                发送合同
              </el-button>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>
    </el-row>

  </div>




</template>

<script>
export default {
  name: "MakeContract",
  props:['makeContractToWho', 'projectId'],
  data(){
    return{
      //和谁签合同
      makeWith:[],
      companyMsg:{},

      addContrastForm:{
        companyCreditCode:'',
      },
      contrastContentForm:{
        startTime:'',
        endTime:'',
        money:''
      }
    }
  },
  methods:{
    getCompanyMsg(makeContractTo){
      this.$axios.get('/user/getCompanyMsg/' + this.addContrastForm.companyCreditCode + '/'+makeContractTo)
          .then(res => {
            this.companyMsg = res.data.data
          })
    },
    sendContract(){
      let id = JSON.parse(sessionStorage.getItem('userInfo')).id
      let msg = {'projectId':this.projectId,'employerId':id,'companyId':this.companyMsg.id,'makeTo':this.makeContractToWho}


      this.$axios.post('/employer/sendContract',Object.assign(msg, this.addContrastForm))
          .then(res => {
            this.companyMsg = {}
            alert(res.data.msg)
            this.$emit('closeMakeContract');
          })
    }
  }
}
</script>

<style scoped>

</style>
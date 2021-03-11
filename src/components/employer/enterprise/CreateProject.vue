<template>

<div>

  <el-row style="margin-bottom: 20px">
    <el-col :span="24" align="center">
      <el-button type="primary" @click="createProject">创建项目</el-button>
    </el-col>
  </el-row>

  <el-collapse>
<!--  建设单位信息  -->
    <el-collapse-item  title="建设单位信息" name="1">

      <el-form ref="form" :model="leaderForm" label-width="80px">
        <el-row>
          <el-col :span="12" >
            <el-form-item  label="建设单位名称" label-width="100px">
              <el-input :placeholder="personalMsg.companyName" :disabled="true"  size="mini" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" >
            <el-form-item  label="负责人" label-width="100px">
              <el-input @click.native="leaderChooseDialogShowFunction"  v-model="leaderForm.chooseLeader.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" >
            <el-form-item  label="负责人手机号" label-width="100px">
              <el-input disabled v-model="this.leaderForm.chooseLeader.phone" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item  label="负责人邮箱" label-width="100px">
              <el-input disabled v-model="this.leaderForm.chooseLeader.email" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-dialog
            title="选择负责人"
            :visible.sync="leaderChooseDialogShow"
            width="30%">
          <el-table
              ref="singleTable"
              :data="leaderForm.staffs"
              highlight-current-row
              @cell-click="chooseLeaderFunction"
              style="width: 100%">
            <el-table-column
                property="name"
                label="姓名"
                width="120">
            </el-table-column>
            <el-table-column
                property="idNumber"
                label="身份证号"
                width="120">
            </el-table-column>
            <el-table-column
                property="phone"
                label="电话">
            </el-table-column>
            <el-table-column
                property="email"
                label="邮箱">
            </el-table-column>
          </el-table>

        </el-dialog>



      </el-form>

    </el-collapse-item>
<!--   项目基本信息 -->
    <el-collapse-item title="项目基本信息" name="2">
      <el-form ref="form" :model="baseMsgForm" label-width="80px">
<!--       项目名称-->
        <el-row>
          <el-col :span="12" >
            <el-form-item  label="建设项目名称" label-width="100px">
              <el-input v-model="baseMsgForm.projectName"  size="mini" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
<!--      项目类别与用途类别-->
        <el-row>
          <el-col :span="4" >
            <el-form-item  label="项目项目类别" label-width="100px">
              <el-select @change="changeCategory" v-model="baseMsgForm.category" placeholder="请输入" size="mini">
                <el-option  v-for="category in projectCategory" :label="category" :value="category"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" >
            <el-form-item   label="建设用途类别" label-width="100px">
              <el-select  v-model="baseMsgForm.useCategory" placeholder="请输入" size="mini">
                <el-option  v-for="useCategory in projectUseCategory" :label="useCategory" :value="useCategory"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--      项目建设规模与项目建设性质-->
        <el-row>
          <el-col :span="4" >
            <el-form-item  label="项目建设规模" label-width="100px">
              <el-select v-model="baseMsgForm.constructionSize" placeholder="请输入" size="mini">
                <el-option label="大型"  value="大型"></el-option>
                <el-option label="中型"  value="中型"></el-option>
                <el-option label="小型"  value="小型"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" >
            <el-form-item   label="建设建设性质" label-width="100px">
              <el-select v-model="baseMsgForm.constructionProperty" placeholder="请输入" size="mini">
                <el-option label="新建"  value="新建"></el-option>
                <el-option label="改建"  value="改建"></el-option>
                <el-option label="扩建"  value="扩建"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
<!--        建设模式、是否重点项目-->
        <el-row>
          <el-col :span="4" >
            <el-form-item  label="项目建设模式" label-width="100px">
              <el-select v-model="baseMsgForm.constructionMode" placeholder="请输入" size="mini">
                <el-option  v-for="constructionMode in constructionModeData" :label="constructionMode" :value="constructionMode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" >
            <el-form-item   label="是否重点项目" label-width="100px">
              <el-select v-model="baseMsgForm.isImportantProject" placeholder="请输入" size="mini">
                <el-option label="否"  value=0></el-option>
                <el-option label="是"  value=1></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
<!--        计划开工日期、计划竣工日期	-->
        <el-row>
          <el-col :span="4" >
            <el-form-item  label="计划开工日期" label-width="100px">
              <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date" placeholder="选择日期" v-model="baseMsgForm.startTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4" >
            <el-form-item   label="计划竣工日期" label-width="100px">
              <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date" placeholder="选择日期" v-model="baseMsgForm.endTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
<!--施工总面积/长度、-->
        <el-row>
          <el-col :span="4" >
            <el-form-item  label="施工总面积" label-width="100px">
              <el-input  size="mini" placeholder="请输入内容" v-model="baseMsgForm.constructionArea">
                <template  slot="suffix">
                  <span>平方米</span>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
<!--    建设项目概况    -->
        <el-row>
          <el-col :span="8" >
            <el-form-item  label="建设项目概况" label-width="100px">
              <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model="baseMsgForm.projectComment">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-collapse-item>
<!--   项目位置信息 -->
    <el-collapse-item title="项目位置信息" name="3">
      <el-form ref="locationForm" :model="locationForm" label-width="80px">
<!--        项目所属区划-->
        <el-row>
          <el-col :span="6" >
            <el-form-item  label="项目所属区划" label-width="100px">
              <el-input v-model="locationForm.region"  size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
<!--项目建设地址-->
        <el-row>
          <el-col :span="6" >
            <el-form-item  label="项目建设地址" label-width="100px">
              <el-input v-model="locationForm.location" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-collapse-item>
<!--  项目立项信息  -->
    <el-collapse-item title="项目立项信息" name="4">

      <el-form ref="identificationMsgForm" :model="identificationMsgForm" label-width="80px">
        <!-- 项目立项文号、项目立项级别-->
        <el-row>
          <el-col :span="6" >
            <el-form-item  label="项目立项文号" label-width="100px">
              <el-input v-model="identificationMsgForm.approvalCode" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item  label="项目立项级别" label-width="100px">
                <el-select v-model="identificationMsgForm.level" placeholder="请输入" size="mini">
                  <el-option label="部级"  value="部级"></el-option>
                  <el-option label="省(自治区)级"  value="省(自治区)级"></el-option>
                  <el-option label="区县级"  value="区县级"></el-option>
                  <el-option label="其他"  value="其他"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--立项批复机关、立项批复时间-->
        <el-row>
          <el-col :span="6" >
            <el-form-item  label="立项批复机关" label-width="100px">
              <el-input v-model="identificationMsgForm.approvalCompany" size="mini"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item  label="立项批复时间" label-width="100px">
              <el-date-picker  value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="identificationMsgForm.rescriptumTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!--用地规划许可证编号-->
        <el-row>
          <el-col :span="6" >
            <el-form-item  label="用地规划许可证编号" label-width="100px">
              <el-input v-model="identificationMsgForm.landUsePermitCode" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--工程规划许可证编号-->
        <el-row>
          <el-col :span="6"  >
            <el-form-item  label="工程规划许可证编号" label-width="100px">
              <el-input v-model="identificationMsgForm.constructionPermitCode" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

    </el-collapse-item>
    <el-collapse-item title="项目资金来源" name="5">
      <el-row>
        <el-col :span="5"  :pull="1">
          <el-button @click="addMoneyComeFromWay" type="primary">
            添加资金来源
          </el-button>
        </el-col>
      </el-row>
      <el-table
          :data="moneyComeFromWayFrom.moneyComeFromWay"
          style="width: 100%"
          :span-method="arraySpanMethod"
          show-summary
          :summary-method="getTotalMoney"
          border>

        <el-table-column
            label="操作"
            width="180">
          <template slot-scope="scope">
            <el-button type="danger" @click="moneyComeFromWayFrom.moneyComeFromWay.splice(scope.$index, 1)" v-if="scope.$index != 0">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column
            label="资金来源"
            width="180">
          <template slot-scope="scope">
            <el-select  v-model="scope.row.comeFrom" placeholder="请选择" size="mini">
              <el-option  v-for="come in comeFromWay" :label="come" :value="come"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="金额" prop="money">
          <template slot-scope="scope">
            <el-input v-model="scope.row.money" placeholder="请输入内容">
              <template slot="append">万元</template>
            </el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-collapse-item>
  </el-collapse>


</div>

</template>

<script>
import ManageStaff from "@/components/employer/enterprise/ManageStaff";
export default {
  name: "CreateProject",
  data(){
    return {


      personalMsg:JSON.parse(sessionStorage.getItem('userInfo')),
      projectCategory:['房屋建筑','市政公用工程','其它'],
      projectUseCategory:['居住建筑','工业建筑','装饰装修','节能改造','消防改造','高耸构筑物','居住建筑配套工程','公共建筑','办公建筑','商业建筑','旅游建筑','科教文卫建筑','交通运输类','通信建筑','公共建筑配套工程','商住楼','农业建筑','农业建筑配套工程','工业建筑配套工程','其它'],
      projectUseCategory1:['居住建筑','工业建筑','装饰装修','节能改造','消防改造','高耸构筑物','居住建筑配套工程','公共建筑','办公建筑','商业建筑','旅游建筑','科教文卫建筑','交通运输类','通信建筑','公共建筑配套工程','商住楼','农业建筑','农业建筑配套工程','工业建筑配套工程','其它'],
      projectUseCategory2:['城市道路','给水工程','排水工程','燃气工程','热力工程','城市轨道交通','城市照明','园林绿化','河堤、挡墙工程','城市桥梁','其它市政工程','环境卫生','公共交通','综合管廊','隧道'],
      projectUseCategory3:['其它'],
      constructionModeData:['自建','建设-转让(BT)','代建制','建设-经营-转让(BOT)','建设-拥有-经营(BOO)','建设-拥有-经营-转让(BOOT)','设计-采购-施工(EPC)','其它'],
      comeFromWay:['中央及省级资金投资','市州及县级资金投资','国有企业资金投资','集体经济组织投资','外商(国)投资','私(民)营投资','其他资金来源'],

      leaderChooseDialogShow:false,
      leaderForm:{
        chooseLeader:{},
        staffs:[],
      },
      baseMsgForm:{
        projectName:'',
        category:'',
        useCategory:'',
        constructionSize:'',
        constructionProperty:'',
        constructionMode:'',
        isImportantProject:0,
        startTime:'',
        endTime:'',
        constructionArea:0,
        projectComment:'',

      },
      locationForm:{
        region:'',
        location:''
      },
      identificationMsgForm:{
        approvalCode:'',
        approvalCompany:'',
        level:'',
        rescriptumTime:'',
        landUsePermitCode:'',
        constructionPermitCode:''
      },
      moneyComeFromWayFrom:{
        moneyComeFromWay: [{
          comeFrom: '',
          money: 0,
        }],
        totalMoney:0
      }

    }
  },
  methods: {
    changeCategory(e) {
      let _this = this
      if (e == 0) {
        _this.projectUseCategory = _this.projectUseCategory1
      } else if (e == 1) {
        _this.projectUseCategory = _this.projectUseCategory2
      } else if (e == 2) {
        _this.projectUseCategory = _this.projectUseCategory3
      }
      _this.useCategory = 0;
    },
    addMoneyComeFromWay(){
      let moneyComeFromWay = {
        comeFrom: 0,
        money: 0
      }
      this.moneyComeFromWayFrom.moneyComeFromWay.push(moneyComeFromWay)
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 3) {
          return [100, 1];
        }
    },
    getTotalMoney(param) {
//此处打印param可以看到有两项，一项是columns，一项是data，最后一列可以通过columns.length获取到。
      const { columns, data } = param
      const len = columns.length
      const sums = []
      columns.forEach((column, index) => {
        //如果是第一列，则最后一行展示为“总计”两个字
        if (index === 0) {
          sums[index] = '总计'
          //如果是最后一列，索引为列数-1，则显示计算总和
        } else if (index === len - 1) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += '万元'
          } else {
            sums[index] = 'N/A'
          }
          //如果是除了第一列和最后一列的其他列，则显示为空
        } else {
          sums[index] = ''
        }
      })
      return sums

    },

    createProject(){
      let projectMsg = Object.assign(this.baseMsgForm,this.locationForm)
      projectMsg = Object.assign(projectMsg,this.identificationMsgForm)
      let employerId = {'projectEmployerId':this.personalMsg.id}
      projectMsg = Object.assign(projectMsg,employerId)

      let data ={'ProjectLeaderId':this.leaderForm.chooseLeader.id,'projectMsg':projectMsg,'projectMoney':this.moneyComeFromWayFrom.moneyComeFromWay }

      this.$axios.post('/employer/addProjectMsg', data)
          .then(res => {
            alert(res.data.msg)
          })



      console.log(projectMsg)
    },
    leaderChooseDialogShowFunction(){
      let id =  JSON.parse(sessionStorage.getItem('userInfo')).id
      this.$axios.get("/employer/getEmployerStaffs/" +id)
          .then(res=>{
            this.leaderForm.staffs= res.data.data
          })
      this.leaderChooseDialogShow = true
    },
    chooseLeaderFunction(row, column, event){
      this.leaderForm.chooseLeader  = row
      this.leaderChooseDialogShow = false
    }
  }

}
</script>

<style scoped>
</style>
<template>
  <div>
    <el-row>
      <el-col style=" margin-top: 50px" :span="24" >
        <el-tabs  active-name="first"  type="card">

          <el-tab-pane label="项目信息" name="first">

            <el-row>
              <el-col align="center" :span="24">
                  <el-tabs  active-name="first">
                    <el-tab-pane label="项目建设信息" name="first">

                      <table cellspacing="0" cellpadding="0" border="1">
                        <colgroup>
                          <col bgcolor="#efefef" width="200px" >
                          <col width="300px">
                          <col bgcolor="#efefef" width="200px" >
                          <col width="150px">
                        </colgroup>
                        <tbody>
                        <tr>
                          <th>项目名称</th>
                          <td colspan="3">
                            {{ projectMsg.projectName }}
                          </td>
                        </tr>
                        <tr>
                          <th>项目类别</th>
                          <td>{{ projectMsg.category }}</td>
                          <th>项目用途</th>
                          <td>{{ projectMsg.useCategory }}</td>
                        </tr>
                        <tr>
                          <th>建设性质</th>
                          <td colspan="3"> {{ projectMsg.constructionProperty }}</td>
                        </tr>
                        <tr>
                          <th>总投资（万元）</th>
                          <td>{{ totalMoney }}</td>
                          <th>施工总面积（平方米）</th>
                          <td>  {{ projectMsg.constructionArea }}</td>
                        </tr>
                        <tr>
                          <th>建设规模</th>
                          <td> {{ projectMsg.constructionSize}}</td>
                          <th>建设模式</th>
                          <td> {{ projectMsg.constructionMode }}</td>
                        </tr>
                        <tr>
                          <th>项目所属区划</th>
                          <td colspan="3"> {{ projectMsg.region }}</td>
                        </tr>
                        <tr>
                          <th>项目建设地点</th>
                          <td colspan="3"> {{ projectMsg.location }}</td>
                        </tr>
                        <tr>
                          <th>计划开工日期</th>
                          <td> {{ projectMsg.startTime }}</td>
                          <th>计划竣工日期</th>
                          <td> {{ projectMsg.endTime }}</td>
                        </tr>
                        <tr>
                          <th>立项文号</th>
                          <td> {{ projectMsg.approvalCode }}</td>
                          <th>立项级别</th>
                          <td>{{ projectMsg.level }}</td>
                        </tr>
                        <tr>
                          <th>立项批复机关</th>
                          <td>{{ projectMsg.approvalCompany}}</td>
                          <th>立项批复时间</th>
                          <td>{{ projectMsg.rescriptumTime }}</td>
                        </tr>
                        <tr>
                          <th>建设用地规划许可证编号</th>
                          <td>{{ projectMsg.landUsePermitCode }}</td>
                          <th>建设工程规划许可证编号</th>
                          <td>{{ projectMsg.constructionPermitCode }}</td>
                        </tr>
                        <tr>
                          <th>建设项目概况</th>
                          <td colspan="3">{{projectMsg.projectComment}}</td>
                        </tr>
                        </tbody>
                      </table>

                    </el-tab-pane>
                    <el-tab-pane label="项目资金来源" name="second">

                      <table cellspacing="0" cellpadding="0" border="1">
                        <colgroup>
                          <col width="1000px">
                          <col width="1000px">
                          <col width="1000px">
                        </colgroup>
                        <tbody>
                        <tr bgcolor="#efefef">
                          <th>资金来源</th>
                          <th>资金（万元）</th>
                          <th>预算总投资（万元）</th>
                        </tr>



                        <tr v-for="money in projectMoney" id="first_model">
                          <td id="first_model1" style="text-align:center; vertical-align:middle;">
                            {{ money.comeFrom }}
                          </td>
                          <td id="first_model2" style="text-align:center; vertical-align:middle;">
                            {{ money.money }}
                          </td>

                          <td id="proj_ztz" rowspan="1" style="text-align:center; vertical-align:middle;">
                            {{ totalMoney }}
                          </td>
                        </tr>

                        </tbody>
                      </table>

                    </el-tab-pane>
                  </el-tabs>
              </el-col>
            </el-row>

          </el-tab-pane>

          <el-tab-pane label="合同信息" name="second">
            <el-tabs active-name="first">

              <el-tab-pane label="设计院" name="first">
                <div style="width: 100%;height: 500px">
                  同还没有与设计院签订合
                  <el-button @click="makeContractShow=true; makeContractTo = 1">创建合同</el-button>
                </div>
              </el-tab-pane>
              <el-tab-pane label="图审机构" name="second">
                <el-row>
                  <el-col :span="18">
                    <el-card>
                      <div slot="header" class="clearfix">
                        <span>合同信息</span>
                      </div>
                      <table cellspacing="0" cellpadding="0" border="1">
                        <colgroup>
                          <col bgcolor="#efefef" width="200px" >
                          <col width="300px">
                          <col bgcolor="#efefef" width="200px" >
                          <col width="150px">
                        </colgroup>
                        <tbody>
                        <tr>
                          <th>建设单位</th>
                          <td>xxxxxx公司</td>
                          <th>建设单位负责人</th>
                          <td>李x</td>
                        </tr>
                        <tr>
                          <th>负责人联系手机</th>
                          <td>13767xxxx</td>
                          <th>负责人联系邮箱</th>
                          <td>9xxx@qq.com</td>
                        </tr>
                        <tr>
                          <th>工程名称</th>
                          <td colspan="3">
                            xxx厂区设计工程1标段
                            (<span class="td-sub-title">&nbsp;编号：xxxxx02-SJ001</span>)
                          </td>
                        </tr>
                        <tr>
                          <th>发包单位</th>
                          <td colspan="3">xxxx公司</td>
                        </tr>
                        <tr>
                          <th>合同签订日期</th>
                          <td colspan="3">2020-12-07</td>
                        </tr>
                        <tr>
                          <th>发包方式</th>
                          <td>直接发包</td>
                          <th>最终合同价</th>
                          <td>13(万元)
                          </td>
                        </tr>
                        <tr>
                          <th>合同开始日期</th>
                          <td>2020-12-07</td>
                          <th>合同结束日期</th>
                          <td>2023-12-07</td>
                        </tr>
                        <tr>
                          <th>承接单位</th>
                          <td colspan="3">
                            <span class="td-title">xxxx研究院</span>
                            (<span class="td-sub-title">&nbsp;158275987</span>)
                          </td>
                        </tr>
                        <tr>
                          <th>承接单位资质项</th>
                          <td colspan="3">【A136000352】工程设计建筑行业（建筑工程）甲级
                          </td>
                        </tr>
                        <tr>
                          <th>发包内容描述</th>
                          <td colspan="3">该设计工程包含：xxxxx单位工程。</td>
                        </tr>
                        <tr>
                          <th>合同状态</th>
                          <td colspan="3">已同意</td>
                        </tr>
                        </tbody>
                      </table>

                    </el-card>

                  </el-col>
                  <el-col :span="4" :push="1">
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <span>可选操作</span>
                      </div>
                      <el-button>删除合同</el-button>
                    </el-card>
                  </el-col>
                </el-row>

              </el-tab-pane>
              <el-tab-pane label="施工方" name="third">
                合同信息
              </el-tab-pane>
            </el-tabs>

            <el-dialog
                title="签订合同"
                :visible.sync="makeContractShow"
                width="30%"
                :before-close="makeContractDialogClose">
              <MakeContract @closeMakeContract="makeContractShow =false" v-bind:make-contract-to-who="makeContractTo" :project-id="this.projectMsg.projectId"></MakeContract>
            </el-dialog>





          </el-tab-pane>

          <el-tab-pane label="项目进度" name="third">

            <el-row>
              <el-col :span="18" :push="4">
                <div style="height: 300px" >
                  <el-steps direction="vertical" :active="1" finish-status="success">
                    <el-step title="确认合同"></el-step>
                    <el-step title="选择负责人"></el-step>
                    <el-step title="确定设计图纸"></el-step>
                    <el-step title="设计图纸审核"></el-step>
                    <el-step title="施工方开工"></el-step>
                  </el-steps>
                </div>

              </el-col>
            </el-row>
          </el-tab-pane>



        </el-tabs>
      </el-col>
    </el-row>

  </div>
</template>

<script>

import MakeContract from "@/components/employer/MakeContract";

export default {
  name: "ProjectInfo",
  components:{MakeContract},
  props:{projectMsg: {}},
  data(){
    return{
      makeContractShow: false,
      projectContract:[],
      projectMoney: [],
      makeContractTo:0, //1设计单位 2审图单位 3施工方
      totalMoney: 0,
    }
  },
  methods:{
    makeContractDialogClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    getTotalMoney() {
      this.$axios.get('/employer/getProjectMoney/' + this.projectMsg.projectId)
          .then(res => {
            this.projectMoney = res.data.data
            this.totalMoney = 0
            this.projectMoney.forEach(item =>{
              this.totalMoney+=item.money
            })
          })
    },

    getProjectContract(){

    }

  },
  mounted() {
    this.getTotalMoney()
    this.getProjectContract()
  }
}
</script>

<style scoped>



</style>
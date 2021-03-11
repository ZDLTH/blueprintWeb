<template>
  <div>
    <el-row class="tac">
      <el-col :span="4">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :default-openeds="['1', '2']"
            @open="handleOpen"
            @close="handleClose">
          <!--            :default-openeds="['1', '2']"是默认打开index为1,2的两个导航栏-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>图纸管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="skip(0)"><i class="el-icon-s-check"></i>查看图纸</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>


      <el-col :span="15" style="margin-left: 100px;">
        <el-table
            v-show="surface == 0"
            border
            style="width: 100%"
            :default-sort = "[{prop: 'DDL', order: 'descending'}, {prop: 'name', order: 'descending'}, {prop: 'programmeNum', order: 'descending'}]"
            :data = "programmeData, stuffData">
          <el-table-column
              prop="name"
              label="项目名称"
              width="180px"
              sortable>
            <template slot-scope="scope">
              <i class="el-icon-suitcase-1"></i>
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="programmeNum"
              label="项目编号"
              width="180"
              sortable>
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <p>{{ scope.row.programmeNum }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="DDL"
              label="截止日期"
              width="160"
              sortable>
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <p>{{ scope.row.DDL }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="employee"
              label="项目委托方"
              width="210">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <p>{{ scope.row.employee}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column

              label="详细信息"
              width="230px">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="primary"
                  @click="detailVisible = true">查看</el-button>
              <el-dialog title="项目信息" :visible.sync="detailVisible">
                <el-table :data="programmeData">
                  <el-table-column property="DDL" label="截止日期" width="150"></el-table-column>
                  <el-table-column property="name" label="项目名" width="200"></el-table-column>
                  <el-table-column property="employee" label="委托人" width="150"></el-table-column>
                  <el-table-column  label="等等"></el-table-column>
                </el-table>
              </el-dialog>
            </template>
          </el-table-column>
          <el-table-column

              label="图纸信息"
              width="229px">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="primary"
                  @click="blueprintVisible = true">查看信息</el-button>
              <el-dialog title="图纸信息" :visible.sync="blueprintVisible" width="55%">
                <el-table :data="blueprintData">
                  <el-table-column property="number" label="图纸序号" width="200"></el-table-column>
                  <el-table-column property="name" label="图纸名称" width="150"></el-table-column>
                  <el-table-column property="edition" label="图纸版本" width="200"></el-table-column>
                  <el-table-column property="state" label="图纸状态" width="150">
                    <template slot-scope="scope">
                      <div slot="reference" class="name-wrapper">
                        <el-tag v-if="scope.row.state == 0" type="danger">未审核</el-tag>
                        <el-tag v-else type="success">已审核</el-tag>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="下载" width="150">
                    <template slot-scope="scope">
                      <div slot="reference" class="name-wrapper" style="margin: 5px;">
                        <a href="http://localhost:8082/programmedesigner/downloadDiagram/1" download="true">下载图纸</a>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="意见" width="150">
                    <template slot-scope="scope">
                      <div slot="reference" class="name-wrapper" style="margin: 5px;">
                        <el-button size="mini"
                                   type="primary"
                                   @click="innerVisible = true" >查看意见</el-button>
                        <el-dialog
                            width="30%"
                            title="意见"
                            :visible.sync="innerVisible"
                            append-to-body>
                          <el-input type="textarea" v-model="blueprintData.advice"></el-input>
                        </el-dialog>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ReviewerJudgeMain",
  data() {
    return {
      surface: 0, //界面编号
      loginForm: {
        logid:'',
        password:''
      },
      stuffData: [{
        value: '选项1',
        PID: '123456789012345678',
        name: '小虎',
        tel: '12345678901',
        email: '1234567890@qq.com',
        disabled: true
      }, {
        value: '选项2',
        PID: '223456789012345678',
        name: '王小虎',
        tel: '12345678901',
        email: '1234567890@qq.com'
      }, {
        value: '选项3',
        PID: '123456789012345678',
        name: '王小虎',
        tel: '12345678901',
        email: '1234567890@qq.com'
      }, {
        value: '选项4',
        PID: '123456789012345678',
        name: '王小虎',
        tel: '12345678901',
        email: '1234567890@qq.com'
      }],
      programmeData: [{
        name: '南昌大学软件楼',
        programmeNum: '20010812', //项目编号
        DDL: '20050110', //截止日期
        employee: 'XX公司', //公司名称
        manager: '',
        firstReviewer: '', //主审
        secondReviewer: '', //复审
        place: '南昌市青山湖区',
        part: [{
          name: '软件楼一楼',
          state: '已完成'
        }, {
          name: '软件楼二楼',
          state: '未完成'
        }
        ],
      }],
      blueprintData:[{
        name: '软件楼暖通',
        number: 1,
        edition: 2,
        relatedProgramme: '软件楼',
        state: 0, //审查状态，通过为1，为通过为0
        advice: ''
      },{
        name: '软件楼加压送风',
        number: 2,
        edition: 2,
        relatedProgramme: '软件楼',
        state: 1, //审查状态，主审通过为1，复审通过为2
        advice: ''
      }],
      detailVisible: false,
      blueprintVisible: false,
      innerVisible: false
    };
  },
  methods: {
    login() {
      const _this = this
      this.$axios.post('/builder/login', this.loginForm)
          .then(res => {
            const jwt = res.headers['authorization']
            const userInfo = res.data.data
            _this.$store.commit("SET_TOKEN", jwt)
            _this.$store.commit("SET_USERINFO", userInfo);

            _this.$router.push("main")

          })
    },
    downloadDiagram(){

      let xhr = new XMLHttpRequest()
      let data = {}
      xhr.open('post','http://localhost:8082/programmedesigner/downloadDiagram')
      //如果需要请求头中这是token信息可以在这设置
      xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8')
      xhr.responseType = 'blob'
      xhr.send(JSON.stringify(data))
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const blob = new Blob([xhr.response])
          let url = window.URL.createObjectURL(blob)

          //创建一个a标签元素，设置下载属性，点击下载，最后移除该元素
          let link = document.createElement('a')
          link.href = url
          link.style.display = 'none'
          //取出下载文件名
          const fileName = xhr.getResponseHeader('filename')
          const downlaodFileName = decodeURIComponent(fileName)

          link.setAttribute('download', downlaodFileName)
          link.click()
          window.URL.revokeObjectURL(url)
        }
      }

    }
  }
}
</script>

<style scoped>

</style>
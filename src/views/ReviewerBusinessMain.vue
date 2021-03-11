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
              <span>项目管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="skip(0)"><i class="el-icon-s-check"></i>任务分配</el-menu-item>
              <el-menu-item index="1-2" @click="skip(1)"><i class="el-icon-edit-outline"></i>项目进度</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>

<!--        <el-col :span="15" style="margin-left: 100px;">-->
<!--          <el-col :span="3">-->
<!--            <p style="margin:25px;">项目1</p>-->
<!--            <p style="margin:25px;">项目2</p>-->
<!--            <p style="margin:27px;">项目3</p>-->
<!--            <p style="margin:27px;">项目4</p>-->
<!--          </el-col>-->
<!--          <el-col :span="20">-->
<!--            <el-progress v-show="surface == 1" :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>-->
<!--            <el-progress v-show="surface == 1" :text-inside="true" :stroke-width="26" :percentage="100" status="success"></el-progress>-->
<!--            <el-progress v-show="surface == 1" :text-inside="true" :stroke-width="26" :percentage="80" status="warning"></el-progress>-->
<!--            <el-progress v-show="surface == 1" :text-inside="true" :stroke-width="26" :percentage="50" status="exception"></el-progress>-->
<!--          </el-col>-->
      <el-col :span="17" style="margin-left: 100px;">
      <el-table
          v-show="surface == 1"
          style="width: 100%"
          :default-sort = "[{prop: 'DDL', order: 'descending'}, {prop: 'name', order: 'descending'}, {prop: 'programmeNum', order: 'descending'}]"
          :data = "programmeData, stuffData">

        <el-table-column
            prop="name"
            label="项目名称"
            width="180"
            sortable>
          <template slot-scope="scope">
            <i class="el-icon-suitcase-1"></i>
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column
            prop="part"
            label="项目完成情况"
            width="800px"
            sortable>
          <template slot-scope="scope">
            <span v-for="p in scope.row.part" style="margin-right: 50px">
              {{ p.name}} <i class="el-icon-success" v-if="p.state=='已完成'"></i> <i class="el-icon-error" v-else></i> {{p.state}}</span>
          </template>
        </el-table-column>

      </el-table>
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
              prop="firstReviewer"
              label="主审"
              width="210">
            <template slot-scope="scope">
              <el-select v-model="value1" placeholder="请选择">
                <el-option
                    v-for="item in stuffData"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    :disabled="item.disabled">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
              prop="secondReviewer"
              label="复审"
              width="210">
            <template slot-scope="scope">
              <el-select v-model="value2" placeholder="请选择">
                <el-option
                    v-for="item in stuffData"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    :disabled="item.disabled">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="primary"
                  @click="deleteRow(scope.$index, stuffData)">确认审图人员</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "ReviewerBusinessMain",
  data() {
    return {
      form: {
        idNumber: '',
        name: '',
        creditCode: '',
        companyName: '',
        password: '',
        confirmPassword: '',
        checkCode: ''
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
        firstReviewer: '',
        secondReviewer: '',
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
      value1: '', //主审
      value2: '', //复审
      userType: '0',
      step: 0,
      surface: 0
    }
  },
  methods: {
    onSubmit() {
      var logid
      let data
      if (this.userType === 3) {
        //个人用户
        logid = this.form.idNumber;
        data = {
          user: {"logid": logid, "password": this.form.password, "tid": "1"},
          employer: {"idNumber": this.form.idNumber, "name": this.form.name, "userType": 0}
        }
      } else {
        logid = this.form.creditCode;
        data = {
          user: {"logid": logid, "password": this.form.password, "tid": "1"},
          employer: {"creditCode": this.form.creditCode, "companyName": this.form.companyName, "userType": 1}
        }
      }


      this.$axios.post("/employer/regist", data)
          .then(res => {
            alert(res.data["msg"])

          })
    },
    skip(place) {
      this.surface = place;
    },
    next() {
      this.step = 1;
      console.log('next');
    },
    checkAllInput() {
      if (this.userType == 1 || this.userType == 2) {
        if(this.step == 1 && this.companyName !== '' && this.creditCode !== '' && this.password !== '' && this.confirmPassword !== '' &&
            this.checkCode != '') {
          this.step = 2;
        }
      } else if(this.userType == 3) {
        if(this.step == 1 && this.idNumber !== '' && this.name !== '' && this.password !== '' && this.confirmPassword !== '' &&
            this.checkCode !== '') {
          this.step = 2;
        }
      }
    }
  }

}


</script>

<style scoped>

.el-row {
  margin-bottom: 20px;
}


.el-col {
  border-radius: 4px;
}


.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}


.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-header, .el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

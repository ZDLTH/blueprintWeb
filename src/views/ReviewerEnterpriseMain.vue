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
                <el-menu-item index="1-1" @click="skip(0)"><i class="el-icon-s-check"></i>项目接受</el-menu-item>
                <el-menu-item index="1-2" @click="skip(1)"><i class="el-icon-edit-outline"></i>项目分配</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">员工管理</span>
              </template>
              <el-menu-item index="2-1" @click="skip(2)"><i class="el-icon-s-management"></i>管理员工</el-menu-item>
              <el-menu-item index="2-2" @click="skip(3)"><i class="el-icon-bell"></i>员工申请</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>




<!-- 第一个表格界面 -->
        <el-col :span="15" style="margin-left: 100px;">
          <el-table
              v-show="surface == 0"
              border
              style="width: 100%"
              :default-sort = "[{prop: 'DDL', order: 'descending'}, {prop: 'name', order: 'descending'}, {prop: 'programmeNum', order: 'descending'}]"
              :data = programmeData>
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
                label="操作"
                align="center">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    @click="deleteRow(scope.$index, stuffData)">确认接受</el-button>
              </template>
            </el-table-column>
          </el-table>




<!--          第二个表格界面-->
          <el-table
              v-show="surface == 1"
              border
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
                prop="manager"
                label="项目主要负责人"
                width="210">
              <template slot-scope="scope">
                <el-select v-model="value" placeholder="请选择">
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
                    @click="deleteRow(scope.$index, stuffData)">确认负责人</el-button>
              </template>
            </el-table-column>
          </el-table>




          <!--          第三个表格界面-->
          <el-table
              v-show="surface == 2"
              border
              style="width: 100%"
              :default-sort = "[{prop: 'PID', order: 'descending'}, {prop: 'name', order: 'descending'}]"
              :data = "stuffData.filter(data => !searchText || data.name.toLowerCase().includes(searchText.toLowerCase())
              || data.PID.toLowerCase().includes(searchText.toLowerCase()))">
            <el-table-column
                prop="name"
                label="姓名"
                width="180"
                sortable>
              <template slot-scope="scope">
                <i class="el-icon-user"></i>
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="PID"
                label="身份证号"
                width="180"
                sortable>
              <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <p>{{ scope.row.PID }}</p>
                  </div>
              </template>
            </el-table-column>
            <el-table-column
                prop="tel"
                label="电话号码"
                width="160">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <p>{{ scope.row.tel }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                prop="email"
                label="电子邮箱"
                width="210">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <p>{{ scope.row.email}}</p>
                </div>
              </template>
            </el-table-column>
              <el-table-column
                  align="center">
                <template slot="header" slot-scope="scope">
                  <el-input
                      v-model="searchText"
                      size="mini"
                      placeholder="输入关键字搜索"/>
                </template>
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="danger"
                    @click="deleteRow(scope.$index, stuffData)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>




<!--          第四个表格界面-->
          <el-table
              v-show="surface == 3"
              border
              style="width: 100%"
              :default-sort = "[{prop: 'PID', order: 'descending'}, {prop: 'name', order: 'descending'}]"
              :data = "stuffData.filter(data => !searchText || data.name.toLowerCase().includes(searchText.toLowerCase())
              || data.PID.toLowerCase().includes(searchText.toLowerCase()))">
            <el-table-column
                prop="name"
                label="姓名"
                width="180"
                sortable>
              <template slot-scope="scope">
                <i class="el-icon-user"></i>
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="PID"
                label="身份证号"
                width="180"
                sortable>
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <p>{{ scope.row.PID }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                prop="tel"
                label="电话号码"
                width="160">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <p>{{ scope.row.tel }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                prop="email"
                label="电子邮箱"
                width="210">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <p>{{ scope.row.email}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                align="center">
              <template slot="header" slot-scope="scope">
                <el-input
                    v-model="searchText"
                    size="mini"
                    placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    @click="deleteRow(scope.$index, stuffData)">通过</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

    </div>
</template>

<script>
export default {
  name: "ReviewerEnterpriseMain",
  data() {
    return {
      searchText: '', //搜索框中的文字内容
      surface: 1, //四个表格界面
      programmeIndex: 0,//项目编号
      value: '',
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
        manager: '张三'
      }],
      loginForm: {
        logid:'',
        password:''
      }
    };
  },
  methods: {
    login() {
      const _this = this
      this.$axios.post('/employer/login', this.loginForm)
          .then(res => {
            const jwt = res.headers['authorization']
            const userInfo = res.data.data
            _this.$store.commit("SET_TOKEN", jwt)
            _this.$store.commit("SET_USERINFO", userInfo);

            _this.$router.push("main")

          })
    },
    skip(place) {
      this.surface = place;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
      console.log(index, row);
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  },
}
</script>

<style scoped>

</style>
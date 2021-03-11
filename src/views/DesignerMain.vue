<template>
  <div class="home">

<!--    <div class="background">-->
<!--      <img src="../assets/image/background.png" style="width: 100%; height: 100%">-->
<!--    </div>-->

  <div class="nav_bar">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">主页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作室</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">参加团队</el-menu-item>

      <el-menu-item index="4">订单管理</el-menu-item>
      <el-menu-item index="5">网站帮助</el-menu-item>
    </el-menu>

    <div class="nav_title">
      <h2>设计师主页</h2>
    </div>

    <div class="main_body">
      <div class="func_table">

        <el-col :span="12">
          <h3 style="padding-left: 50px">菜单栏</h3>
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo">
<!--              @open="handleOpen"-->
<!--              @close="handleClose">-->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>选择上传图纸</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1" @click="uploadFormShow=true">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">项目团队信息</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">提交图纸报告</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">设置个人信息</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </div>

      <div class="pro_table">

        <el-table
            :data="tableData"
            border>
          <el-table-column
              fixed
              prop="date"
              label="项目名称"
              width="150">
          </el-table-column>
          <el-table-column
              prop="name"
              label="项目负责人"
              width="120">
          </el-table-column>
          <el-table-column
              prop="province"
              label="项目人数"
              width="120">
          </el-table-column>
          <el-table-column
              prop="city"
              label="详细信息"
              width="120">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>

      <div class="info_show">
        <h3 style="padding-top: 10px; padding-bottom: -5px;">个人信息</h3>
        <div class="content_body">
          <div style="margin-bottom: 15px; margin-left: 20px">
            <el-badge :value="12" class="item">
              <el-button size="small">作品评论</el-button>
            </el-badge>
            <el-badge :value="3" class="item">
              <el-button size="small">作品回复</el-button>
            </el-badge>
            <el-badge :value="1" class="item" type="primary">
              <el-button size="small">团队信息</el-button>
            </el-badge>
            <el-badge :value="2" class="item" type="warning">
              <el-button size="small">公告刊物</el-button>
            </el-badge>
          </div>

          <div>
            <el-dropdown trigger="click">
  <span class="el-dropdown-link">
    点我查看<i class="el-icon-caret-bottom el-icon--right"></i>
  </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="clearfix">
                  评论
                  <el-badge class="mark" :value="12" />
                </el-dropdown-item>
                <el-dropdown-item class="clearfix">
                  回复
                  <el-badge class="mark" :value="3" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </div>
      </div>

      <div class="pro_schedule">

        <el-table
            :data="tableData"
            height="250">
          <el-table-column
              prop="date"
              label="项目团队名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="name"
              label="项目进度"
              width="180">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
          </el-table-column>
<!--          <el-table-column-->
<!--              prop="address"-->
<!--              label="地址">-->
<!--          </el-table-column>-->
        </el-table>

      </div>
    </div>
  </div>


    <div class="upload-container">
      <el-dialog v-loading="loading" title="上传文件" :visible.sync="uploadFormShow" width="40%" :before-close="beforeClose">
        <el-upload ref="fileUpload" class="upload-demo" drag action="http://localhost:8082/programmedesigner/uploadDiagram/" :data="data" :headers="headers" :multiple="false" accept=".pdf" :file-list="fileLists" :on-change="handleChange" :on-remove="beforeRemove" :auto-upload="false" :on-success="handleSuc" :on-error="handleError" :on-exceed="handleExceed">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传pdf文件，且不超过20M</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
        <el-button @click="beforeClose">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DesignerMain',
  data() {
    return {
      uploadFormShow: false,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      fileLists: [],

      activeIndex: '1',
      tableData: [{
        date: '项目1',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '项目2',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '项目3',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },


    //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange(files, fileList) {
      //获取最后一次得到的文件
      const aa = fileList[fileList.length - 1]
      //覆盖上一次的文件
      this.fileLists = []
      this.fileLists.push(aa)
    },
    //文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$notify.warning({
        title: '提示',
        message: '上传文件已存在,替换请先移除！',
        duration: 2000
      })
    },
    //因为el-upload中已经设置了accept的文件格式，:auto-upload="false" 将自动上传的功能关闭，所以下面的方法省略……
    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传
    handleBeforeUpoad(file) {
      var msg = file.name.substring(file.name.lastIndexOf('.') + 1)
      //判断文件格式
      if (!(msg === 'pdf')) {
        this.$refs.fileUpload.clearFiles()
        this.$notify.error({
          title: '错误',
          message: '上传文件只能是 pdf格式!',
          duration: 2000
        })
        return
      }
      //判断文件大小
      if (!(file.size / 1024 / 1024 < 20)) {
        // this.$refs.fileUpload.clearFiles()
        this.$notify.error({
          title: '错误',
          message: '上传文件大小不能超过 20MB!',
          duration: 2000
        })
        return
      }

      // return true
    },
    beforeRemove(file, fileList) {
      //清空已上传的文件列表（该方法不支持在 before-upload 中调用）
      this.$refs.fileUpload.clearFiles()
      this.fileLists = []
    },
    submit() {
      //判断上传文件，没有给出友好提示
      if (!this.fileLists || !this.fileLists.length) {
        this.$notify.error({
          title: '错误',
          message: '请选择上传的文件',
          duration: 2000
        })
        return
      }

      // 再次上传
      this.fileLists[0].status = 'ready'
      this.$refs.fileUpload.submit()
    },
    //文件上传成功时的钩子
    handleSuc(response, file, fileList) {
      //上传成功处理
      if (response.code === 200) {
        this.$notify({
          title: '成功',
          message: '上传成功',
          type: 'success',
          duration: 2000
        })
        this.beforeClose()

      } else {
        //上传失败处理
        this.$notify.error({
          title: '失败',
          message: response.msg,
          duration: 3000
        })
      }
    },
    handleError(err, file, fileList) {
      //上传失败处理
      this.$notify.error({
        title: '失败',
        message: err,
        duration: 3000
      })
    },
    beforeClose() {
      this.uploadFormShow=false
      this.$refs.fileUpload.clearFiles()
    }

  }
}
</script>

<style scoped>

  /*.background {*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*  z-index: -1;*/
  /*  position: absolute;*/
  /*}*/

  .nav_bar {
    width: 100%;
    height: 62px;
  }
  .nav_title {
    position: absolute;
    top: -7px;
    right: 100px;
    font-size: 1em;
  }

  .main_body {
    width: 100%;
    height: 400px;
  }

  .func_table {
    width: 500px;
    text-align: center;
    position: absolute;
    top: 90px;
    left: -45px;
  }

  .pro_table {
    width: 525px;
    height: 500px;
    float: left;
    margin-left: 215px;
  }

  .info_show {
    width: 500px;
    height: 140px;
    text-align: center;
    background-color: #f8f6f6;
    border-radius: 10px;
    margin-left: 750px;
    margin-top: 45px;
    box-shadow: 0 0 10px #d2d0d0;
    /*background-image: url("../assets/image/background.png");*/
    /*background-size: 100% 100%;*/
  }

  .item {
    margin-top: 10px;
    margin-right: 40px;
  }

  .pro_schedule {
    border-radius: 10px;
    width: 500px;
    margin-left: 770px;
    margin-top: 50px;
    position: absolute;
  }
</style>

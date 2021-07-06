<template>
  <div class="home">
    <div class="home-top">
      <div class="home-top-left">
        <img v-if="userInfo.avatar" :src="userInfo.avatar" :alt="userInfo.name">
        <img v-else src="../assets/images/logo.png">
        <span v-text="userInfo.name"></span>
      </div>
      <div class="home-top-right"></div>
    </div>
    <div class="home-content">
      <div class="home-content-left">
        <div class="home-content-left-item" :class="{'selected':selected=='user_optional'}" key="user_optional">
          <span @click="changeOwner('user_optional')" >我的自选</span>
        </div>
        <div class="home-content-left-item" key="user_warning" :class="{'selected':selected=='user_warning'}">
          <span @click="changeOwner('user_warning')">我的预警</span>
        </div>
        <div class="home-content-left-item" key="user_codes" :class="{'selected':selected=='user_codes'}">
          <span @click="changeOwner('user_codes')">我的中签</span>
        </div>
        <div class="home-content-left-item" key="user_black" :class="{'selected':selected=='user_black'}">
          <span @click="changeOwner('user_black')">我的黑名单</span>
        </div>
      </div>
      <div class="home-content-right">
        <div class="home-content-right-nav">
          <div>
            <el-upload class="upload-demo" action="/api/logs/excel/import" :on-success="uploadBack" :show-file-list=false style="float: left;">
              <el-button size="small" type="primary">Excel上传</el-button>
            </el-upload>
            <el-button type="primary" size="mini" @click="dialogFormVisible = true" style="float: right; height: 32px;margin-left:5px">新增</el-button>
          </div>

          <el-dialog title="新增日志" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="代码 *" :label-width="formLabelWidth">
                <el-input v-model="form.type" autocomplete="off" placeholder="eg:110072"></el-input>
              </el-form-item>
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="form.type_name" autocomplete="off" placeholder="eg:广汇转债"></el-input>
              </el-form-item>
              <el-form-item label="价格涨到" :label-width="formLabelWidth" v-if="selected == 'user_warning'">
                <el-input v-model="form.up" autocomplete="off" placeholder="eg:100.67"></el-input>
              </el-form-item>
              <el-form-item label="价格跌到" :label-width="formLabelWidth" v-if="selected == 'user_warning'">
                <el-input v-model="form.down" autocomplete="off" placeholder="eg:98.99"></el-input>
              </el-form-item>
              <el-form-item label="涨跌幅(%)" :label-width="formLabelWidth" v-if="selected == 'user_warning'">
                <el-input v-model="form.percent" autocomplete="off" placeholder="eg:8"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addLogs">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="home-content-right-table">
          <el-table :data="tableData" empty-text="暂无相关数据">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="type" label="代码"></el-table-column>
            <el-table-column prop="type_name" label="名称"></el-table-column>
            <el-table-column prop="op_name" label="操作类型"></el-table-column>
            <el-table-column prop="warning.up" label="涨到" v-if="selected == 'user_warning'"></el-table-column>
            <el-table-column prop="warning.down" label="跌倒" v-if="selected == 'user_warning'"></el-table-column>
            <el-table-column prop="warning.percent" label="涨跌幅" v-if="selected == 'user_warning'"></el-table-column>
            <el-table-column prop="created_at" label="添加时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span title="编辑" @click="editLog(scope.row)" v-if="selected == 'user_warning'" style="cursor: pointer;">编辑</span>
                <span title="删除" @click="delLog(scope.$index, scope.row)" style="cursor: pointer;">删除</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo: this.$cookies.get('userInfo'),
      ownerList: [],
      tableData: [],
      selected: 'user_optional',
      dialogFormVisible: false,
      form: {
        type: '',
        type_name: '',
        up: '',
        down: '',
        percent: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    getOwnList () {
      this.$api.ownList({ access_token: this.userInfo.access_token }).then(res => {
        if (res.error_code === 0) {
          this.ownerList = res.data
          this.tableData = res.data[this.selected]
        } else {
          this.$message({showClose: true, type: 'error', message: res.error_message})
          return false
        }
      })
    },
    changeOwner (key) {
      this.tableData = this.ownerList[key]
      this.selected = key
    },
    addLogs () {
      // 新增自选、预警、中签、黑名单
      let params = {op_key: this.selected, type: this.form.type, type_name: this.form.type_name}
      if (this.selected === 'user_warning') {
        params.up = this.form.up
        params.down = this.form.down
        params.percent = this.form.percent
      }
      this.$api.addLogs(params).then(res => {
        if (res.error_code === 0) {
          this.dialogFormVisible = false
          this.$message({showClose: true, type: 'success', message: '添加 ' + this.form.type_name + ' 成功'})
        } else {
          this.$message({showClose: true, type: 'error', message: res.error_message})
          return false
        }
      })
    },
    editLog (row) {
      this.form = row.warning
      this.dialogFormVisible = true
    },
    delLog (index, row) {
      let params = {op_id: row.op_id, types: row.type, type_names: row.type_name}
      this.$api.delLogs(params).then(res => {
        if (res.error_code === 0) {
          this.$message({showClose: true, type: 'success', message: '删除 ' + row.type_name + ' 成功'})
          // delete this.ownerList[this.selected][index]
          // this.tableData = this.ownerList[this.selected]
          // this.$router.go(0)
        } else {
          this.$message({showClose: true, type: 'error', message: res.error_message})
          return false
        }
      })
    },
    uploadBack (res, file) {
      if (res.error_code === 0) {
        this.$message({showClose: true, type: 'success', message: '上传 ' + file.name + ' 成功'})
      } else {
        this.$message({showClose: true, type: 'error', message: res.error_message})
        return false
      }
    }
  },
  created () {
    if (!this.userInfo) {
      this.$router.push('login')
    }
    this.getOwnList()
  }
}

</script>

<style>
  .home {
    min-height: calc(100% - 66px - 100px);
    background: #f8f8f8;
    padding: 20px;
  }

  .home .home-top {
    height: 200px;
    background: #11181E;
    display: none;
  }

  .home .home-content {
    display: flex;
    width: 90%;
    margin: 0 auto;
  }
  .home .home-content .home-content-left {
    flex: 0 0 200px;
    background: #ffffff;
  }
  .home .home-content .home-content-left .home-content-left-item {
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #333333;
  }
  .home .home-content .home-content-left .home-content-left-item:hover {
    background: #DD2F3C;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #ffffff;
  }
  .home .home-content .home-content-left .selected {
    border-left: 4px solid #ff0000;
  }
  .home .home-content .home-content-left .home-content-left-item span {
    width: 56px;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
  }
  .home .home-content .home-content-right {
    flex: 1;
    /*background: #ffffff;*/
    margin-left: 20px;
  }
  .home .home-content .home-content-right-nav {
    background: #ffffff;
    margin-bottom: 10px;
    float: right;
  }
</style>

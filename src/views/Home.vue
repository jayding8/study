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
        <div class="home-content-left-item" key="user_optional">
          <span @click="changeOwner('user_optional')">我的自选</span>
        </div>
        <div class="home-content-left-item" key="user_warning">
          <span @click="changeOwner('user_warning')">我的预警</span>
        </div>
        <div class="home-content-left-item" key="user_codes">
          <span @click="changeOwner('user_codes')">我的中签</span>
        </div>
        <div class="home-content-left-item" key="user_black">
          <span @click="changeOwner('user_black')">我的黑名单</span>
        </div>
      </div>
      <div class="home-content-right">
        <div class="home-content-right-table">
          <el-table :data="tableData" empty-text="暂无相关数据">
            <el-table-column prop="type" label="代码">
            </el-table-column>
            <el-table-column prop="type_name" label="名称">
            </el-table-column>
            <el-table-column prop="op_name" label="操作类型">
            </el-table-column>
            <el-table-column prop="created_at" label="添加时间">
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
      tableData: []
    }
  },
  methods: {
    getOwnList () {
      this.$api.ownList({ access_token: this.userInfo.access_token }).then(res => {
        if (res.error_code === 0) {
          this.ownerList = res.data
          this.tableData = res.data['user_optional']
        } else {
          this.$message({showClose: true, type: 'error', message: res.error_message})
          return false
        }
      })
    },
    changeOwner (type) {
      this.tableData = this.ownerList[type]
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
    height: calc(100% - 66px - 100px);
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
  .home .home-content .home-content-left .home-content-left-item span {
    width: 56px;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
  }
  .home .home-content .home-content-right {
    flex: 1;
    background: #ffffff;
    margin-left: 20px;
  }
</style>

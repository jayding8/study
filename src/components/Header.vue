<template>
  <div class="header">
    <div class="header-left">
      <img src="../assets/images/jayding.png" alt="" @click="() => $router.push('/')">
    </div>
    <div class="header-middle">
      <div class="header-middle-item" @click="() => $router.push('Form')">可转债</div>
    </div>
    <div class="header-right">
      <el-dropdown v-if="userInfo && userInfo.access_token" @command="handleCommand">
        <span class="el-dropdown-link">
          <img v-if="userInfo && userInfo.avatar" :src="userInfo.avatar" :alt="userInfo.name">
          <img v-else src="../assets/images/logo.png" alt="用户信息">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">{{userInfo.name}}</el-dropdown-item>
          <!-- <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item> -->
          <el-dropdown-item command="loginout" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div v-else>
        <el-button type="primary" size="mini" @click="goLogin">登录</el-button>
        <!-- <el-button type="primary" size="mini" @click="register">注册</el-button> -->
        <el-button type="info" size="mini" @click="register">注册</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo: this.$cookies.get('userInfo')
    }
  },
  // props: ['userInfo'],
  methods: {
    handleCommand (command) {
      // this.$message('click on item ' + command)
      switch (command) {
        case 'loginout':
          this.$cookies.remove('userInfo')
          location.href = location.href
          break
        case 'home':
          this.$router.push('home')
          break
      }
    },
    goLogin () {
      this.$router.push('Login')
      // this.$message({message: 'login', type: 'success'})
    },
    register () {
      this.$message({ message: '暂未开放注册，敬请期待！', type: 'warning', duration: '2000' })
    }
  }
}

</script>
<style>
.header {
  width: 100%;
  height: 66px;
  background-color: rgb(10, 80, 180);
  /*background-color: #00bfff;*/
  display: flex;
  color: #fff;
}

.header .header-left {
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header .header-left img {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
}

.header .header-middle {
  width: 70%;
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 20px;
}

.header .header-middle .header-middle-item {
  cursor: pointer;
}

.header .header-right {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header .header-right img {
  width: 50px;
  height: 50px;
}

/************* 自定义样式结束 *************/

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

</style>

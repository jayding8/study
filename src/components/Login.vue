<template>
  <div class="login">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        name: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        name: [
          { validator: checkName, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.login({name: this.ruleForm.name, password: this.ruleForm.pass}).then(res => {
            if (res.error_code === 0) {
              this.$cookies.set('userInfo', res.data, '7d')
              alert('登录成功')
              this.$router.back()
              // location.href =
            } else {
              console.log(res.error_code + ':' + res.error_message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    // this.$emit('publicShow', false)
  }
}

</script>
<style>
.login {
  width: 100%;
  height: 70%;
  min-height: 800px;
  background: url(../assets/images/bgLogin.png) no-repeat 50%;
  background-size: cover;
  background-color: #000;
  /*position: fixed;*/
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

<template>
  <div class="footer">
    <div class="footer-content">
      <span class="footer-content-item" @click="open('关于我们')"> 关于我们 </span>
      <span> - </span>
      <span class="footer-content-item" @click="open('联系我们')"> 联系我们 </span>
      <span> - </span>
      <span class="footer-content-item" @click="open('版权声明')"> 版权声明 </span>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    open (title) {
      this.$alert('这是' + title, title, {
        confirmButtonText: '确定'
        // callback: action => {
        //   this.$message({
        //     type: 'info',
        //     message: `action: ${ action }`
        //   });
        // }
      })
    }
  }
}

</script>
<style>
.footer {
  width: 100%;
  height: 100px;
  background: url(../assets/images/footer.png) no-repeat;
  color: #fff;
  background-size: cover;
  font-size: 14px;
  line-height: 100px;
}

.footer .footer-content .footer-content-item {
  cursor: pointer;
}

</style>

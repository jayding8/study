<template>
  <div id="app">
    <header-view v-if="show_header"></header-view>
    <router-view  @publicShow='publicShow' />
    <footer-view v-if="show_footer"></footer-view>
  </div>
</template>
<script>
import headerView from '@/components/Header'
import footerView from '@/components/Footer'
export default {
  name: 'App',
  components: {
    headerView,
    footerView
  },
  data () {
    return {
      show_header: true,
      show_footer: true
    }
  },
  methods: {
    publicShow (boll) {
      this.show_header = boll
      this.show_footer = boll
    }
  }
}

</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  height: 100%;
}

a {
  text-decoration: none;
}
</style>

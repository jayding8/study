import Vue from 'vue'
import Router from 'vue-router'

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index')
  }, {
    path: '/form',
    name: 'Form',
    component: () => import('@/views/Form')
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Login')
  }, {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home')
  }]
})

// 获取原型对象上的push函数
const originalPush = Router.prototype.push
// 修改原型对象中的push方法
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

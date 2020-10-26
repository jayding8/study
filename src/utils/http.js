import axios from 'axios'

const http = axios.create({
  baseURL: '/api/',
  timeout: 30000,
  headers: { 'content-type': 'application/json' }
})

export default {
  get (url, params) {
    return new Promise((resolve, reject) => {
      http({
        method: 'get',
        url,
        params: params
      }).then(res => {
        // deal success
        // console.log('success', res)
        resolve(res.data)
      }).catch(err => {
        // deal error
        console.log('error', err)
      })
    })
  },
  post (url, params) {
    return new Promise((resolve, reject) => {
      http({
        method: 'post',
        url,
        params: params
      }).then(res => {
        // deal success
        // console.log(res)
        resolve(res.data)
      }).catch(err => {
        // deal error
        console.log(err)
      })
    })
  },
  delete (url, params) {
    return new Promise((resolve, reject) => {
      http({
        method: 'delete',
        url,
        params: params
      }).then(res => {
        // deal success
        // console.log(res)
        resolve(res.data)
      }).catch(err => {
        // deal error
        console.log(err)
      })
    })
  }

}

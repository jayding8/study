import http from './http'

export const lowRiskStrategy = (params) => http.get('kzz/lowRiskKzz', params)
export const login = (params) => http.post('auth/login', params)

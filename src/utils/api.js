import http from './http'

export const lowRiskStrategy = (params) => http.get('kzz/lowRiskKzz', params)

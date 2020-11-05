import http from './http'

export const lowRiskStrategy = (params) => http.get('kzz/lowRiskKzz', params)
export const login = (params) => http.post('auth/login', params)
export const addLogs = (params) => http.post('logs/log', params)
export const delLogs = (params) => http.delete('logs/log', params)
export const ownList = (params) => http.get('logs/log', params)

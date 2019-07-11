import request from '@/utils/request'

export function weather(data) {
  return request({
    url: '/tools/weather',
    method: 'post',
    data
  })
}

export function express(data) {
  return request({
    url: '/tools/express',
    method: 'post',
    data
  })
}

export function expressType() {
  return request({
    url: '/tools/expressType',
    method: 'get'
  })
}

export function robot(data) {
  return request({
    url: '/tools/robot',
    method: 'post',
    data
  })
}
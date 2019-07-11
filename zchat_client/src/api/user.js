import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function fetchList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

export function getUser(uid) {
  return request({
    url: '/user/getByUid',
    method: 'post',
    data: {
      uid: uid
    }
  })
}

export function profile(data) {
  return request({
    url: '/user/profile',
    method: 'post',
    data
  })
}

export function searchFriend(keyword) {
  return request({
    url: '/user/search',
    method: 'post',
    data: {
      keyword: keyword
    }
  })
}

export function deleteUser(uid) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data: {
      uid: uid
    }
  })
}
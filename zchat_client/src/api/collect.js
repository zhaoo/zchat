import request from '@/utils/request'

export function createCollect(data) {
  return request({
    url: '/collect/createCollect',
    method: 'post',
    data
  })
}

export function getCollectByUid(uid) {
  return request({
    url: '/collect/getCollectByUid',
    method: 'post',
    data: {
      uid: uid
    }
  })
}

export function getCollectById(id) {
  return request({
    url: '/collect/getCollectById',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function searchCollect(keyword, uid) {
  return request({
    url: '/collect/search',
    method: 'post',
    data: {
      keyword: keyword,
      uid: uid
    }
  })
}
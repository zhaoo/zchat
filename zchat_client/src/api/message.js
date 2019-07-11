import request from '@/utils/request'

export function getMsg(uid) {
  return request({
    url: '/message/getByUid',
    method: 'post',
    data: {
      uid: uid
    }
  })
}

export function getMsgByFid(fid) {
  return request({
    url: '/message/getByFid',
    method: 'post',
    data: {
      fid: fid
    }
  })
}

export function updateRead(id) {
  return request({
    url: '/message/updateRead',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function deleteMsg(id) {
  return request({
    url: '/message/deleteMsg',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function searchMessage(keyword, uid) {
  return request({
    url: '/message/search',
    method: 'post',
    data: {
      keyword: keyword,
      uid: uid
    }
  })
}
const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.nickname,
  id: state => state.user.id,
  username: state => state.user.username,
  user: state => state.user
}
export default getters

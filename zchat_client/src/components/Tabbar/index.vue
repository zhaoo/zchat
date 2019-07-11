<template>
<div>
  <van-tabbar route>
    <van-tabbar-item
      icon="comment-o"
      to="/message"
      name="message"
    >
      消息
    </van-tabbar-item>
    <van-tabbar-item
      icon="friends-o"
      to="/friend"
    >
      好友
    </van-tabbar-item>
    <van-tabbar-item
      icon="user-o"
      to="/my"
    >
      我的
    </van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'Tabbar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}
</script>

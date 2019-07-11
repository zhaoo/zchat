<template>
  <van-nav-bar
    :title="title"
    :left-text="leftText"
    :left-arrow="leftArrow"
    @click-left="goBack"
  />
</template>

<script>
import { NavBar } from 'vant'
export default {
	name: 'NavBar',
	components: {
		[NavBar.name]: NavBar,
	},
	props: {
		title: {
			type: String,
			default: '标题'
		},
		leftText: {
			type: String,
			default: ''
		},
		leftArrow: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		goBack() {
			this.$router.go(-1)
		}
	}
}
</script>

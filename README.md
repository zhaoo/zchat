# zchat

**zchat**是一款即时通讯`App(H5)`，基于`Vue`和`Express`开发，采用`HBuilderX`进行打包。

[![Version](https://img.shields.io/badge/Release-0.1.1-green.svg)](https://github.com/izhaoo/zchat)
[![License](https://img.shields.io/badge/License-MIT-red.svg)](https://mit-license.org/)

[下载](https://github.com/izhaoo/zchat/releases)

### 介绍

本项目为作者大二前端课程设计项目，开发本项目的初衷纯粹是想学习一下`Socket.io`,没想到还挺简单，就一口气完成了外围功能，诞生了本玩具项目。结果……分数并不高，和其他同学在网上扒的jQuery项目分数差不多，呜呜呜。

### 预览

![1](https://pic.izhaoo.com/20190711212545.jpg)
![2](https://pic.izhaoo.com/20190711212544.jpg)
![3](https://pic.izhaoo.com/20190711212546.jpg)
![4](https://pic.izhaoo.com/20190711212549.jpg)

### 安装

##### 开箱即食

下载`App`安装即可使用。

##### 开发环境

**环境：**

请安装以下开发环境：node, npm, MongoDB

**前端：**

npm i    // 安装相关依赖

npm i node-sass    // 安装 scss 依赖

npm run serve    // 运行

**后端：**

npm i nodemon -g    // 全局安装 nodemon 工具

npm i    // 安装相关依赖

npm run start    // 运行

## 生产环境

**环境：**

请部署以下生产环境：pm2, node, npm, ngnix, MongoDB, HBuilderX

**前端：**

npm i    // 安装相关依赖

npm i node-sass    // 安装 scss 依赖

npm run build    // Vue 打包

打开`HBuilderX`，新建项目，选择`5+App`模式。将`dist`目录下打包好的所有文件复制到`HBuilderX`生成的项目目录中。编辑`manifest.json`文件，对`App`进行基本配置，选择`发行->云端打包`，对App进行打包。

**后端：**

将文件上传至服务器，安装相关依赖，配置`pm2`并运行，通过`Nginx`进行转发即可，具体不赘述。

### 更新

##### v0.1.0 (190711)

初次发布，包含以下功能:

好友聊天、AI机器人、天气助手、快递助手、历史记录、内容收藏、模糊搜索、用户资料……

##### v0.1.1 (190721)

部分页面加入`骨架屏`，优化用户体验。

聊天内容加入`AES加密`，保证通信安全。

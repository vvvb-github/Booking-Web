# 软件工程前端

### github仓库地址
- [https://github.com/vvvb-github/Booking-Web](https://github.com/vvvb-github/Booking-Web)

### 快速上手
- 克隆项目`git clone https://github.com/vvvb-github/Booking-Web`
- 安装依赖`npm install`
- 首次使用Node安装依赖时较慢，请耐心等待控制台安装完毕；若实在太慢，请切换淘宝镜像[cnpm](https://www.cnblogs.com/liaojie970/p/9296177.html) ，或科学上网

### 开发配置
- [Node.js](https://nodejs.org/en/download/) npm包管理器

### 参考资料
- [Vue](https://cn.vuejs.org/v2/guide/) 官网教程
- [Vuex](https://vuex.vuejs.org/zh/) Vue全局响应式管理
- [element-ui](https://element.eleme.cn/#/zh-CN) 前端控件库，风格参考东南学工家
- [flex布局](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool) 简洁明了的博客教程

### 注意事项
- 每次编写代码前，请及时进行进行Pull操作；每次编写代码完毕后，也请及时进行进行Push操作，确保项目及时更新
- 每次对代码进行修改更新时，请以天为单位在README的日志部分记录，便于项目的维护

### 日志记录
- **2020.11.6** 创建项目
- **2020.12.2** 主页布局设计，并添加全局色卡对象，对于色卡的使用参考如下代码
```vue
<... :style="this.colorCard.color1" ...><!-- 层级1颜色 -->
<... :style="this.colorCard.color2" ...><!-- 层级2颜色 -->
<... :style="this.colorCard.color3" ...><!-- 层级3颜色 -->
<... :style="this.colorCard.color4" ...><!-- 层级4颜色 -->
<... :style="this.colorCard.color5" ...><!-- 层级5颜色 -->
<... :style="this.colorCard.textColor" ...><!-- 字体高亮颜色 -->
```
- **2020.12.3** 登录与注册页面完成，并对主页布局进行微调。注册页面用到了验证码插件，请安装如下依赖：
```shell script
yarn add vue-puzzle-vcode
```
也可以重新PULL项目后执行
```shell script
yarn install
```
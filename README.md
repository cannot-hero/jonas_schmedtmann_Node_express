# Node_express

## 项目介绍

🚝 旅游订票购买点评社区

🚩 基于 Node.js，采用 MVC 架构，SSR 的全栈项目

📦 Express + 🥭 MongoDB Atlas(Mongoose)+ 🐶 Pug

🌟 值得关注的信息：json-web-token, bcrypt, axios, 💰alipay, 🌍 高德地图 API,Multer...

## 目前实现的功能

1. 用户注册/登陆/退出登陆/注销账号/更新密码/更新邮箱或用户名/授权管理
2. 根据用户身份（user/admin）/状态（logged in or not）条件渲染前端页面
3. 全局错误处理，生产/开发环境不同的错误信息处理
4. 可以根据演出名过滤出相关旅游信息
5. alipay 沙箱环境购票
6. 忘记密码用户通过邮箱验证重置密码（nodemailer)
7. 管理员发布旅游信息（包括上传演出照片）
8. 用户对旅游项目发表评论，星级评价
9. 统计计算星级评价均分
10. 管理员管理用户和演出信息

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run start
```

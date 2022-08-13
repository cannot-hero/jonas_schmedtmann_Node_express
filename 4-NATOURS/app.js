/* eslint-disable no-console */
/* eslint-disable import/newline-after-import */
const express = require('express')
const morgan = require('morgan')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const app = express()
// console.log(process.env.NODE_ENV)
// middleware  中间件可以修改传入的请求数据 request data
// in the middle of request and response
// 1. MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json()) // 可以获取请求体
// 静态文件托管  托管public下的文件
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    // console.log(req.headers)
    next()
})

// 2. ROUTE handlers

// v1 指定api版本
// app.get('/api/v1/tours', getAllTours)
// '/api/v1/tours/:id' url中对应内容赋值给:id
// 路徑中一定要有對應參數，不然會報錯
// '/api/v1/tours/:id/:y?' 加一個問號，讓參數變爲可選參數
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour)
// patch
// app.patch('/api/v1/tours/:id', updateTour)
//delete
// app.delete('/api/v1/tours/:id', deleteTour)

// 3. ROUTE

// mounting the router
// tourRoute only runs on '/api/v1/tours'
app.use('/api/v1/tours', tourRouter) // 在‘/api/v1/tours’route上使用tourRouter
app.use('/api/v1/users', userRouter) // 在‘/api/v1/tours’route上使用tourRouter
// 上面两个路由都没匹配到的话 就到下面这个路由
// .all could run all the verbs in HTTP methods
app.all('*', (req, res, next) => {
    // const err = new Error(`Can't find ${req.originalUrl} on this server !`)
    // err.status = 'fail'
    // err.statusCode = 404
    // 传递东西给next 他会假设是一个错误，会跳过中间件所有的其他中间件堆栈
    // 并发送我们传入的错误到全局错误处理中间件
    next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404))
})

app.use(globalErrorHandler)
// 4. START SERVER
module.exports = app

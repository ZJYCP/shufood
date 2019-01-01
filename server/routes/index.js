/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: ''   // 定义所有路由的前缀都已 /weapp 开头
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口 /weapp/login
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态） /weapp/user
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中 /weapp/upload
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的 /weapp/tunnel
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

// 首页热门菜品
router.get('/dish/getdish_byhot', controllers.dish.getdish_byhot)

router.get('/dish/getdish_bysearch', controllers.dish.getdish_bysearch)

router.get('/dish/getdish_byid',controllers.dish.getdish_byid)

router.get('/dish/getdish_byplace',controllers.dish.getdish_byplace)

router.get('/dish/gettipkey',controllers.dish.gettipkey)

router.get('/comment/getcomment',controllers.comment.getcomment)

router.get('/comment/addcomment',controllers.comment.addcomment)

router.get('/search',controllers.search.index)

router.get('/search/recordsearch',controllers.search.recordsearch)

router.get('/article/getlist',controllers.article.getlist)

router.get('/article/getdetail',controllers.article.getdetail)

router.get('/job/islove',controllers.job.islove)
router.get('/job/love',controllers.job.love)
router.get('/job/collect',controllers.job.collect)
router.get('/job/iscollect',controllers.job.iscollect)

router.get('/job/getdish_bylove',controllers.dish.getdish_bylove)
router.get('/job/getmycomment',controllers.comment.getmycomment)


module.exports = router

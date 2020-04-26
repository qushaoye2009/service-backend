var router = require('koa-router')()
const time = new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日' + new Date().getHours() + '时' + new Date().getMinutes() + '分' + new Date().getSeconds() + '秒'
const content = `<h2 class="request_content" style="text-align: center;">接口控制中心!</h2><p class="request_time" style="text-align: center;">请求时间:  ${time}</p>`
router.get('/', async (ctx, next) => {
    ctx.body = content
})
router.post('/', async (ctx, next) => {
    ctx.body = content
})
module.exports = router

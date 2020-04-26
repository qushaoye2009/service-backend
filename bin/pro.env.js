const Koa = require('koa')
const path = require('path')
const config = require('../config/config.pro')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const staticCache = require('koa-static-cache')
const koaBody = require('koa-body')
const compress = require('koa-compress')
const logger = require('koa-logger')
const cors = require('koa-cors')
const router = require('koa-router')
var route = new router()
const app = new Koa()
process.env.NODE_ENV = 'production'
const sessionMysqlConfig = {
    user: config.database.USER,
    password: config.database.PASSWORD,
    host: config.database.HOST,
    database: config.database.DATABASE
}
app.use(logger())
app.use(cors())
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
}))
app.use(staticCache(path.join(__dirname, '../public'), {dynamic: true}, {
    maxAge: 365 * 24 * 60 * 60
}))

app.use(compress({threshold: 2048}))
const routerMap = require('../service/routers-index.js')
for (const t in routerMap) {
    app.use(routerMap[t]).use(route.allowedMethods())
}
app.use(koaBody({multipart: true, formidable: {uploadDir: path.join(__dirname, '../public/images')}}));
app.listen(config.port)
console.log('┌' + '─'.repeat(118) + '┐')
console.log('│' + ' listen in port : ' + config.port + ' '.repeat(118 - 'listen in port'.length - 8) + '│')
console.log('├' + '─'.repeat(118) + '┤')
console.log('│' + ' start production mode : ' + process.env.NODE_ENV + ' '.repeat(118 - 'start production mode'.length - 14) + '│')
console.log('└' + '─'.repeat(118) + '┘')

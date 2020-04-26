let jwt = require('jsonwebtoken')
let config = require('../config/connect_db.js')

module.exports = {
    checkLogin: ctx => {
        if (!ctx.session || !ctx.session.User_ID) {
            ctx.body = {
                flag: -1,
                data: null,
                message: '未登录'
            }
        }
    },
    checkToken: async ctx => {
        let token = ctx.header.authtoken
        return new Promise((reslove, reject) => {
            jwt.verify(token, config.jwt_secret, (err, decoded) => {
                if (err) {
                    if (err.message == 'jwt expired') {
                        reject({
                            flag: -401,
                            message: '用户权限过期'
                        })
                    } else {
                        reject({
                            flag: -402,
                            message: '无效的用户权限，请重新登录'
                        })
                    }
                } else {
                    if (decoded.User_ID) {
                        reslove({
                            flag: 0,
                            data: decoded,
                            message: '验证成功'
                        })
                    } else {
                        reject({
                            flag: -403,
                            message: '用户身份不一致'
                        })
                    }
                }
            })
        })
    }
}

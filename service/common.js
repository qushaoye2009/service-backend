let router = require('koa-router')()
let apiModel = require('../lib/common.js')
let koaBody = require('koa-body')
let jwt = require('jsonwebtoken');
let config = require('../config/connect_db.js')


// 登录
router.post('/common/login', koaBody(), async (ctx, next) => {
    var data = ctx.request.body
    data = typeof data == 'string' ? JSON.parse(data) : data
    var loginName = data.loginName
    var loginPasswd = data.loginPasswd;
    if(!loginName) {
        ctx.body = {
            flag: -9999,
            data: null,
            message: '登录账号不能为空'
        }
        return false
    }
    if(!loginPasswd) {
        ctx.body = {
            flag: -9999,
            data: null,
            message: '登录密码不能为空'
        }
        return false
    }
    await apiModel.Common.Login(data)
        .then(async res => {
            if (res.length) {
                // 写入服务器token session 信息
                let token = jwt.sign({
                    User_ID: res[0].User_ID
                }, config.jwt_secret , {
                    expiresIn: '7 days'
                })
                // 构造返回值
                const retVal = {}
                retVal.data = res[0]
                retVal.token = token
                ctx.body = {
                    flag: 0,
                    data: retVal,
                    message: '登录成功'
                }
                await Promise.all([
                    apiModel.Common.UpdateLoginUserInfo({
                        Login_IP: ctx.ip,
                        User_ID: res[0].User_ID,
                        Token: token
                    }),
                    apiModel.Common.InsertLoginUserLog({
                        User_ID: res[0].User_ID,
                        Type: 1,
                        Description: '登录成功',
                        Create_IP: ctx.ip
                    })
                ])
            } else {
                ctx.body = {
                    flag: -9999,
                    data: null,
                    message: '用户名或密码错误'
                }
            }
        }).catch((res) => {
            ctx.body = {
                flag: -9999,
                data: null,
                message: '用户名或密码错误'
            }
        })
})
router.post('/common/update-passwd', koaBody(), async (ctx, next) => {
    const data = ctx.request.body
    if(!data.password) {
        ctx.body = {
            flag: -9999,
            data: null,
            message: '原密码不能为空'
        }
        return false
    }
    if(!data.password2) {
        ctx.body = {
            flag: -9999,
            data: null,
            message: '新密码不能为空'
        }
        return false
    }
    const oldpassword = await apiModel.Common.GetPasswd(data)
    if(oldpassword.length) {
        if (data.password !== oldpassword[0].password) {
            ctx.body = {
                flag: -9999,
                data: null,
                message: '原密码不正确'
            }
            return false
        }
    } else {
        ctx.body = {
            flag: -9999,
            data: null,
            message: '没有该用户!'
        }
        return false
    }
    await apiModel.Common.UpdatePasswd(data)
        .then(res => {
            ctx.body = {
                flag: 0,
                data: null,
                message: '修改成功'
            }
        }).catch((res) => {
            ctx.body = {
                flag: -9999,
                data: null,
                message: '修改失败'
            }
        })
})
// 获取用户信息
router.post('/common/userinfo', koaBody(), async (ctx, next) => {
    let data = ctx.request.body
    data = typeof data == 'string' ? JSON.parse(data) : data
    data = Object.assign({
        Mobile: null,
        User_ID: null
    }, data)
    let User_ID = data.User_ID
    let token = jwt.sign({
        userName: User_ID
    }, config.jwt_secret , {
        expiresIn: '7 days'
    });
    await apiModel.Common.UserInfo(data)
        .then(res => {
            if (res.length) {
                ctx.body = {
                    flag: 0,
                    data: res,
                    message: '获取用户信息成功'
                }
            } else {
                ctx.body = {
                    flag: -9999,
                    data: null,
                    message: '获取用户信息失败'
                }
            }
        }).catch(() => {
            ctx.body = {
                flag: -9999,
                data: null,
                message: '获取用户信息失败'
            }
        })
})
// logout
router.get('/common/logout', koaBody(), async (ctx, next) => {
    ctx.session = null;
    ctx.body = {
        flag: 0,
        data: null,
        message: '退出成功'
    }
})
// 注册用户
router.post('/common/sign', koaBody(), async (ctx, next) => {
    let data = ctx.request.body
    data = typeof data == 'string' ? JSON.parse(data) : data
    data = Object.assign({
        Mobile: null,
        Account_Name: null,
        PassWord: null,
        Create_IP: null
    }, data)
    retVal = await apiModel.Common.UserInfo(data)
    if (retVal.length) {
        ctx.body = {
            flag: 0,
            data: null,
            message: '手机号已经被注册！'
        } 
        return false
    }

    await apiModel.Common.Sign(data)
        .then(res => {
            if (res) {
                ctx.body = {
                    flag: 0,
                    data: null,
                    message: '注册成功'
                }
            } else {
                ctx.body = {
                    flag: -9999,
                    message: '注册失败'
                }
            }
        }).catch(() => {
            ctx.body = {
                flag: -9999,
                message: '注册失败'
            }
        })
})

module.exports = router

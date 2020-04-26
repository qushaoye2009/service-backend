let router = require('koa-router')()
let apiModel = require('../../lib/dal.yuedu')
let koaBody = require('koa-body')

// 获取list
router.post('/yuedu/lists', koaBody(), async (ctx) => {
    let data = ctx.request.body
    await apiModel.YueDu.lists(data).then(async (res) => {
        let totalRecords = await apiModel.YueDu.totalRecords()
        ctx.body = {
            flag: 0,
            data: {
                aaData: res,
                iTotalRecords: totalRecords[0].iTotalRecords
            },
            message: '获取成功'
        }
    }).catch(err => {
        ctx.body = {
            flag: -9999,
            data: {
                aaData: [],
                iTotalRecords: 0
            },
            message: '获取失败'
        }
    })
})
// 获取list 包括内容
router.post('/yuedu/list-page', koaBody(), async (ctx) => {
    let data = ctx.request.body
    await apiModel.YueDu.listPage(data).then(async (res) => {
        let totalRecords = await apiModel.YueDu.totalRecords()
        ctx.body = {
            flag: 0,
            data: {
                aaData: res,
                iTotalRecords: totalRecords[0].iTotalRecords
            },
            message: '获取成功'
        }
    }).catch(err => {
        ctx.body = {
            flag: -9999,
            data: {
                aaData: [],
                iTotalRecords: 0
            },
            message: '获取失败'
        }
    })
})
// 热门文章
router.get('/yuedu/hot-page', koaBody(), async (ctx) => {
    await apiModel.YueDu.hotPage().then(async (res) => {
        let totalRecords = await apiModel.YueDu.totalRecords()
        ctx.body = {
            flag: 0,
            data: {
                aaData: res,
                iTotalRecords: totalRecords[0].iTotalRecords
            },
            message: '获取成功'
        }
    }).catch(err => {
        ctx.body = {
            flag: -9999,
            data: {
                aaData: []
            },
            message: '获取失败'
        }
    })
})
// 获取detail
router.post('/yuedu/detail-page', koaBody(), async (ctx) => {
    let data = ctx.request.body
    if(!data.id){
        ctx.body = {
            flag: -9999,
            data: null,
            message: '文章ID不能为空'
        }
        return false
    }
    await apiModel.YueDu.detailPage(data).then(async (res) => {
        ctx.body = {
            flag: 0,
            data: {
                aaData: res[0]
            },
            message: '获取成功'
        }
    }).catch(err => {
        ctx.body = {
            flag: -9999,
            data: {
                aaData: [],
                iTotalRecords: 0
            },
            message: '获取失败'
        }
    })
})
// 查询分类
router.get('/yuedu/all-category', koaBody(), async (ctx) => {
    await apiModel.YueDu.allCategory().then(async (res) => {
        let retVal = []
        for (let item of res) {
            if(item.parent_id === 0){
                retVal.push({
                    "id": item.id,
                    "label": item.label,
                    "value": item.value,
                    "children": []
                })
            } else {
                for (let sub of retVal){
                    if(sub.id === item.parent_id){
                        sub.children.push({
                            "id": item.id,
                            "label": item.label,
                            "value": item.value,
                        })
                    }
                }
            }
        }
        ctx.body = {
            flag: 0,
            data: {
                aaData: retVal
            },
            message: '获取成功'
        }
    }).catch(err => {
        ctx.body = {
            flag: -9999,
            data: {
                aaData: [],
                iTotalRecords: 0
            },
            message: '获取失败'
        }
    })
})
// 插入分类
router.post('/yuedu/insert-category', koaBody(), async (ctx) => {
    let req = ctx.request.body
    if (!req) {
        ctx.body = {
            flag: 0,
            data: {
                aaData: [],
                message: '参数错误'
            }
        }
    }
    await apiModel.YueDu.insertCategory(req)
        .then(async (res) => {
            ctx.body = {
                flag: 0,
                data: {
                    aaData: [],
                    message: '添加成功'
                }
            }
        }).catch(err => {
            ctx.body = {
                flag: -9999,
                data: {
                    aaData: [],
                    message: '操作失败'
                }
            }
        })
})
// 插入文章
router.post('/yuedu/insert-page', koaBody(), async (ctx) => {
    let req = ctx.request.body
    if (!req) {
        ctx.body = {
            flag: 0,
            data: {
                aaData: [],
                message: '参数错误'
            }
        }
    }
    if (!req.title) {
        ctx.body = {
            flag: 0,
            data: {
                aaData: [],
                message: '缺少标题!'
            }
        }
        return
    }
    await apiModel.YueDu.insertPage(req)
        .then(async (res) => {
            ctx.body = {
                flag: 0,
                data: {
                    aaData: [],
                    message: '添加成功'
                }
            }
        }).catch(err => {
            ctx.body = {
                flag: -9999,
                data: {
                    aaData: [],
                    message: '操作失败'
                }
            }
        })
})
// 设置likes
router.post('/yuedu/art-likes', koaBody(), async (ctx) => {
    let req = ctx.request.body
    await apiModel.YueDu.artLikes(req)
        .then(async (res) => {
            ctx.body = {
                flag: 0,
                data: {
                    aaData: [],
                    message: '操作成功'
                }
            }
        }).catch(err=>{
            ctx.body = {
                flag: -9999,
                data: {
                    aaData: [],
                    message: '操作失败'
                }
            }
        })
})
// 查询 app
router.get('/yuedu/list-apps', koaBody(), async (ctx) => {
    let data = ctx.query
    await apiModel.YueDu.listApps(data).then(async (res) => {
        ctx.body = {
            flag: 0,
            data: {
                aaData: res
            },
            message: '获取成功'
        }
    }).catch(err => {
        ctx.body = {
            flag: -9999,
            data: {
                aaData: null
            },
            message: '获取失败'
        }
    })
})
// 设置app
router.post('/yuedu/set-apps', koaBody(), async (ctx) => {
    let req = ctx.request.body
    if (!req) {
        ctx.body = {
            flag: 0,
            data: {
                aaData: null,
                message: '参数错误'
            }
        }
    }
    await apiModel.YueDu.setApps(req)
        .then(async (res) => {
            ctx.body = {
                flag: 0,
                data: {
                    aaData: null,
                    message: '设置成功'
                }
            }
        }).catch(err => {
            ctx.body = {
                flag: -9999,
                data: {
                    aaData: null,
                    message: '操作失败'
                }
            }
        })
})
module.exports = router

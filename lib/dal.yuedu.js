const configInfo = require('../config/connect_db')
const query = configInfo.query
/**
 * 2019年01月17日
 * YueDu
 */
let YueDu = {
    data: {
        table: 'yuedu',
        sql: null
    },
    // 分页数据查找
    totalRecords: () => {
        let sql = `select count(*) as iTotalRecords from ${YueDu.data.table} where 1 = 1` + YueDu.data.sql
        return query(sql)
    },
    insertPage: (params) => {
        var _sql = `insert into yuedu set class='${params.class}',category='${params.category}',sortID='${params.sortID}',title='${params.title}',content='${params.content}',post_time='${params.post_time}';`
        return query(_sql)
    },
    listPage: (params) => {
        const defaultParams = {}
        defaultParams.pageNo = 1
        defaultParams.pageSize = 10
        params = Object.assign(defaultParams, params)
        let _sql = `select id,title,content,likes,post_time from yuedu where 1 = 1`
        let _ct = ``
        YueDu.data.table = 'yuedu'
        if (params.class) {
            _ct += ` and class = '${params.class}' `
        }
        if (params.category) {
            _ct += ` and category = '${params.category}' `
        }
        if (params.searchKey) {
            _ct += ` and title like '%${params.searchKey}%' `
        }
        YueDu.data.sql = _ct
        if (params.sortKey) {
            _ct += ` ORDER BY ${params.sortKey} ${params.sortOrder}`
        } else {
            _ct += ` ORDER BY create_time DESC, id DESC`
        }
        _ct += ` limit ${(params.pageNo - 1) * params.pageSize}, ${params.pageSize}`
        _sql = _sql + _ct
        sql = `select count(*) as iTotalRecords from yuedu where 1 = 1` + YueDu.data.sql
        return query(_sql)
    },
    lists: (params) => {
        const defaultParams = {}
        defaultParams.pageNo = 1
        defaultParams.pageSize = 10
        params = Object.assign(defaultParams, params)
        let _sql = `select id,title,likes,post_time from yuedu where 1 = 1`
        let _ct = ``
        YueDu.data.table = 'yuedu'
        if (params.class) {
            _ct += ` and class = '${params.class}' `
        }
        if (params.category) {
            _ct += ` and category = '${params.category}' `
        }
        if (params.searchKey) {
            _ct += ` and title like '%${params.searchKey}%' `
        }
        YueDu.data.sql = _ct
        if (params.sortKey) {
            _ct += ` ORDER BY ${params.sortKey} ${params.sortOrder}`
        } else {
            _ct += ` ORDER BY create_time DESC, id DESC`
        }
        _ct += ` limit ${(params.pageNo - 1) * params.pageSize}, ${params.pageSize}`
        _sql = _sql + _ct
        sql = `select count(*) as iTotalRecords from yuedu where 1 = 1` + YueDu.data.sql
        return query(_sql)
    },
    hotPage: () => {
        const params = {}
        params.pageNo = 1
        params.pageSize = 10
        let _sql = `select id,title,likes,post_time from yuedu where 1 = 1`
        let _ct = ` and class = 1 and likes = 0`
        YueDu.data.sql = _ct
        _ct += ` ORDER BY create_time DESC, id DESC limit ${(params.pageNo - 1) * params.pageSize}, ${params.pageSize}`
        _sql = _sql + _ct
        sql = `select count(*) as iTotalRecords from yuedu where 1 = 1` + YueDu.data.sql
        return query(_sql)
    },
    detailPage: (params) => {
        let _sql
        if(params.bookid) {
            _sql = `select id,title,content,description,likes,post_time from yuedu where id = ${params.id} and bookid = ${params.bookid}`
        } else {
            _sql = `select id,title,content,description,likes,post_time from yuedu where id = ${params.id}`
        }
        return query(_sql)
    },
    allCategory: () => {
        let _sql = `select id,label,value,parent_id from yuedu_category`
        return query(_sql)
    },
    insertCategory: (params) => {
        var _sql = `insert into yuedu_category set parent_id='${params.parent_id}',label='${params.label}',value='${params.value}',category='${params.category}',remark='${params.remark}'`
        return query(_sql)
    },
    listApps: (data) => {
        let ctx = ''
        if(!data.status && data.status !== 0) {
            ctx = `where status in(0,1)`
        } else {
            ctx = `where status = ${data.status}`
        }
        let _sql = `select app_id,app_name ,app_icon ,to_name , status from yuedu_apps ` + ctx
        return query(_sql)
    },
    setApps: (params) => {
        let _cx = ''
        let  app_ids = ''
        for (let item of params) {
            _cx += ` when ${item.app_id} then ${item.status}`
            app_ids =  app_ids + ',' + item.app_id
        }
        app_ids = app_ids.substr(1)
        _cx + ` end where app_id in(${app_ids})`
        let _sql = `update yuedu_apps set status = case app_id` + _cx
        _sql += ` end where app_id in (${app_ids})`
        return query(_sql)
    },
    artLikes: (params) => {
        let _sql = `update yuedu set likes =  ${params.likes} where id = ${params.id}`
        return query(_sql)
    }
}
module.exports = {
    YueDu
}

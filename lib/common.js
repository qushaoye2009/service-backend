const moment = require('moment')
const configInfo = require('../config/connect_db')
const query = configInfo.query
/**
 * 公共方法
 */
let Common = {
    Login: params => {
        let _sql = `select RealName, User_ID ,Mobile,Login_Last_Date, User_Avator from user_info where (Mobile = '${params.loginName}' or accountName = '${params.loginName}' ) and Login_Password = '${params.loginPasswd}'`
        _sql += ' limit 1'
        return query(_sql)
    },
    UpdatePasswd: params => {
        let _sql = `update user_info set Login_Password='${params.password2}' where User_ID ='${params.User_ID}'`
        return query(_sql)
    },
    GetPasswd: params => {
        let _sql = `select Login_Password as password from user_info where User_ID ='${params.User_ID}'`
        return query(_sql)
    },
    UserInfo: params => {
        let _sql = `select RealName, User_ID ,Mobile ,Access_Group from user_info `
        if (params.User_ID) {
            _sql += ` where User_ID = '${params.User_ID}'`
        } else if (params.Mobile) {
            _sql += ` where Mobile = '${params.Mobile}'`
        }
        return query(_sql)
    },
    UpdateLoginUserInfo: params => {
        const Login_This_Date = moment().format('YYYY-MM-DD HH:mm:ss')
        let _sql = `update user_info set Token = '${params.Token}', Login_Count = Login_Count + 1, 
        Login_Last_Date = Login_This_Date,
        Login_Last_IP = Login_This_IP,
        Login_This_Date = '${Login_This_Date}',
        Login_This_IP = '${params.Login_IP}' where User_ID = '${params.User_ID}'`
        return query(_sql)
    },
    InsertLoginUserLog: params => {
        const Create_Time = moment().format('YYYY-MM-DD HH:mm:ss')
        let _sql = `insert into user_log set Type= ${params.Type}, User_ID = '${params.User_ID}', Description = '${params.Description}', Create_Time = '${Create_Time}', Create_IP = '${params.Create_IP}'`
        return query(_sql)
    },
    Sign: params => {
        let _sql = `insert into user_info set Mobile='${params.Mobile}',AccountName='${params.Account_Name}',Login_Password='${params.PassWord}',Create_IP='${params.Create_IP}'`
        return query(_sql)
    }
}
module.exports = {
    Common
}

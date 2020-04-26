const main = require('./main.js').routes()
const common = require('./common.js').routes()
const yueduIndex = require('./app/interface.yuedu').routes()
const routerMain = {
    main, common, yueduIndex
}
module.exports = routerMain

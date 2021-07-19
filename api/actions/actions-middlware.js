// add middlewares here related to actions
const checkID = (req, res, next) => {
    console.log('checkId in actions router is working')
    next()
}

module.exports = {
    checkID
}
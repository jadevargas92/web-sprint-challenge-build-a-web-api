// add middlewares here related to projects

const checkID = (req, res, next) => {
    console.log('checkId in projects router is working')
    next()
}

module.exports = {
    checkID
}

const getMe = (req,res) => {
    const data = req.data
    res.send({
        message: 'Already Login',
        data
    })
}
module.exports = getMe
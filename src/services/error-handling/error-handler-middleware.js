module.exports = (error, req, res, next) => {
    if (error.errors) {
        return res.status(400).json({
            error: {
                name: error.name,
                errors: error.errors
            },
            message: error.message
        })
    }
    next(error)
}

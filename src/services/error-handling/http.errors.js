class HttpError extends Error {
    constructor (message, status) {
        super()
        this.message = message
        this.status = status
    }
    toJSON () {
        return {
            status: this.status,
            message: this.message
        }
    }
}

const createError = (error) => {
    let errorMessage = error.message || 'Uncaught exception'
    let status = error.status || 500
    if (error.message && error.message.includes('duplicate')) {
        console.log(error.message)
        errorMessage = 'Email is already used'
        status = 400
    }
    return new HttpError(errorMessage, status)
}

module.exports.createError = createError
module.exports.HttpError = HttpError

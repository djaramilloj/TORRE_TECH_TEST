const errorMessage = (message) => {
    const error = {
        error: true,
        message: message
    }
    return error;
}

module.exports = {
    errorMessage
}


module.exports = (res, code, message, content = "") => {
    res.status(code).json({
        code: code,
        message: message, 
        content: (content === "") ? "No content" : content
    })
}
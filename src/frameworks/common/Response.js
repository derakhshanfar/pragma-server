module.exports.ResponseSuccess = class ResponseSuccess {
  constructor({ statusCode = '', body = null, headers = null }) {
    this.statusCode = statusCode || 200
    this.body = body
    this.headers = headers
  }
}

module.exports.ResponseError = class ResponseError {
  constructor({
    statusCode = '',
    body = null,
    headers = null,
    validationErrors = [],
    msg = '',
  }) {
    this.statusCode = statusCode || 401
    this.body = body
    this.headers = headers
    this.validationErrors = validationErrors
    this.msg = msg
  }
}

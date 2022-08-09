const { ResponseSuccess, ResponseError } = require('../../frameworks/common')
// TODO Add a factory pattern for creating controller like `userCaseFactory.js`
module.exports = (dependencies) => {
  const {
    useCases: {
      beer: { getBeersUseCase },
    },
  } = dependencies

  return async (req) => {
    try {
      const { id } = req.pathParams
      const response = await getBeersUseCase(dependencies).execute({
        id,
      })
      return new ResponseSuccess({
        body: response,
      })
    } catch (err) {
      // TODO log this error somewhere
      console.log(err)
      return new ResponseError({
        msg: err.message || 'Error while getting data',
      })
    }
  }
}

const useCaseFactory = require('../../helpers/useCaseFactory')
const { calculateStatus } = require('./calculateStatus')

module.exports = useCaseFactory(
  [
    {
      repo: 'beerRepository',
      actions: ['getById', 'getBeers'],
    },
  ],
  async ({ getById, getBeers }) => {
    const beers = getBeers()

    const promises = beers.map((row) => getById(row.id))

    const result = await Promise.allSettled(promises)

    return result.map((row, index) => {
      const temperature = row?.value?.temperature
      const { id, name } = beers[index]
      return {
        id,
        name,
        temperature,
        status:
          !isNaN(temperature) && row.status === 'fulfilled'
            ? calculateStatus(temperature, beers[index])
            : 'not_available',
      }
    })
  }
)

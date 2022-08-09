jest.mock('node-fetch', () => jest.fn())

const beerRepo = require('./beerRepository')
const fetch = require('node-fetch')

const data = {
  name: 'test',
}

const id = 'myId'

const mock = jest.fn(() => {
  return Promise.resolve({
    ok: true,
    status: 'ok',
    json: () => {
      return data
    },
  })
})

fetch.mockImplementation(mock)

describe('Beer Repo', () => {
  it('should resolve a promise with correct data', async () => {
    const result = await beerRepo.getById(id)
    expect(result).toBe(data)
  })

  it('should rejects if id is not forwarded to data-service', async () => {
    await beerRepo.getById(id)
    expect(mock).toHaveBeenCalledWith(
      `https://temperature-sensor-service.herokuapp.com/sensor/${id}`
    )
  })
})

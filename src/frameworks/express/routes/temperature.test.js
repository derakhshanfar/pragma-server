const request = require('supertest')

const data = [
  {
    id: '1',
    name: 'Pilsner',
    status: 'normal',
    temperature: '5',
  },
]

const mockTargetController = jest.fn(() => {
  return Promise.resolve({
    statusCode: 200,
    body: data,
  })
})

jest.mock(
  '../../../controllers/beer/getBeersController',
  () => () => mockTargetController
)

const app = require('../../../app')
const expressApp = app.initial()

describe('temperature route', () => {
  test('It should call getBeersController with correct args ', async () => {
    const res = await request(expressApp).get('/api/v1/beers')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(data)
    expect(mockTargetController).toHaveBeenCalledWith({
      body: {},
      method: 'GET',
      path: '/',
      pathParams: {},
      queryParams: {},
    })
  })
})

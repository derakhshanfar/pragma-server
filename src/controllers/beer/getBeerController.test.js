const getBeersController = require('./getBeersController')

const fakeData = [
  {
    id: '1',
    name: 'Pilsner',
    status: 'normal',
    temperature: 5,
  },
]

const mock = jest.fn(() => Promise.resolve(fakeData))

const dependencies = {
  useCases: {
    beer: {
      getBeersUseCase: () => {
        return {
          execute: mock,
        }
      },
    },
  },
}

describe('getBeersController', () => {
  it('should yield success response', async () => {
    const handler = getBeersController(dependencies)
    const data = await handler({
      pathParams: {
        id: 'test',
      },
    })
    expect(data.statusCode).toBe(200)
    expect(data.body).toBe(fakeData)
  })

  it('should yield 401 if there is an error', async () => {
    const errorMessage = 'something happened'
    mock.mockImplementation(() => Promise.reject({ message: errorMessage }))
    const handler = getBeersController(dependencies)
    const data = await handler({
      pathParams: {
        id: 'test',
      },
    })
    expect(data.statusCode).toBe(401)
    expect(data.msg).toBe(errorMessage)
  })
})

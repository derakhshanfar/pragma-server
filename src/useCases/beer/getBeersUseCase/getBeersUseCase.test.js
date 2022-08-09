const getBeersUseCase = require('./getBeersUseCase')

describe('beer useCase', () => {
  it('should get the data if api is available', async () => {
    const fakeData = { temperature: '5' }
    const mock = jest.fn(() => Promise.resolve(fakeData))

    const data = [
      {
        id: '1',
        name: 'Pilsner',
        minimumTemperature: 4,
        maximumTemperature: 6,
      },
    ]

    const dependencies = {
      beerRepository: {
        getById: mock,
        getBeers: () => data,
      },
    }

    const result = await getBeersUseCase(dependencies).execute()
    expect(result[0]).toEqual({
      id: data[0].id,
      name: data[0].name,
      status: 'normal',
      temperature: fakeData.temperature,
    })
  })

  it('should yield not_available status if api is down', async () => {
    const mock = jest.fn(() => Promise.reject('error'))

    const data = [
      {
        id: '1',
        name: 'Pilsner',
        minimumTemperature: 4,
        maximumTemperature: 6,
      },
    ]

    const dependencies = {
      beerRepository: {
        getById: mock,
        getBeers: () => data,
      },
    }

    const result = await getBeersUseCase(dependencies).execute()

    expect(result[0]).toEqual({
      id: data[0].id,
      name: data[0].name,
      status: 'not_available',
    })
  })
})

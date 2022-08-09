const { calculateStatus } = require('./calculateStatus')

describe('beer calculateStatus', () => {
  it('should get invalid-value if the temp is not a valid number', () => {
    const status = calculateStatus('invalid', {
      minimumTemperature: 5,
      maximumTemperature: 5,
    })
    expect(status).toBe('invalid-value')
  })

  it('should get normal if the value is in the range', () => {
    const status = calculateStatus(5, {
      minimumTemperature: 5,
      maximumTemperature: 5,
    })
    expect(status).toBe('normal')
  })

  it('should get high if the value is over the range', () => {
    const status = calculateStatus(7, {
      minimumTemperature: 5,
      maximumTemperature: 5,
    })
    expect(status).toBe('high')
  })

  it('should get low if the value is under the range', () => {
    const status = calculateStatus(4, {
      minimumTemperature: 5,
      maximumTemperature: 5,
    })
    expect(status).toBe('low')
  })
})

const { get } = require('../common/fetchService')

module.exports = {
  getById: async (id) => {
    return get(`https://temperature-sensor-service.herokuapp.com/sensor/${id}`)
  },
  getBeers: () => {
    // TODO get from config
    return [
      {
        id: '1',
        name: 'Pilsner',
        minimumTemperature: 4,
        maximumTemperature: 6,
      },
      {
        id: '2',
        name: 'IPA',
        minimumTemperature: 5,
        maximumTemperature: 6,
      },
      {
        id: '3',
        name: 'Lager',
        minimumTemperature: 4,
        maximumTemperature: 7,
      },
      {
        id: '4',
        name: 'Stout',
        minimumTemperature: 6,
        maximumTemperature: 8,
      },
      {
        id: '5',
        name: 'Wheat beer',
        minimumTemperature: 3,
        maximumTemperature: 5,
      },
      {
        id: '6',
        name: 'Pale Ale',
        minimumTemperature: 4,
        maximumTemperature: 6,
      },
    ]
  },
}

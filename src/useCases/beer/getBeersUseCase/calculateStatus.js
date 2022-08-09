module.exports.calculateStatus = (
  temperature,
  { minimumTemperature, maximumTemperature } = {}
) => {
  // we can memoize this function in case of heavy calculation
  let temp = +temperature
  let min = +minimumTemperature
  let max = +maximumTemperature

  let status = 'low'

  if (
    typeof temp !== 'number' ||
    isNaN(temp) ||
    typeof min !== 'number' ||
    isNaN(min) ||
    typeof max !== 'number' ||
    isNaN(max)
  ) {
    status = 'invalid-value'
  } else if (temp >= min && temp <= max) {
    status = 'normal'
  } else if (temp > max) {
    status = 'high'
  }

  return status
}

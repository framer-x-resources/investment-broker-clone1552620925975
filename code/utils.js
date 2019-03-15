export const sleep = sec => {
  return new Promise(resolve => setTimeout(resolve, sec * 1000))
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}
export const getRandomNumber = (min, max) => {
  var highlightedNumber = Math.random() * (max - min) + min
  return highlightedNumber
}

export const commaPipe = number => {
  var newNumber = number.replace(/,/g, '')
  if (newNumber != null) return newNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

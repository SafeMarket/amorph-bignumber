const Nobject = require('nobject')
const nobject = new Nobject
const Bignumber = require('bignumber.js')

nobject.set(['bignumber', 'number'], (bignumber) => {
  return bignumber.toNumber()
})

nobject.set(['number', 'bignumber'], (number) => {
  return new Bignumber(number)
})

nobject.set(['bignumber', 'hex'], (bignumber) => {
  return bignumber.toString(16)
})

nobject.set(['hex', 'bignumber'], (hex) => {
  if (hex === '') {
    return new Bignumber(0)
  }
  return new Bignumber(hex, 16)
})

nobject.set(['hex.prefixed', 'bignumber'], (hexPrefixed) => {
  if (hexPrefixed === '0x') {
    return new Bignumber(0)
  }
  return new Bignumber(hexPrefixed)
})


module.exports = nobject

const Nobject = require('nobject')
const nobject = new Nobject
const Bignumber = require('bignumber.js')

function normalizeHex(hex) {
  return hex.length % 2 === 0 ? hex : hex.slice(0, -1) + '0' + hex.slice(-1)
}

nobject.set(['bignumber', 'number'], (bignumber) => {
  return bignumber.toNumber()
})

nobject.set(['number', 'bignumber'], (number) => {
  return new Bignumber(number)
})

nobject.set(['bignumber', 'number.string'], (bignumber) => {
  return bignumber.toString()
})

nobject.set(['number.string', 'bignumber'], (number) => {
  return new Bignumber(number)
})

nobject.set(['bignumber', 'hex'], (bignumber) => {
  if (bignumber.eq(0)) {
    return ''
  }
  return normalizeHex(bignumber.toString(16))
})

nobject.set(['hex', 'bignumber'], (hex) => {
  if (hex === '') {
    return new Bignumber(0)
  }
  return new Bignumber(normalizeHex(hex), 16)
})

nobject.set(['hex.prefixed', 'bignumber'], (hexPrefixed) => {
  if (hexPrefixed === '0x') {
    return new Bignumber(0)
  }
  return new Bignumber(hexPrefixed)
})


module.exports = {
  pluginVersion: 1,
  converters: nobject,
  equivalenceTests: {
    bignumber: (a, b) => {
      return a.equals(b)
    }
  }
}

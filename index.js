const AmorphConverter = require('amorph-converter')
const amorphHex = require('amorph-hex')
const Bignumber = require('bignumber.js')

module.exports = new AmorphConverter((uint8Array) => {
  if (uint8Array.length === 0) {
    return new Bignumber(0)
  }
  return new Bignumber(amorphHex.unprefixed.to(uint8Array), 16)
}, (bignumber) => {
  if (bignumber.eq(0)) {
    return new Uint8Array(0)
  }
  return amorphHex.unprefixed.from(normalizeHex(bignumber.toString(16)))
})

function normalizeHex(hex) {
  return hex.length % 2 === 0 ? hex : '0' + hex
}

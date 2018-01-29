const AmorphConverter = require('amorph-converter')
const amorphHex = require('amorph-hex')
const Bignumber = require('bignumber.js')
const defunction = require('defunction')
const getValidateInstanceOf = require('defunction/lib/validates/getInstanceOf')
const getValidateConstructorNamed = require('defunction/lib/validates/getConstructorNamed')
const getValidateAllOf = require('defunction/lib/validates/getAllOf')

const validateUint8Array = getValidateInstanceOf(Uint8Array)
const validateBignumber = getValidateConstructorNamed('BigNumber')
const validateInteger = (label, arg) => {
  if (!arg.mod(1).eq(0)) {
    throw new Error(`${label} should be an integer, received ${arg}`)
  }
}
const validateGteZero = (label, arg) => {
  if (arg.lt(0)) {
    throw new Error(`${label} should be greater than or equal to 0, received ${arg}`)
  }
}

module.exports.unsigned = new AmorphConverter((uint8Array) => {
  if (uint8Array.length === 0) {
    return new Bignumber(0)
  }
  return new Bignumber(amorphHex.unprefixed.to(uint8Array), 16)
}, defunction(
  [getValidateAllOf([validateBignumber, validateInteger, validateGteZero])],
  validateUint8Array,
  function from(bignumber) {
    if (bignumber.eq(0)) {
      return new Uint8Array(0)
    }
    return amorphHex.unprefixed.from(normalizeHex(bignumber.toString(16)))
  }
))

module.exports.signed = new AmorphConverter((uint8Array) => {
  if (uint8Array.length === 0) {
    return new Bignumber(0)
  }
  const sign = (uint8Array[0] === 0) ? -1 : 1
  const unsignedUint8Array = (sign === 1) ? uint8Array : uint8Array.slice(1)
  if (unsignedUint8Array.length === 0) {
    return new Bignumber(0)
  }
  return (new Bignumber(amorphHex.unprefixed.to(unsignedUint8Array), 16)).mul(sign)
}, defunction(
  [getValidateAllOf([validateBignumber, validateInteger])],
  validateUint8Array,
  function from(bignumber) {
    if (bignumber.eq(0)) {
      return new Uint8Array(0)
    }
    const bignumberAbs = bignumber.abs()
    const unsignedUint8Array = amorphHex.unprefixed.from(normalizeHex(bignumberAbs.toString(16)))
    if (bignumber.gt(0)) {
      return unsignedUint8Array
    }
    const signedUint8Array = new Uint8Array(unsignedUint8Array.length + 1)
    signedUint8Array[0] = 0
    signedUint8Array.set(unsignedUint8Array, 1)
    return signedUint8Array
  }
))


function normalizeHex(hex) {
  return hex.length % 2 === 0 ? hex : '0' + hex
}

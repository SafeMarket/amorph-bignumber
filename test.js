const converters = require('./')
const chai = require('chai')
const Bignumber = require('bignumber.js')

chai.should()

describe('converters', () => {

  describe('unsigned', () => {
    it('should .to [1, 1]', () => {
      converters.unsigned.to(new Uint8Array([1, 1])).toNumber().should.equal(257)
    })
    it('should .to []', () => {
      converters.unsigned.to(new Uint8Array(0)).toNumber().should.equal(0)
    })
    it('should .to [0]', () => {
      converters.unsigned.to(new Uint8Array([0])).toNumber().should.equal(0)
    })
    it('should .from 257', () => {
      converters.unsigned.from(new Bignumber(257)).should.deep.equal(new Uint8Array([1, 1]))
    })
    it('should .from 0', () => {
      converters.unsigned.from(new Bignumber(0)).should.deep.equal(new Uint8Array(0))
    })
    it('should throw error when .from non-integer', () => {
      let error
      try {
        converters.unsigned.from(new Bignumber(.5))
      } catch (_error) {
        error = _error
      }
      error.should.be.instanceof(Error)
      error.message.should.equal('AmorphConverter.prototype.from:arguments[0] should be an integer, received 0.5')
    })

    it('should throw error when .from negative', () => {
      let error
      try {
        converters.unsigned.from(new Bignumber(-1))
      } catch (_error) {
        error = _error
      }
      error.should.be.instanceof(Error)
      error.message.should.equal('AmorphConverter.prototype.from:arguments[0] should be greater than or equal to 0, received -1')
    })
  })

  describe('signed', () => {
    it('should .to [1, 1]', () => {
      converters.signed.to(new Uint8Array([1, 1])).toNumber().should.equal(257)
    })
    it('should .to []', () => {
      converters.signed.to(new Uint8Array(0)).toNumber().should.equal(0)
    })
    it('should .to [0]', () => {
      converters.signed.to(new Uint8Array([0])).toNumber().should.equal(0)
    })
    it('should .from 257', () => {
      converters.signed.from(new Bignumber(257)).should.deep.equal(new Uint8Array([1, 1]))
    })
    it('should .from 0', () => {
      converters.signed.from(new Bignumber(0)).should.deep.equal(new Uint8Array(0))
    })
    it('should .from -1', () => {
      converters.signed.from(new Bignumber(-1)).should.deep.equal(new Uint8Array([0, 1]))
    })
    it('should .from -257', () => {
      converters.signed.from(new Bignumber(-257)).should.deep.equal(new Uint8Array([0, 1, 1]))
    })
    it('should throw error when .from non-integer', () => {
      let error
      try {
        converters.signed.from(new Bignumber(.5))
      } catch (_error) {
        error = _error
      }
      error.should.be.instanceof(Error)
      error.message.should.equal('AmorphConverter.prototype.from:arguments[0] should be an integer, received 0.5')
    })

    it('should throw error when .from negative non-integer', () => {
      let error
      try {
        converters.signed.from(new Bignumber(-.5))
      } catch (_error) {
        error = _error
      }
      error.should.be.instanceof(Error)
      error.message.should.equal('AmorphConverter.prototype.from:arguments[0] should be an integer, received -0.5')
    })
  })
})

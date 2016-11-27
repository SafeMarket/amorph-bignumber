const chai = require('chai')
const expect = chai.expect
const converters = require('../')
const Nobject = require('nobject')
const Bignumber = require('bignumber.js')

chai.use(require('chai-bignumber')(Bignumber))

describe('converters', () => {

  it('should be instance of Nobject', () => {
    expect(converters).to.be.instanceOf(Nobject)
  })

  describe('bignumber-number', () => {
    it('test 1', () => {
      const number = converters.get(['bignumber', 'number'])(new Bignumber(3))
      expect(number).to.be.a('number')
      expect(number).to.equal(3)
    })

    it('test 2', () => {
      const number = converters.get(['bignumber', 'number'])(new Bignumber(2.5))
      expect(number).to.be.a('number')
      expect(number).to.equal(2.5)
    })

    it('test 3', () => {
      const number = converters.get(['bignumber', 'number'])(new Bignumber('0xff.8'))
      expect(number).to.be.a('number')
      expect(number).to.equal(255.5)
    })

    it('test 4', () => {
      const number = converters.get(['bignumber', 'number'])(new Bignumber('ff.8', 16))
      expect(number).to.be.a('number')
      expect(number).to.equal(255.5)
    })
  })

  it('should be instance of Nobject', () => {
    expect(converters).to.be.instanceOf(Nobject)
  })

  describe('number-bignumber', () => {
    it('test 1', () => {
      const bignumber = converters.get(['number', 'bignumber'])(3)
      expect(bignumber).to.be.instanceOf(Bignumber)
      expect(bignumber).to.be.bignumber.equal(3)
    })

    it('test 2', () => {
      const bignumber = converters.get(['number', 'bignumber'])(2.5)
      expect(bignumber).to.be.instanceOf(Bignumber)
      expect(bignumber).to.be.bignumber.equal(2.5)
    })

  })

  describe('bignumber-hex', () => {
    it('test 1', () => {
      const hex = converters.get(['bignumber', 'hex'])(new Bignumber(0))
      expect(hex).to.be.a('string')
      expect(hex).to.equal('0')
    })

    it('test 2', () => {
      const hex = converters.get(['bignumber', 'hex'])(new Bignumber(1))
      expect(hex).to.be.a('string')
      expect(hex).to.equal('1')
    })

    it('test 3', () => {
      const hex = converters.get(['bignumber', 'hex'])(new Bignumber(10))
      expect(hex).to.be.a('string')
      expect(hex).to.equal('a')
    })

    it('test 4', () => {
      const hex = converters.get(['bignumber', 'hex'])(new Bignumber(16))
      expect(hex).to.be.a('string')
      expect(hex).to.equal('10')
    })

    it('test 5', () => {
      const hex = converters.get(['bignumber', 'hex'])(new Bignumber(255))
      expect(hex).to.be.a('string')
      expect(hex).to.equal('ff')
    })

    it('test 6', () => {
      const hex = converters.get(['bignumber', 'hex'])(new Bignumber(255.5))
      expect(hex).to.be.a('string')
      expect(hex).to.equal('ff.8')
    })
  })

  describe('hex-bignumber', () => {
    it('test 1', () => {
      const bignumber = converters.get(['hex', 'bignumber'])('0')
      expect(bignumber).to.be.instanceOf(Bignumber)
      expect(bignumber).to.be.bignumber.equal(0)
    })

    it('test 2', () => {
      const bignumber = converters.get(['hex', 'bignumber'])('1')
      expect(bignumber).to.be.instanceOf(Bignumber)
      expect(bignumber).to.be.bignumber.equal(1)
    })

    it('test 3', () => {
      const bignumber = converters.get(['hex', 'bignumber'])('a')
      expect(bignumber).to.be.instanceOf(Bignumber)
      expect(bignumber).to.be.bignumber.equal(10)
    })

    it('test 4', () => {
      const bignumber = converters.get(['hex', 'bignumber'])('10')
      expect(bignumber).to.be.instanceOf(Bignumber)
      expect(bignumber).to.be.bignumber.equal(16)
    })

    it('test 5', () => {
      const bignumber = converters.get(['hex', 'bignumber'])('ff')
      expect(bignumber).to.be.instanceOf(Bignumber)
      expect(bignumber).to.be.bignumber.equal(255)
    })

    it('test 6', () => {
      const bignumber = converters.get(['hex', 'bignumber'])('ff.8')
      expect(bignumber).to.be.instanceOf(Bignumber)
      expect(bignumber).to.be.bignumber.equal(255.5)
    })
  })

  describe('hex.prefixed-bignumber', () => {
    it('test 1', () => {
      const bignumber = converters.get(['hex.prefixed', 'bignumber'])('0x0')
      expect(bignumber).to.be.instanceOf(Bignumber)
      expect(bignumber).to.be.bignumber.equal(0)
    })

    it('test 2', () => {
      const bignumber = converters.get(['hex.prefixed', 'bignumber'])('0x1')
      expect(bignumber).to.be.instanceOf(Bignumber)
      expect(bignumber).to.be.bignumber.equal(1)
    })

    it('test 3', () => {
      const bignumber = converters.get(['hex.prefixed', 'bignumber'])('0xa')
      expect(bignumber).to.be.instanceOf(Bignumber)
      expect(bignumber).to.be.bignumber.equal(10)
    })

    it('test 4', () => {
      const bignumber = converters.get(['hex.prefixed', 'bignumber'])('0x10')
      expect(bignumber).to.be.instanceOf(Bignumber)
      expect(bignumber).to.be.bignumber.equal(16)
    })

    it('test 5', () => {
      const bignumber = converters.get(['hex.prefixed', 'bignumber'])('0xff')
      expect(bignumber).to.be.instanceOf(Bignumber)
      expect(bignumber).to.be.bignumber.equal(255)
    })

    it('test 6', () => {
      const bignumber = converters.get(['hex.prefixed', 'bignumber'])('0xff.8')
      expect(bignumber).to.be.instanceOf(Bignumber)
      expect(bignumber).to.be.bignumber.equal(255.5)
    })
  })

})

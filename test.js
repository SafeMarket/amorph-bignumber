const amorphBignumber = require('./')
const chai = require('chai')
const Bignumber = require('bignumber.js')

chai.should()

describe('amorphBignumber', () => {

  it('should .to [1, 1]', () => {
    amorphBignumber.to(new Uint8Array([1, 1])).toNumber().should.equal(257)
  })
  it('should .to []', () => {
    amorphBignumber.to(new Uint8Array(0)).toNumber().should.equal(0)
  })
  it('should .to [0]', () => {
    amorphBignumber.to(new Uint8Array([0])).toNumber().should.equal(0)
  })
  it('should .from 257', () => {
    amorphBignumber.from(new Bignumber(257)).should.deep.equal(new Uint8Array([1, 1]))
  })
  it('should .from 0', () => {
    amorphBignumber.from(new Bignumber(0)).should.deep.equal(new Uint8Array(0))
  })

})

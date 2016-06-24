import { expect } from 'chai'
import { storageUnitTable } from '../constants'
import { convertValue } from './unit-conversion'

describe('convertValue', function () {
  it('scales down the unit when value is too small', function () {
    expect(convertValue(storageUnitTable, 'TiB', 0.001)).to.deep.equal({
      unit: 'GiB', value: 0.001 * 1024
    })
    expect(convertValue(storageUnitTable, 'TiB', 0.000001)).to.deep.equal({
      unit: 'MiB', value: 0.000001 * Math.pow(1024, 2)
    })
    expect(convertValue(storageUnitTable, 'GiB', 0.001)).to.deep.equal({
      unit: 'MiB', value: 0.001 * 1024
    })
  })

  it('scales up the unit when value is too big', function () {
    expect(convertValue(storageUnitTable, 'MiB', 10000)).to.deep.equal({
      unit: 'GiB', value: 10000 / 1024
    })
    expect(convertValue(storageUnitTable, 'MiB', 10000000)).to.deep.equal({
      unit: 'TiB', value: 10000000 / Math.pow(1024, 2)
    })
    expect(convertValue(storageUnitTable, 'GiB', 10000)).to.deep.equal({
      unit: 'TiB', value: 10000 / 1024
    })
  })

  it('returns the same unit and value when unit is not in the table', function () {
    expect(convertValue(storageUnitTable, 'foo', 1)).to.deep.equal({
      unit: 'foo', value: 1
    })
  })
})

import { expect } from 'chai'
import { initLocale, currentLocale, formatNumber, formatPercent } from './intl'

describe('Intl Number Formatters', function () {
  describe('format numbers (en-US)', function () {
    it('format number >999 w/o grouping', function () {
      expect(formatNumber(12345, 0)).to.equal('12345')
    })

    it('format number to integers with rounding', function () {
      expect(formatNumber(987, 0)).to.equal('987')
      expect(formatNumber(987.4, 0)).to.equal('987')
      expect(formatNumber(987.5, 0)).to.equal('988')
    })

    it('format number to tenths with rounding', function () {
      expect(formatNumber(987, 1)).to.equal('987.0')
      expect(formatNumber(987.6, 1)).to.equal('987.6')
      expect(formatNumber(987.64, 1)).to.equal('987.6')
      expect(formatNumber(987.65, 1)).to.equal('987.7')
    })

    it('format number to hundredths with rounding', function () {
      expect(formatNumber(987, 2)).to.equal('987.00')
      expect(formatNumber(987.6, 2)).to.equal('987.60')
      expect(formatNumber(987.65, 2)).to.equal('987.65')
      expect(formatNumber(987.654, 2)).to.equal('987.65')
      expect(formatNumber(987.655, 2)).to.equal('987.66')
    })
  })

  describe('format numbers (it-IT)', function () {
    it('format number with localized decimal point', function () {
      initLocale('it-IT')
      expect(currentLocale()).to.equal('it-IT')

      expect(formatNumber(987.654, 3)).to.equal('987,654')
    })
  })
})

describe('Intl Percent Formatters', function () {
  describe('format percent (en-US)', function () {
    it('format percent w/o grouping', function () {
      expect(formatPercent(1, 0)).to.equal('100%')
      expect(formatPercent(100, 0)).to.equal('10000%')
    })

    it('format percents to integers with rounding', function () {
      expect(formatPercent(0.012, 0)).to.equal('1%')
      expect(formatPercent(0.015, 0)).to.equal('2%')
    })

    it('format number to tenths/hundredths with rounding', function () {
      expect(formatPercent(1, 1)).to.equal('100.0%')
      expect(formatPercent(0.012, 1)).to.equal('1.2%')
      expect(formatPercent(0.0124, 1)).to.equal('1.2%')
      expect(formatPercent(0.01245, 1)).to.equal('1.2%')
      expect(formatPercent(0.0125, 1)).to.equal('1.3%')

      expect(formatPercent(1, 2)).to.equal('100.00%')
      expect(formatPercent(0.012, 2)).to.equal('1.20%')
      expect(formatPercent(0.01234, 2)).to.equal('1.23%')
      expect(formatPercent(0.01235, 2)).to.equal('1.23%')
      expect(formatPercent(0.01236, 2)).to.equal('1.24%')
    })
  })

  describe('format percents (it-IT)', function () {
    it('format percents with localized decimal point and % placement', function () {
      initLocale('it-IT')
      expect(currentLocale()).to.equal('it-IT')

      expect(formatPercent(1, 0)).to.equal('100%')
      expect(formatPercent(1, 1)).to.equal('100,0%')
      expect(formatPercent(1, 2)).to.equal('100,00%')
      expect(formatPercent(1, 3)).to.equal('100,000%')

      expect(formatPercent(0.0987, 0)).to.equal('10%')
      expect(formatPercent(0.0987, 1)).to.equal('9,9%')
      expect(formatPercent(0.0987, 2)).to.equal('9,87%')
      expect(formatPercent(0.0987, 3)).to.equal('9,870%')
    })
  })

  describe('format percents (de-DE)', function () {
    it('format percents with localized decimal point and "&nbps;%" (de-DE)', function () {
      initLocale('de-DE')
      expect(currentLocale()).to.equal('de-DE')

      expect(formatPercent(0.0987, 0)).to.equal('10\xA0%') // \xA0 === &nbsp;
      expect(formatPercent(0.0987, 1)).to.equal('9,9\xA0%')
      expect(formatPercent(0.0987, 2)).to.equal('9,87\xA0%')
      expect(formatPercent(0.0987, 3)).to.equal('9,870\xA0%')
    })
  })
})

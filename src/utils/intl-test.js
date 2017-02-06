import { expect } from 'chai'
import { initLocale, currentLocale, formatNumber, formatPercent, formatDate, formatDateTime } from './intl'

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
      expect(formatPercent(0.01235, 2)).to.equal('1.23%') // TODO(sd): should this round up or truncate???
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

// Intl polyfill only supports UTC but doesn't include the time zone name after formatting.  Extract the UTC
// time zone's locale specific name from a formatted string.  Use that locale specific name in test comparison.
function extractUtcTimezoneName (locale) {
  // This is the minimal time + timezone only formatter configuration that must be supported by a ECMA-402 implementation
  const dtf = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    timeZoneName: 'short',
    timeZone: 'UTC'
  })
  let utcTzName = dtf.format()
  utcTzName = utcTzName.substr(utcTzName.indexOf(' ')).trim()
  return utcTzName
}

describe('DateTime Formatters', function () {
  describe('format dates and date+times (en-US)', function () {
    it('format date', function () {
      expect(formatDate(new Date(Date.UTC(1999, 11, 31)))).to.equal('12/31/1999')
      expect(formatDate(new Date(Date.UTC(2020, 6, 4)))).to.equal('7/4/2020')
    })
    it('format datetime', function () {
      const amName = 'AM'
      const pmName = 'PM'
      const utcTzName = extractUtcTimezoneName(currentLocale())

      expect(formatDateTime(new Date(Date.UTC(1999, 11, 31, 16, 35, 42)))).to.equal(`12/31/1999, 4:35:42 ${pmName} ${utcTzName}`)
      expect(formatDateTime(new Date(Date.UTC(2020, 6, 4, 11, 12, 13)))).to.equal(`7/4/2020, 11:12:13 ${amName} ${utcTzName}`)
    })
  })

  describe('format date (it-IT)', function () {
    it('format date', function () {
      initLocale('it-IT')
      expect(currentLocale()).to.equal('it-IT')

      expect(formatDate(new Date(Date.UTC(1999, 11, 31)))).to.equal('31/12/1999')
      expect(formatDate(new Date(Date.UTC(2020, 6, 4)))).to.equal('4/7/2020')
    })
    it('format datetime', function () {
      initLocale('it-IT')
      const amName = ''
      const pmName = ''
      const utcTzName = extractUtcTimezoneName(currentLocale())

      // NOTE: The output string will ALWAYS have a suffix of " {am/pm} {TZname}" when tested in PhantomJS
      //       using the Intl polyfill.  Since it-IT's default is a 24 hour clock, and Intl polyfill doesn't
      //       output the TZ name, the formatted string will end up having 2 trailing spaces.
      expect(formatDateTime(new Date(Date.UTC(1999, 11, 31, 16, 35, 42)))).to.equal(`31/12/1999, 16:35:42 ${pmName} ${utcTzName}`)
      expect(formatDateTime(new Date(Date.UTC(2020, 6, 4, 11, 12, 13)))).to.equal(`4/7/2020, 11:12:13 ${amName} ${utcTzName}`)
    })
  })

  describe('format date (de-DE)', function () {
    it('format date', function () {
      initLocale('de-DE')
      expect(currentLocale()).to.equal('de-DE')

      expect(formatDate(new Date(Date.UTC(1999, 11, 31)))).to.equal('31.12.1999')
      expect(formatDate(new Date(Date.UTC(2020, 6, 4)))).to.equal('4.7.2020')
    })
    it('format datetime', function () {
      initLocale('de-DE')
      const amName = ''
      const pmName = ''
      const utcTzName = extractUtcTimezoneName(currentLocale())

      expect(formatDateTime(new Date(Date.UTC(1999, 11, 31, 16, 35, 42)))).to.equal(`31.12.1999, 16:35:42 ${pmName} ${utcTzName}`)
      expect(formatDateTime(new Date(Date.UTC(2020, 6, 4, 11, 12, 13)))).to.equal(`4.7.2020, 11:12:13 ${amName} ${utcTzName}`)
    })
  })
})

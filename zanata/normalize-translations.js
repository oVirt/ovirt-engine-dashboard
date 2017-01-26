#! /usr/bin/node
const stringify = require('json-stable-stringify')
const fs = require('fs')

const filename = [ 'intl/translations.json', '../intl/translations.json' ].find((filename) => fs.existsSync(filename))
const translatedMessages = JSON.parse(fs.readFileSync(filename, 'utf8'))

console.log(`normalizing translations in ${filename}`)
const pretty = stringify(translatedMessages, {
  space: '  ',
  cmp: (a, b) => { return a.key > b.key ? 1 : -1 }
})

fs.writeFileSync(filename, pretty, 'utf8')


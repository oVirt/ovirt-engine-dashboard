#! /usr/bin/node
const stringify = require('json-stable-stringify')
const fs = require('fs')

const filename = [ 'intl/translations.json', '../intl/translations.json' ].find((filename) => fs.existsSync(filename))
const translatedMessages = JSON.parse(fs.readFileSync(filename, 'utf8'))

console.log(`removing empty translations from ${filename}`)
Object.keys(translatedMessages).forEach((locale) => {
  const removed = []
  Object.keys(translatedMessages[locale]).forEach((id) => {
    if (translatedMessages[locale][id] === '') {
      removed.push(id)
      delete translatedMessages[locale][id]
    }
  })
  if (removed.length) {
    console.log(`\t${locale}`)
    removed.forEach((key) => { console.log(`\t\t${key}`) })
  }
})

console.log(`normalizing translations in ${filename}`)
const pretty = stringify(translatedMessages, {
  space: '  ',
  cmp: (a, b) => { return a.key > b.key ? 1 : -1 }
})

fs.writeFileSync(filename, pretty, 'utf8')


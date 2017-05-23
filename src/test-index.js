import appInit from './services/app-init'
import { defaultLocale, defaultTimeZone } from './constants'
import { resetApi } from './plugin-api'

// require all modules ending in `-test` from the current directory and all subdirectories
const testContext = require.context('.', true, /-test$/)
testContext.keys().forEach(testContext)

// TODO(vs) this fancy import is needed until we upgrade to Sinon 2
// https://github.com/webpack/webpack/issues/304#issuecomment-170883329
import sinon from 'imports?define=>false,require=>false!sinon/pkg/sinon.js'

beforeEach(function setupFakeEnv (done) {
  // all tests should use `this.sandbox` to create fakes
  const sandbox = this.sandbox = sinon.sandbox.create()

  // stubbed UI plugin API functions, exposed via `this.pluginApiStubs`
  const pluginApiStubs = this.pluginApiStubs = {}
  ;[
    'register',
    'ready',
    'addMainTab',
    'setSearchString',
    'revealPlace',
    'engineBaseUrl',
    'currentLocale',
    'currentTimeZone'
  ].forEach((apiMethod) => {
    pluginApiStubs[apiMethod] = sandbox.stub()
  })
  pluginApiStubs.currentLocale.returns(defaultLocale)
  pluginApiStubs.currentTimeZone.returns(defaultTimeZone)

  // ensure the global pluginApi function exists and is unique for each test
  window.top.pluginApi = () => pluginApiStubs
  resetApi()

  appInit.run()
    .then(() => { done() })
    .catch((error) => { done(error) })
})

afterEach(function disposeFakeEnv () {
  this.sandbox.restore()
  delete window.top.pluginApi
})

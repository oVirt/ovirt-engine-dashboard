// require all modules ending in `-test` from the current directory and all subdirectories
const testContext = require.context('.', true, /-test$/)
testContext.keys().forEach(testContext)

// TODO(vs) this fancy import is needed until we upgrade to Sinon 2
// https://github.com/webpack/webpack/issues/304#issuecomment-170883329
import sinon from 'imports?define=>false,require=>false!sinon/pkg/sinon.js'

beforeEach(function setupFakeEnv () {
  // all tests should use `this.sandbox` to create fakes
  const sandbox = this.sandbox = sinon.sandbox.create()

  // stubbed UI plugin API functions, exposed via `this.pluginApiStubs`
  const pluginApiStubs = this.pluginApiStubs = {}
  ;[
    'register',
    'ready',
    'addMainTab',
    'setTabAccessible',
    'setSearchString',
    'revealPlace',
    'engineBaseUrl',
    'currentLocale'
  ].forEach((apiMethod) => {
    pluginApiStubs[apiMethod] = sandbox.stub()
  })

  // ensure the global pluginApi function exists
  window.top.pluginApi = () => pluginApiStubs
})

afterEach(function disposeFakeEnv () {
  this.sandbox.restore()
  delete window.top.pluginApi
})

require('file?name=[name].[ext]!../static/html/main_tab.html')

import React from 'react'
import {render} from 'react-dom'
import GlobalDashboard from './components/GlobalDashboard'

import 'bootstrap/dist/css/bootstrap.css'

render(
  <GlobalDashboard />,
  document.getElementById('app')
)

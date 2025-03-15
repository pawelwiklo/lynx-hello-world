import { root } from '@lynx-js/react'

import { HomePage } from './view/home_page.jsx'

root.render(<HomePage />)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}

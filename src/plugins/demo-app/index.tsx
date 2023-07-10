import { TPlugin } from '@development-framework/dm-core'

import App from './App'

export const plugins: TPlugin[] = [
  {
    pluginName: 'demoApp',
    component: App,
  },
]

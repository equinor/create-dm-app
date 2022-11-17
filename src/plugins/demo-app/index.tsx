import { EPluginType } from '@development-framework/dm-core'

import App from './App'

export const plugins: any = [
  {
    pluginName: 'demoApp',
    pluginType: EPluginType.PAGE,
    component: App,
  },
]

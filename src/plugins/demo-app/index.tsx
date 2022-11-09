import { EPluginType, TPlugin } from '@development-framework/dm-core'

import App from './App'

export const plugins: TPlugin[] = [
  {
    pluginName: 'demoApp',
    pluginType: EPluginType.PAGE,
    component: App,
  },
]

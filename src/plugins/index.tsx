import { TUiPluginMap } from '@development-framework/dm-core'
import { HelloWorldPlugin } from './hello-world/HelloWorldPlugin'

export default {
  'hello-world': {
    component: HelloWorldPlugin,
  },
} as TUiPluginMap

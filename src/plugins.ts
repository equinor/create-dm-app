import { TPlugin } from '@development-framework/dm-core'

import { plugins } from '@development-framework/dm-core-plugins'

const _plugins = [import('./plugins/DemoApp'), ...plugins]

export default _plugins

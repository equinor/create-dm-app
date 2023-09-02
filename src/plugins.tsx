// This file is where to add references to your own plugins.

import dmCorePlugins from '@development-framework/dm-core-plugins'
import localPlugins from './plugins/index'
import { TUiPluginMap } from '@development-framework/dm-core'

const plugins: TUiPluginMap = {
  ...dmCorePlugins,
  ...localPlugins,
}

export default plugins

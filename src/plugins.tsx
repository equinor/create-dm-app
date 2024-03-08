// This file is where to add references to your own plugins.

import { TUiPluginMap } from '@development-framework/dm-core'
import dmCorePlugins from '@development-framework/dm-core-plugins'
import localPlugins from './plugins/index'

const plugins: TUiPluginMap = {
  ...dmCorePlugins,
  ...localPlugins,
}

export default plugins

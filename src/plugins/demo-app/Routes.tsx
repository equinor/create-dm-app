import { TRoute } from '@development-framework/dm-core'
import {Overview} from "./pages/Overview";
import {Jobs} from "./pages/JobExample";
import {BlueprintInteraction} from "./pages/BlueprintInteraction";

const Routes: Array<TRoute> = [
  {
    path: '/jobs',
    content: Jobs,
  },
  {
    path: '/',
    content: Overview,
  },
  {
    path: '/blueprint-interaction',
    content: BlueprintInteraction,
  },

]

export default Routes

import { TRoute } from '@development-framework/dm-core'
import {Overview} from "./pages/Overview";
import {Jobs} from "./pages/JobExample";

const Routes: Array<TRoute> = [
      {
    path: '/jobs',
    content: Jobs,
  },
  {
    path: '/',
    content: Overview,
  },

]

export default Routes

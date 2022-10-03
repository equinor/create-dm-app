import { TRoute } from '@development-framework/dm-core'
import { AnalysisOverview } from './modules/Analysis/AnalysisOverview'

const Routes: Array<TRoute> = [
  {
    path: '/analyses',
    //@ts-ignore
    content: AnalysisOverview,
  },
]

export default Routes

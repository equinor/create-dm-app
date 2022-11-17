import { Overview } from './pages/Overview'
import { Jobs } from './pages/JobExample'
import { BlueprintInteraction } from './pages/BlueprintInteraction'
import { ReactNode } from 'react'

const Routes: Array<{ path: string; content: ReactNode }> = [
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

import '@development-framework/dm-core/dist/main.css'
import {
  useDocument,
  EntityView,
  TGenericObject,
  FSTreeProvider,
} from '@development-framework/dm-core'
import React from 'react'
import { Progress } from '@equinor/eds-core-react'

function App() {
  const {
    document: application,
    isLoading,
    error,
  } = useDocument<TGenericObject>(
    `${import.meta.env.VITE_DATA_SOURCE}/$${
      import.meta.env.VITE_APPLICATION_ID
    }`
  )

  if (isLoading) return <Progress.Circular />

  if (error) {
    console.error(error)
    return (
      <div style={{ color: 'red' }}>
        <b>Error:</b>Failed to load data, see web console for details
      </div>
    )
  }

  return (
    <FSTreeProvider visibleDataSources={application?.dataSources}>
      <EntityView
        idReference={`${import.meta.env.VITE_DATA_SOURCE}/$${application?._id}`}
        type={application?.type}
      />
    </FSTreeProvider>
  )
}

export default App

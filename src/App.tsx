import '@development-framework/dm-core/dist/main.css'
import { useDocument, EntityView } from '@development-framework/dm-core'
import React, { useContext, useState } from 'react'
import { Typography } from '@equinor/eds-core-react'

function App() {
  const applicationId =
    'DemoApplicationDataSource/$4483c9b0-d505-46c9-a157-94c79f4d7a6a'
  const [application, isLoading, , error] = useDocument(applicationId)
  if (isLoading) return <div>Loading...</div>
  console.log(application)
  return (
    <div>app loaded.. </div>
    //           <EntityView
    //             type={application.type}
    //             idReference={applicationId}
    //           />
  )
}

export default App

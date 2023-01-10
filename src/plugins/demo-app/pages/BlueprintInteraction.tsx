import {
  AuthContext,
  DmssAPI,
  JsonView,
  NewEntityButton,
  TReference,
} from '@development-framework/dm-core'
import React, { useContext, useEffect, useState } from 'react'
import { SingleSelect } from '@equinor/eds-core-react'
import { AxiosResponse } from 'axios'
import { jsonContainer } from '../design/styles'

export const BlueprintInteraction = () => {
  const dataSourceName = 'DemoApplicationDataSource'
  const packageName = 'CarPackage'
  const { token } = useContext(AuthContext)
  const dmssApi = new DmssAPI(token)
  const [blueprints, setBlueprints] = useState<any[]>([])
  const [selectedBlueprint, setSelectedBlueprint] = useState<any>({})
  const [entity, setEntity] = useState<any>({})

  useEffect(() => {
    dmssApi
      .documentGetByPath({
        absolutePath: `dmss://${dataSourceName}/models/${packageName}`,
      })
      .then((response: AxiosResponse<any>) => {
        setBlueprints(response.data.content)
      })
  }, [])

  return (
    <div>
      <p>Select a blueprint inside the package: {packageName}</p>
      <SingleSelect
        items={blueprints.map((blueprint) => blueprint.name)}
        handleSelectedItemChange={(e) => {
          setSelectedBlueprint(
            blueprints.find(
              (blueprint, index) => blueprints[index].name === e.selectedItem
            )
          )
          setEntity({})
        }}
        label={'Choose a blueprint'}
      />
      {Object.keys(selectedBlueprint).length > 0 && (
        <>
          <br />
          <h2 style={{ paddingTop: '20px' }}>Blueprint:</h2>
          <JsonView style={jsonContainer} data={selectedBlueprint} />
          <h2>Create new entity</h2>
          <NewEntityButton
            type={`dmss://${dataSourceName}/models/${packageName}/${selectedBlueprint.name}`}
            defaultDestination={`${dataSourceName}/instances`}
            onCreated={(createdEntity: TReference) =>
              dmssApi
                .documentGetById({
                  idReference: `${dataSourceName}/${createdEntity._id}`,
                })
                .then((response) => {
                  setEntity(response.data)
                })
            }
          />
        </>
      )}
      <br />
      {Object.keys(entity).length > 0 && (
        <JsonView style={jsonContainer} data={entity} />
      )}
    </div>
  )
}

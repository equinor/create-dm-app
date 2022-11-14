import { AuthContext, DmssAPI, JsonView } from '@development-framework/dm-core'
import React, { useContext, useEffect, useState } from 'react'
import { SingleSelect } from '@equinor/eds-core-react'
import { AxiosResponse } from 'axios'

export const BlueprintInteraction = () => {
  const packageName = 'CarPackage'
  const dataSource = 'DemoApplicationDataSource'
  const { token } = useContext(AuthContext)
  const dmssApi = new DmssAPI(token)
  const [blueprints, setBlueprints] = useState<any[]>([])
  const [selectedBlueprint, setSelectedBlueprint] = useState<object>({})

  useEffect(() => {
    fetchBlueprintsFromPackage(packageName)
  }, [])

  const fetchBlueprintsFromPackage = (pacakgeName: string) => {
    dmssApi
      .documentGetByPath({
        dataSourceId: dataSource,
        path: `models/${pacakgeName}`,
      })
      .then((response: AxiosResponse<any>) => {
        setBlueprints(response.data.content)
      })
  }

  return (
    <div>
      <p>Select a blueprint inside the package: {packageName}</p>
      <SingleSelect
        items={blueprints.map((blueprint) => blueprint.name)}
        handleSelectedItemChange={(e) =>
          setSelectedBlueprint(
            blueprints.find(
              (blueprint, index) => blueprints[index].name === e.selectedItem
            )
          )
        }
        label={'Choose a blueprint'}
      />
      {Object.keys(selectedBlueprint).length > 0 && (
        <JsonView style={{ paddingTop: '20px' }} data={selectedBlueprint} />
      )}
    </div>
  )
}

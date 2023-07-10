import React, { ReactNode, useContext, useState } from 'react'
import {
  FSTreeContext,
  TreeNode,
  EntityView,
  TreeView,
} from '@development-framework/dm-core'

export const Browse = (props: { settings: any }): ReactNode => {
  const { treeNodes, loading } = useContext(FSTreeContext)
  const [selectedType, setSelectedType] = useState<string>()
  const [selectedEntity, setSelectedEntity] = useState<string>()
  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <TreeView
          nodes={treeNodes}
          onSelect={(node: TreeNode) => {
            console.log(node)
            setSelectedType(node.type)
            setSelectedEntity(node.nodeId)
          }}
        />
      )}
      {selectedType && selectedEntity && (
        <EntityView
          type={selectedType}
          idReference={selectedEntity}
          key={selectedEntity}
        />
      )}
    </>
  )
}

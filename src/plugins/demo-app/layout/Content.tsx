import React, { ReactNode } from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { DocumentPath } from '@development-framework/dm-core'
import { TApplicationSettings } from '../Types'

const { Content } = Layout

const PageContent = styled.div`
  padding: 20px;
`

const ContentWrapper = (props: {
  content: ReactNode
  settings: TApplicationSettings
}): JSX.Element => {
  const { content, settings } = props
  const { data_source, entity_id } = useParams<{
    data_source: string
    entity_id: string
  }>()
  return (
    <Content style={{ margin: '0px 0px 10px 0px' }}>
      {data_source && entity_id && (
        <DocumentPath absoluteDottedId={`${data_source}/${entity_id}`} />
      )}
      {/*@ts-ignore*/}
      <PageContent>{content({ settings: settings })}</PageContent>
    </Content>
  )
}

export default ContentWrapper

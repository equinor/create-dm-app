import { IUIPlugin } from '@development-framework/dm-core'
import * as React from 'react'

export const HelloWorldPlugin = (props: IUIPlugin) => {
  console.log(props)
  return <>Hello world</>
}

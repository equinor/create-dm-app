import * as React from 'react'
import { IUIPlugin } from '@development-framework/dm-core'

export const HelloWorldPlugin = (props: IUIPlugin) => {
  console.log(props)
  return <>Hello world</>
}

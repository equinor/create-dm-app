import * as React from 'react'
import { expect, test } from 'vitest'
import { HelloWorldPlugin } from './HelloWorldPlugin'
import { render } from '@testing-library/react'

test('should have hello world message', () => {
  const input = {
    type: '',
    idReference: '',
  }
  const { getByText } = render(<HelloWorldPlugin {...input} />)
  expect(getByText('Hello world')).toMatchInlineSnapshot(`
      <div>
        Hello world
      </div>
    `)
})

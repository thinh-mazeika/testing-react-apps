// testing custom hooks
// http://localhost:3000/counter-hook

import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import useCounter from '../../components/use-counter'

function Count() {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <p aria-label="current">Current count: {count}</p>
      <button aria-label="decrement" onClick={decrement}>
        Decrement
      </button>
      <button aria-label="increment" onClick={increment}>
        Increment
      </button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<Count />)
  const decrement = screen.getByLabelText(/decrement/i)
  const increment = screen.getByLabelText(/increment/i)
  const current = screen.getByLabelText(/current/i)
  expect(current).toHaveTextContent('0')
  userEvent.click(decrement)
  expect(current).toHaveTextContent('-1')
  userEvent.click(increment)
  expect(current).toHaveTextContent('0')
})

test('exposes the count and inc/dec with fake component', () => {
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }
  render(<TestComponent />)
  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})

/* eslint no-unused-vars:0 */

// Avoid implementation details
// http://localhost:3000/counter

import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />)

  const decrement = screen.getByRole('button', {name: /decrement/i})
  const increment = screen.getByRole('button', {name: /increment/i})
  const message = screen.getByText(/Current count: 0/i)

  expect(message).toHaveTextContent('Current count: 0')
  fireEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  fireEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})

test('counter increments and decrements when the buttons are clicked with UserEvent', () => {
  render(<Counter />)

  const decrement = screen.getByRole('button', {name: /decrement/i})
  const increment = screen.getByRole('button', {name: /increment/i})
  const message = screen.getByText(/Current count: 0/i)

  expect(message).toHaveTextContent('Current count: 0')
  userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})

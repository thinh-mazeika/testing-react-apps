// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(<Counter />, div)

  const [decrement, increment] = div.querySelectorAll('button')
  const message = div.firstChild.querySelector('div')

  expect(message.textContent).toBe('Current count: 0')
  increment.click()
  expect(message.textContent).toBe('Current count: 1')
  decrement.click()
  expect(message.textContent).toBe('Current count: 0')
  div.remove()
})

test('counter increments and decrements when the buttons are clicked with dispatchEvent', () => {
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(<Counter />, div)

  const [decrement, increment] = div.querySelectorAll('button')
  const message = div.firstChild.querySelector('div')

  const incrementDispatchEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  increment.dispatchEvent(incrementDispatchEvent)
  expect(message.textContent).toBe('Current count: 1')
  const decrementDispatchEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  decrement.dispatchEvent(decrementDispatchEvent)
  expect(message.textContent).toBe('Current count: 0')
})

/* eslint no-unused-vars:0 */

// form testing
// http://localhost:3000/login

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import * as React from 'react'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  let submittedData
  const handleSubmit = data => {
    return (submittedData = data)
  }
  render(<Login onSubmit={handleSubmit} />)
  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)
  userEvent.type(username, 'thinh')
  userEvent.type(password, '123')
  const submitBtn = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submitBtn)

  expect(submittedData).toEqual({username: 'thinh', password: '123'})
})

test('submitting the form calls onSubmit with username and password with jest mock fn', () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)
  userEvent.type(username, 'thinh')
  userEvent.type(password, '123')
  const submitBtn = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submitBtn)

  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'thinh',
    password: '123',
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

test('submitting the form calls onSubmit with username and password with faker', () => {
  const buildLoginForm = () => {
    return {
      username: faker.name.findName(),
      password: faker.internet.password(),
    }
  }
  const {username, password} = buildLoginForm()
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  const submitBtn = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submitBtn)

  expect(handleSubmit).toHaveBeenCalledWith({
    username: username,
    password: password,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

test('submitting the form calls onSubmit with username and password with faker and overrides', () => {
  const buildLoginForm = ({username, password}) => {
    username = faker.name.findName()
    return {
      username,
      password,
    }
  }
  const {username, password} = buildLoginForm({password: 'abc'})
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  const submitBtn = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submitBtn)

  expect(handleSubmit).toHaveBeenCalledWith({
    username: username,
    password: password,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/

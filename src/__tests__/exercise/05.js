// mocking HTTP requests
// http://localhost:3000/login-submission

import {build, fake} from '@jackfranklin/test-data-bot'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {setupServer} from 'msw/node'
import * as React from 'react'
import Login from '../../components/login-submission'
import {handlers, rest} from '../../test/server-handlers'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByText(username)).toBeInTheDocument()
})

test(`failed to type password results in an error`, async () => {
  render(<Login />)
  const {username} = buildLoginForm()
  userEvent.type(screen.getByLabelText(/username/i), username)

  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByRole('alert').innerHTML).toMatchInlineSnapshot(
    `"password required"`,
  )
})

test(`the server is down and displays error message`, async () => {
  const errorMessage = 'Oh nooo, something was wrong'
  server.use(
    rest.post(
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({message: errorMessage}))
      },
    ),
  )
  render(<Login />)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByRole('alert')).toHaveTextContent(errorMessage)
})

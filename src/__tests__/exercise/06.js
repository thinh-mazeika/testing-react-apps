// mocking Browser APIs and modules
// http://localhost:3000/location

import {render, screen} from '@testing-library/react'
import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

// beforeAll(() => {
//   window.navigator.geolocation = {
//     getCurrentPosition: jest.fn(),
//   }
// })

// function deferred() {
//   let resolve, reject
//   const promise = new Promise((res, rej) => {
//     resolve = res
//     reject = rej
//   })
//   return {promise, resolve, reject}
// }

jest.mock('react-use-geolocation')

// test('displays the users current location', async () => {
//   // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
//   // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
//   const fakePosition = {
//     coords: {
//       latitude: 100,
//       longitude: 200,
//     },
//   }
//   const {promise, resolve, reject} = deferred()
//   navigator.geolocation.getCurrentPosition.mockImplementation(callback => {
//     promise.then(() => {
//       callback(fakePosition)
//     })
//   })

//   render(<Location />)
//   expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
//   await act(async () => {
//     resolve()
//     await promise
//   })
//   expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
//   expect(screen.getByText(/latitude/i)).toHaveTextContent(
//     `Latitude: ${fakePosition.coords.latitude}`,
//   )
//   expect(screen.getByText(/longitude/i)).toHaveTextContent(
//     `Longitude: ${fakePosition.coords.longitude}`,
//   )
// })

test(`displays the users current location by mocking the module`, async () => {
  const fakePosition = {
    coords: {
      latitude: 100,
      longitude: 200,
    },
  }
  let setReturnValue
  function useMockCurrentPosition() {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  expect(screen.queryByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setReturnValue([fakePosition])
  })
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/

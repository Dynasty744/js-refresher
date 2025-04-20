import {test, expect} from '@playwright/test'
import axios from 'axios'

interface User {
  id: string,
  name: string,
  email: string,
}

test('GET /users returns valid list of users', async () => {
  const response: axios.AxiosResponse = await axios.get('https://example.api.com/users')
  expect(response.status).toBe(200)
  
  const users = response.data
  expect(users.length).toBeGreaterThan(0)
  users.forEach(user => {
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('name')
    expect(typeof user.email).toBe('string')
  })
})
import { randomUUID } from 'node:crypto'

import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query

      const users = database.select('users', search ? {
        name: search,
        email: search
      } : null)

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = JSON.parse(req.body)

      const newUser = {
        id: randomUUID(),
        name,
        email
      }

      database.insert('users', newUser)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      try {
        const { id } = req.params
        const { name, email } = JSON.parse(req.body)

        database.update('users', id, { name, email })

        return res.end()
      } catch (error) {
        return res.writeHead(404).end(JSON.stringify({ message: error.message }))
      }
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      try {
        const { id } = req.params

        database.delete('users', id)

        return res.end()
      } catch (error) {
        return res.writeHead(404).end(JSON.stringify({ message: error.message }))
      }
    }
  }
]
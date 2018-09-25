/* global describe, beforeEach, it, expect */
const supertest = require('supertest')
const server = require('../server')

const db = require('../lib/db')

const request = supertest.agent(server.listen())

describe('(Module) Url', () => {
  beforeEach(async () => {
    await db.dropAllSchemas()
    await db.sync()
  })

  describe('POST /v1/url', () => {
    it('should create a shortened URL', async () => {
      const data = {
        target: 'www.mozilla.org'
      }

      const response = await request
        .post('/v1/url')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(data)
        .expect(200)

      const { hash, target } = response.body

      expect(hash).toBeDefined()
      expect(target).toBe(data.target)
    })
  })

  describe('GET /users/:hash', () => {
    it('should fetch a shortened URL', async () => {
      const data = {
        target: 'www.mozilla.org'
      }

      const shorten = await request
        .post('/v1/url')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(data)
        .expect(200)

      const { hash, target } = shorten.body

      const response = await request
        .get(`/v1/url/${hash}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .expect(302)

      expect(response.header.location).toBe(target)
    })
  })

  describe('GET /users/:hash/stats', () => {
    it('should get stats of the shortened URL', async () => {
      const data = {
        target: 'www.mozilla.org'
      }

      const shorten = await request
        .post('/v1/url')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(data)
        .expect(200)

      const { hash } = shorten.body

      await request
        .get(`/v1/url/${hash}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .expect(302)

      const response = await request
        .get(`/v1/url/${hash}/stats`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .expect(200)

      const { uniqueVisitorsCount, uniqueVisitors, visits } = response.body
      expect(uniqueVisitorsCount).toBe(1)
      expect(uniqueVisitors).toHaveLength(1)
      expect(visits).toHaveLength(1)
    })
  })
})

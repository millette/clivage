'use strict'

// npm
import joi from 'joi'
import test from 'ava'

// self
import fn from './'

const schema = joi.object({
  port: joi.number(),
  more: joi.string(),
  srv: joi.string().uri().default('http://localhost:5984').optional(),
  user: joi.string().optional(),
  pw: joi.string().optional()
})
  .with('pw', 'user')
  .with('user', 'pw')

test('title', t => {
  t.is(fn({schema}), 'unicorns & rainbows')
})

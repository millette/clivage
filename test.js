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
  const ret = fn({ schema, argv: ['--more=rap', '--port=50'] })
  t.is(ret.flags.more, 'rap')
  t.is(ret.flags.port, 50)
})

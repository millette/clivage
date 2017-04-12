'use strict'

// npm
import joi from 'joi'
import test from 'ava'

// self
import fn from '../../'

const argv = ['--more=rap']

const schema = joi.object({
  badam: joi.boolean().truthy('').optional(),
  port: joi.number(),
  more: joi.string(),
  srv: joi.string().uri().default('http://localhost:5984').optional(),
  user: joi.string().optional(),
  pw: joi.string().optional()
})
  .with('pw', 'user')
  .with('user', 'pw')

const envPath = `${__dirname}/.env.test`

test('env', t => {
  const ret = fn({ schema, envPath })
  // console.log('FLAGS#2', ret.flags)
  t.is(ret.flags.more, 'bingo')
  t.is(ret.flags.port, 666) // from .env.test file
  t.is(ret.flags.srv, 'http://localhost:5984')
})

test('flag overrides env', t => {
  const ret = fn({ schema, argv, envPath })
  // console.log('FLAGS#2', ret.flags)
  t.is(ret.flags.more, 'rap')
  t.is(ret.flags.port, 666) // from .env.test file
  t.is(ret.flags.srv, 'http://localhost:5984')
})

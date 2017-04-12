'use strict'

// npm
import joi from 'joi'
import test from 'ava'

// self
import fn from './'

test('throws', t => {
  const schema = joi.object({ badam: joi.boolean().truthy('').optional() })
  t.throws(fn, 'The options argument is required and must be an object.')
  t.throws(() => fn({}), 'The schema argument is required and must be an object.')
  t.throws(() => fn({ schema: {} }), 'The schema argument is required and must be an object.')
  t.throws(() => fn({ schema, help: ['yup'] }), 'The help argument must be a string.')
  t.throws(() => fn({ schema, alias: 'yup' }), 'The alias argument must be an object.')
  t.throws(() => fn({ schema, argv: ['--badam=rap'] }), 'child "badam" fails because ["badam" must be a boolean]')
  t.throws(() => fn({ schema: { jo: 'blo' } }), 'child "jo" fails because ["jo" is required]')
  t.throws(() => fn({ schema: { jo: 'blo' }, argv: ['--jo'] }), 'child "jo" fails because ["jo" is not allowed to be empty]')
  t.throws(() => fn({ schema: { jo: 'blo' }, argv: ['--jo=1'] }), 'child "jo" fails because ["jo" must be one of [blo]]')
  t.throws(() => fn({ schema: joi.object({ badam: joi.string() }) }), 'child "badam" fails because ["badam" is required]')
  t.throws(() => fn(joi.object({ badam: joi.string() })), 'child "badam" fails because ["badam" is required]')
})

test('optional boolean flag', t => {
  const schema = joi.object({ badam: joi.boolean().truthy('').optional() })
  const ret = fn(schema)
  t.is(Object.keys(ret.flags).length, 0)
  t.is(ret.help, '\n  Command-line helper.\n\n')
  t.is(fn({ schema, argv: ['--badam='] }).flags.badam, true)
  t.is(fn({ schema, argv: ['--badam=false'] }).flags.badam, false)
})

test('optional number flag', t => {
  const schema = joi.object({ badam: joi.number().optional() })
  const ret = fn(schema)
  t.is(Object.keys(ret.flags).length, 0)
  t.is(ret.help, '\n  Command-line helper.\n\n')
  t.is(fn({ schema, argv: ['--badam=25'] }).flags.badam, 25)
  t.is(fn({ schema, argv: ['--badam=60.5'] }).flags.badam, 60.5)
})

test('required flags', t => {
  const argv = ['--more=rap', '--port=505']
  const schema = joi.object({
    port: joi.number(),
    more: joi.string()
  })

  const ret = fn({ schema, argv })
  t.is(ret.flags.more, 'rap')
  t.is(ret.flags.port, 505)
})

test('required conditional flags', t => {
  const schema = joi.object({
    user: joi.string().optional(),
    pw: joi.string().optional()
  })
    .with('pw', 'user')
    .with('user', 'pw')

  t.is(Object.keys(fn(schema).flags).length, 0)
  const ret2 = fn({ schema, argv: ['--user=bob', '--pw=fla'] })
  t.is(ret2.flags.user, 'bob')
  t.is(ret2.flags.pw, 'fla')
  t.throws(() => fn({ schema, argv: ['--pw=fla'] }), '"pw" missing required peer "user"')
  t.throws(() => fn({ schema, argv: ['--user=bob'] }), '"user" missing required peer "pw"')
})

test('alias & optional number flag', t => {
  const schema = joi.object({ badam: joi.number().optional() })
  t.is(fn({ schema, argv: ['-b=5'], alias: { b: 'badam' } }).flags.badam, 5)
})

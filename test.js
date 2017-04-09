'use strict'
import test from 'ava'
import fn from './'

test('title', async t => {
  t.is(await fn('unicorns'), 'unicorns & rainbows')
})

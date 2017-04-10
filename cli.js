#!/usr/bin/env node

/*
Command-line helper.

Copyright 2017
Robin Millette <robin@millette.info>
<http://robin.millette.info>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the
[GNU Affero General Public License](LICENSE.md)
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict'

// npm
const joi = require('joi')

// self
const clivage = require('./')

const schema = joi.object({
  port: joi.number(),
  more: joi.string(),
  srv: joi.string().uri().default('http://localhost:5984').optional(),
  user: joi.string().optional(),
  pw: joi.string().optional()
})
  .with('pw', 'user')
  .with('user', 'pw')

const help = `
  Usage
    $ clivage [input]

  Options
    --foo  Lorem ipsum. [Default: false]

  Examples
    $ clivage
    unicorns & rainbows
    $ clivage ponies
    ponies & rainbows`

const alias = {
  m: 'more'
}

const cli = clivage({ schema, help, alias }) // , prefix: 'BURLESK_'

console.log('cli', cli)

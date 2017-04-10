/*
Command-line helper.

Copyright 2017
Robin Millette <mailto:robin@millette.info>
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
const meow = require('meow')
const dotenv = require('dotenv')
const joi = require('joi')
const updateNotifier = require('update-notifier')

module.exports = function (schema, help) {
  dotenv.load()
  const keys = Object.keys(schema)
  if (typeof schema !== 'object' || !keys.length) {
    throw new Error('The schema argument is required and must be an object.')
  }

  if (!help || typeof help !== 'string') {
    throw new Error('The help argument is required and must be a string.')
  }

  schema = joi.compile(schema)

  const x = meow(help)
  const yoyo = joi.validate(Object.assign({}, process.env, x.flags), schema, { stripUnknown: true })
  if (yoyo.error) { throw yoyo.error }
  x.flags = yoyo.value
  updateNotifier({ pkg: x.pkg }).notify()
  return x
}

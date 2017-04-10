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

module.exports = function (options) {
  if (typeof options !== 'object') { throw new Error('The options argument is required and must be an object.') }
  let { schema, help, prefix, alias } = options
  const keys = schema && schema.isJoi
    ? schema._inner.children.map((x) => x.key)
    : Object.keys(schema)

  const cli = meow({ help, pkg: require(process.cwd() + '/package.json') }, { string: keys, alias })
  if (!prefix) { prefix = cli.pkg.name + '_' }
  updateNotifier({ pkg: cli.pkg }).notify()
  if (typeof schema !== 'object' || !keys.length) { throw new Error('The schema argument is required and must be an object.') }
  if (!help || typeof help !== 'string') { throw new Error('The help argument is required and must be a string.') }
  if (alias && typeof alias !== 'object') { throw new Error('The alias argument must be an object.') }
  let env = {}
  let r
  dotenv.load()
  for (r in process.env) {
    if (!r.indexOf(prefix)) { env[r.slice(prefix.length)] = process.env[r] }
  }

  schema = joi.compile(schema)
  cli.flags = joi.validate(Object.assign(env, cli.flags), schema, { stripUnknown: true, presence: 'required' })
  if (cli.flags.error) { throw cli.flags.error }
  cli.flags = cli.flags.value
  return cli
}

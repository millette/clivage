# clivage
[![Build Status](https://travis-ci.org/millette/clivage.svg?branch=master)](https://travis-ci.org/millette/clivage)
[![Coverage Status](https://coveralls.io/repos/github/millette/clivage/badge.svg?branch=master)](https://coveralls.io/github/millette/clivage?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/millette/clivage.svg)](https://gemnasium.com/github.com/millette/clivage)
> Command-line helper.

## Install
With npm:

```
$ npm install --save clivage joi
```

With yarn:

```
$ yarn add clivage joi
```

Note that ```joi``` is a peer dependency.

## Now with update-notifier
The module now uses [update-notifier][] to let the user know about updates to this program.

Users have the ability to opt-out of the update notifier by changing
the optOut property to true in ~/.config/configstore/update-notifier-[YOUR-MODULE-NAME].json.
The path is available in notifier.config.path.

Users can also opt-out by setting the environment variable NO_UPDATE_NOTIFIER
with any value or by using the --no-update-notifier flag on a per run basis.

## Usage
```js
const clivage = require('clivage')


const schema = joi.object({
  port: joi.number().integer(),
  host: joi.string().optional(),
  user: joi.string().optional(),
  pw: joi.string().optional()
})
  .with('pw', 'user')
  .with('user', 'pw')

const cli = clivate(schema)
cli.flags

//=> { port: 1234, host: 'http://localhost:5984' }
```

## API
### clivage(options)

#### options
##### schema
Type: `object (joi)`

Lorem ipsum.

##### alias
Type: `array`

##### argv
Type: `object`

Lorem ipsum.

##### help
Type: `string`

Lorem ipsum.

##### prefix
Type: `string`

Lorem ipsum.

##### envPath
Type: `string`

Lorem ipsum.

## License
AGPL-v3 © 2017 [Robin Millette](http://robin.millette.info)

[update-notifier]: <https://github.com/yeoman/update-notifier>

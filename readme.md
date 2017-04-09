# clivage
[![Build Status](https://travis-ci.org/millette/clivage.svg?branch=master)](https://travis-ci.org/millette/clivage)
[![Coverage Status](https://coveralls.io/repos/github/millette/clivage/badge.svg?branch=master)](https://coveralls.io/github/millette/clivage?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/millette/clivage.svg)](https://gemnasium.com/github.com/millette/clivage)
> Command-line helper.

## Install
```
$ npm install --save clivage
```

## Now with update-notifier
The cli now uses [update-notifier][] to let the user know about updates to this program.

Users have the ability to opt-out of the update notifier by changing
the optOut property to true in ~/.config/configstore/update-notifier-rollodeqc-gh-user-streak.json.
The path is available in notifier.config.path.

Users can also opt-out by setting the environment variable NO_UPDATE_NOTIFIER
with any value or by using the --no-update-notifier flag on a per run basis.

## Usage
```js
const clivage = require('clivage')

clivage('unicorns')
//=> 'unicorns & rainbows'
```

## API
### clivage(input, [options])
#### input
Type: `string`

Lorem ipsum.

#### options
##### foo
Type: `boolean`<br>
Default: `false`

Lorem ipsum.

## CLI
```
$ npm install --global clivage
```

```
$ clivage --help

  Usage
    clivage [input]

  Options
    --foo  Lorem ipsum. [Default: false]

  Examples
    $ clivage
    unicorns & rainbows
    $ clivage ponies
    ponies & rainbows
```


## License
AGPL-v3 © 2017 [Robin Millette](http://robin.millette.info)

[update-notifier]: <https://github.com/yeoman/update-notifier>

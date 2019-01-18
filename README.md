# inspired by [https://github.com/webpack-contrib/worker-loader](https://github.com/webpack-contrib/worker-loader)

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# worker-url-loader

inline worker loader module for webpack

## Requirements

This module requires a minimum of Node v6.9.0 and Webpack v4.0.0.

## Getting Started

To begin, you'll need to install `worker-url-loader`:

```console
$ npm install worker-url-loader --save-dev
```

### Inlined

```js
// App.js
import WorkerUrl from 'worker-url-loader!./Worker.js';
```

### Config

```js
// webpack.config.js
{
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-url-loader' }
      }
    ]
  }
}
```

```js
// App.js
import WorkerUrl from './file.worker.js';

const worker = new Worker(WorkerUrl);

worker.postMessage({ a: 1 });
worker.onmessage = function (event) {};

worker.addEventListener("message", function (event) {});

// or 
// const sharedWorker = new sharedWorker(WorkerUrl);
// sharedWorker.port.start();

```

And run `webpack` via your preferred method.

## Examples

The worker file can import dependencies just like any other file:

```js
// Worker.js
const _ = require('lodash')

const obj = { foo: 'foo' }

_.has(obj, 'foo')

// Post data to parent thread
self.postMessage({ foo: 'foo' })

// Respond to message from parent thread
self.addEventListener('message', (event) => console.log(event))
```

### Integrating with ES2015 Modules

_Note: You can even use ES2015 Modules if you have the
[`babel-loader`](https://github.com/babel/babel-loader) configured._

```js
// Worker.js
import _ from 'lodash'

const obj = { foo: 'foo' }

_.has(obj, 'foo')

// Post data to parent thread
self.postMessage({ foo: 'foo' })

// Respond to message from parent thread
self.addEventListener('message', (event) => console.log(event))
```

### Cross-Origin Policy

[`WebWorkers`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
are restricted by a
[same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy), so if
your `webpack` assets are not being served from the same origin as your
application, their download may be blocked by your browser. This scenario can
commonly occur if you are hosting your assets under a CDN domain. Even downloads
from the `webpack-dev-server` could be blocked. There are two workarounds:


## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

#### [CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

#### [MIT](./LICENSE)
# Express route generator

> ⚠️ Typescript only currently

Let the folder structure generate how the routes should be made, and avoid the boilerplate.

Dependencies:

- [express](https://www.npmjs.com/package/express)
- [glob](https://www.npmjs.com/package/glob)

```javascript
import express from 'express'
import RouteHandler from '@gijslaarman/express-auto-routing'

const app = express()

// Routes
const routeMap = __dirname + '/routes'
app.use('/', new RouteHandler(routeMap).Router())

app.listen(3000, () => console.log('Server running'))
```

## Installation

`$ npm install @gijslaarman/express-auto-routing`

## How to use

```javascript
// Setup express per usual
const express = require('express')
const app = express()

// Import the RouteHandler from this package:
import RouteHandler from '@gijslaarman/express-auto-routing'

// Set a map you want your routes be based off
const routeMap = __dirname + '/routes' // Currently the absolute path with `__dirname` is needed.

// Initialise the router
const autoRouter = new RouteHandler(routeMap).Router()

// Let express route through the generated routes
app.use('/', autoRouter)
```

## Folder structuring

```
| routes/
| - index.ts  // Will change into the index, '/'
| - app.ts  // Will change the route into the filename, '/app'
| - nested/
| --- index.ts // Route: '/nested/'
| --- [slug].ts // Route: '/:slug/', slug accessible with `req.params.slug`
| --- nest.ts // Route: '/nested/nest'
| - _underscore.ts // Will be ignored, could be used for extended functions etc.
```

## Setting up the routes handler

```javascript
// index.ts

import { Handler } from 'express'

const handle: Handler = (req, res) => {
  if (req.method === 'POST') {
    // Do something if it's a post request
    res.send('received your post request')
  } else {
    // Do something if it's another method type
    res.send('hello this is API')
  }
}

export default handle
```

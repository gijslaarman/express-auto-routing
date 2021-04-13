# Express route generator

Let the folder structure generate how the routes should be made, and avoid the boilerplate.

Dependencies:

- [express](https://www.npmjs.com/package/express)
- [glob](https://www.npmjs.com/package/glob)

```javascript
import express from 'express'
import AutoRouter from 'express-auto-routing'

const app = express()

// Initialize what folder should be used
const routesFolder = './routes'
new AutoRouter(routesFolder, app)

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
const AutoRouter = require('express-auto-routing')

// Set a map you want your routes be based off
const routeMap = './routes'

// Initialise the router
new AutoRouter(routeMap, app)
```

## Folder structuring

```
| routes/
| - index.ts  // Will change into the index, '/'
| - app.ts  // Will change the route into the filename, '/app'
| - nested/
| --- index.ts // Route: '/nested/'
| --- [slug].ts // Route: '/nested/:slug/', slug accessible with `req.params.slug`
| --- nest.ts // Route: '/nested/nest'
| - _underscore.ts // Will be ignored, could be used for extended functions etc.
```

## Setting up the routes handler

```javascript
// index.ts

export const get = (req, res) => {
  res.send('Hello world!')
}

export const post = (req, res) => {
  // Do post stuff
  res.send('done posting!')
}

export const Delete = (req, res) => {
  // Delete needs a capital since 'delete' is a reserved keyword. All methods can be written in Capitalization or FULL CAPS if you please.
  res.send('probably deleted some stuff')
}

// Typescript:
import { Handler } from 'express'

export const get: Handler = (req, res) => {
  res.send('Hello world!')
}
```

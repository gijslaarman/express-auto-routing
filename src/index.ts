import { Express } from 'express'
import path from 'path'
import glob from 'glob'

export class RouteHandler {
  private folder: string
  private app: Express

  constructor(folderLocation: string, app: Express) {
    // @ts-ignore
    this.folder = path.resolve(require.main?.path, folderLocation)
    this.app = app
    this.bindRoutes()
  }

  private createEndpoints(routes: string[]) {
    return routes.map((route) => {
      return route
        .replace(this.folder, '')
        .replace('index.ts', '')
        .replace('.ts', '')
        .replace(/\[[\w]+\]/g, (match) => ':' + match.replace(/[\[\]]/g, ''))
    })
  }

  private bindRoutes() {
    glob(
      `${this.folder}/**/[!_]*.ts`,
      (error: Error | null, routes: string[]) => {
        if (error) throw error
        const endpoints = this.createEndpoints(routes)

        routes.forEach((route, index) => {
          const methods = require(route)
          const endpoint = endpoints[index]

          Object.keys(methods).forEach((method: string) => {
            // @ts-ignore
            this.app[method.toLowerCase()](endpoint, methods[method])
          })
        })
      }
    )
  }
}

export default RouteHandler

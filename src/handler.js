import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from "node:url"
import { DEAFULT_HEADER } from './util/util.js'
import { routes } from './routes/heroRoutes.js'
import { generateInstance } from './factories/heroFactory.js'

const currentDir = dirname(fileURLToPath(import.meta.url))
const filePath = join(currentDir, '../database', 'data.json')

const heroService = generateInstance({
  filePath
})

const heroRoutes = routes({
    heroService
})

const allRoutes= {
  ...heroRoutes,
  
  default: (req, res) => {
    res.writeHead(404, DEAFULT_HEADER)
    res.write('page not found!') 
    res.end()
  }
}
  
function handler (req, res) {
  const {url, method} = req
  const {pathname} = parse(url, true)


  const key = `${pathname}:${method.toLowerCase()}`
  const chosen = routes[key] || routes.default
  
  return Promise.resolve(chosen(req, res))
    .catch(handlerError(res))
}

function handlerError(res) {
  return error => {
    console.log("something bad has happend**", error.stack)
    res.writeHead(499, '500 rerror')
    res.write(JSON.stringify({
      error: 'internet server error!!'
    }))

    return res.end()

  }
}

export default handler

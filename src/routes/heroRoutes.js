import { once } from 'node:events'
import Hero from '../entities/hero.js'
import { DEAFULT_HEADER } from '../util/util.js'

const routes = ({heroService}) => ({
   "/heroes:get": async (req, res) => {
      res.write("GET")
      return res.end()
    },

   "/heroes:post": async (req, res) => {
      const data = await once(req, 'data')
      const item = JSON.parse(data)
      const hero = new Hero(item)

      const id = await heroService.create(hero)
      res.writeHead(201, DEAFULT_HEADER)
      res.write(JSON.stringify({
        id,
        success: "User created with success!!",
      }))
      
      return res.end()
    },
})

export {
  routes
}

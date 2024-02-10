import GameController from 'App/Controllers/Http/GameController'
import InviteController from 'App/Controllers/Http/InviteController'
import Ws, { WebsocketPayload } from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.on('poke', async (data) => {
    console.log('poked')
  })

  socket.on('game:create', async (websocketPayload: WebsocketPayload) => {
    await new GameController().create(websocketPayload)
  })

  socket.on('game:delete', async (websocketPayload: WebsocketPayload) => {
    await new GameController().delete(websocketPayload)
  })

  socket.on('invite:list', async () => {
    await new InviteController().wsList()
  })
})

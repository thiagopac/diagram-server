import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Game from 'App/Models/Game'
import Invite from 'App/Models/Invite'
import Ws from 'App/Services/Ws'

export default class GameController {
  public async list({ response }: HttpContextContract) {
    try {
      const games = await Game.query().orderBy('id', 'desc')
      return games
    } catch (error) {
      return response.notFound(error.message)
    }
  }

  public async create(payload: any) {
    try {
      const newGame = await Game.createGame(payload.data.owner)
      const createdGame = await Game.query().where('uuid', newGame!.uuid).firstOrFail()
      await Invite.createInvite(payload.data.pairingKey, createdGame!.id)
      const invites = await Invite.query().preload('game').orderBy('id', 'desc')
      Ws.io.emit('invite:listed', { data: invites })

      return newGame
    } catch (error) {
      throw new Error('Error creating game')
    }
  }

  public async delete(payload: any) {
    try {
      await Game.deleteGame(payload.data.pairingKey)
      Ws.io.emit('game:deleted')
      return true
    } catch (error) {
      throw new Error('Error deleting game')
    }
  }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Invite from 'App/Models/Invite'
import Ws from 'App/Services/Ws'

export default class InviteController {
  public async list({ response }: HttpContextContract) {
    try {
      return await Invite.query().orderBy('id', 'desc')
    } catch (error) {
      return response.notFound(error.message)
    }
  }

  public async wsList() {
    try {
      const invites = await Invite.query().preload('game').orderBy('id', 'desc')
      Ws.io.emit('invite:listed', { data: invites })
    } catch (error) {
      Ws.io.emit('invite:error', { data: error })
    }
  }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User"

export default class AuthController {

  public async register({ request, response }: HttpContextContract) {

    const data = request.only(['username', 'email', 'password'])

    try {

      const user = await User.create(data)
      return response.status(200).json({ status: true, user})

    } catch (error) {
      
      if (error.code == 'SQLITE_CONSTRAINT') {
        return response.json({ status: false, error: 'User with existing username or email!'})
      }

      return response.json({ status: false, error: error})
    }

  }

  public async login({ request, response, auth }: HttpContextContract) {

    const { uid, password } = request.only(['uid', 'password'])

    try {
      let token = await auth.use('api').attempt(uid, password, {
        expiresIn: '1day'
      })
      return response.json({ status: true, token })
    } catch (error) {      
      return response.json({ status: false, error: 'Your name, email or password are incorrect!' })
    }

  }

  public async user({ response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()
    return response.status(200).json({ status: true, user: auth.use('api').user!.toJSON()})
  }

}

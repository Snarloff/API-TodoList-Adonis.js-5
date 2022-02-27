import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {

  public async index({ response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const userId = auth.use('api').user!.id
    const tasks = await Task.query().where('user_id', userId || '').orderBy('id', 'desc')
    
    return response.status(200).json({ status: true, tasks })
  }

  public async store({ response, request, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const userId = auth.use('api').user!.id
    const data = request.only(['title', 'description'])    

    try {
      await Task.create({ user_id: userId,...data })
      return response.status(200).json({ status: true, message: 'Task added successfully!' })
    } catch (error) {
      return response.badRequest({ status: false, error })
    }

  }

  public async destroy({ response, params }: HttpContextContract) {

    const id = params.id
    const task = await Task.findOrFail(id)

    await task.delete()
    return response.status(200).json({ status: true, message: 'The task was successfully removed!' })

  }

  public async status({ response, request }: HttpContextContract) {

    /*
      TODO: Add another where checking if the user_id matches the task id
    */

    const id = request.param('id')
    const status = request.param('status')
    
    const task = await Task.findOrFail(id)
    await task.merge({ status }).save()

    return response.status(200).json({ status: true, message: 'Status has been changed successfully!' })

  }

  public async edit({ response, request }: HttpContextContract) {

    const { title, description, id } = request.only(['title', 'description', 'id'])

    const task = await Task.findOrFail(id)
    await task.merge({ title, description }).save()
    
    return response.status(200).json({ status: true, message: 'The task was successfully edited!' })

  }

}

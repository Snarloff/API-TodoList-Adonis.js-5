/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/dashboard', 'TasksController.index')

Route.group(() => {
  Route.post('create', 'TasksController.store').as('task.store')
  Route.put('edit', 'TasksController.edit').as('task.edit')
  Route.put('status/:id/:status', 'TasksController.status').as('task.status')
  Route.delete('remove/:id', 'TasksController.destroy').as('task.destroy')
  Route.get('tasks', 'TasksController.index')
}).prefix('api/v1/task')

Route.group(() => {
  Route.post('register', 'AuthController.register').as('auth.register')
  Route.post('login', 'AuthController.login').as('auth.login')
  Route.post('user', 'AuthController.user').as('auth.user')
}).prefix('api/v1/auth')
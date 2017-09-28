'use strict'

const Validator = use('Validator')
const User = use('App/Model/User')
const Profile = use('App/Model/Profile')
const Hash = use('Hash')

class UserController {

  * index(request, response) {
    const users = yield User.all()
    const date = Date.now()
    const hashing = yield Hash.make(date.toString()) 
    const user_session = yield request.session.get('userHash')
    if (!user_session){
      yield request.session.put('userhash', hashing)
    }

    yield response.sendView('users/index', { users: users.toJSON() })
  }

  * create(request, response) {
    yield response.sendView('users/create')
  }

  * store(request, response) {
    const postData = request.only('username', 'password', 'email') 

    const rules = {
      username: 'required',
      password: 'required',
      email: 'required'
    }

    const validation = yield Validator.validate(postData, rules) 

    if (validation.fails()) {
      yield request
        .withOnly('username', 'email', 'password')
        .andWith({ errors: validation.messages() })
        .flash() 

      response.redirect('back')
      return
    }

    yield User.create(postData) 
    response.redirect('/user')
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    const id = request.param('id')
    const user = yield User.find(id)
    const profile = yield user.related('profile').load()
    yield response.sendView('users/edit', { user: user.toJSON() })
  }

  * update(request, response) {
    const id = request.param('id')
    const params_profile = request.all().profile
    const user = yield User.find(id)
    const exist_profile = yield Profile.findBy('user_id', id)
    const profile = exist_profile || new Profile()
    profile.name = params_profile.name
    profile.number_phone = params_profile.number_phone
    profile.age = params_profile.age
    profile.gender = params_profile.gender
    profile.address = params_profile.address
    yield user.profile().save(profile)

    response.redirect('/user')
  }

  * destroy(request, response) {
    //
  }

  * login (request, response) {
    const email = request.input('email')
    const password = request.input('password')
    const login = yield request.auth.attempt(email, password) 

    if (login) {
      response.send('Logged In Successfully')
      return
    }

    response.unauthorized('Invalid credentails')
  }

  * profile (request, response) {
    const user = yield request.auth.getUser()
    
    if (user) {
      response.ok(user)
      return
    }
    response.unauthorized('You must login to view your profile')
  }


}

module.exports = UserController

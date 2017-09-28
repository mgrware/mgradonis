'use strict'
const User = use('App/Model/User')
const Profile = use('App/Model/Profile')
const Hash = use('Hash')

class HomeController {

  * index(request, response) {
    const users = yield User.all()
    const date = Date.now()
    const hashing = yield Hash.make(date.toString()) 
    const user_session = yield request.session.get('userHash')
    if (!user_session){
      yield request.session.put('userhash', hashing)
    }

    yield response.sendView('welcome', { users: users.toJSON() })
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    //
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    //
  }

}

module.exports = HomeController

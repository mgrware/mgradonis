'use strict'

const Schema = use('Schema')

class ProfilesTableSchema extends Schema {

  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.integer("user_id")
      table.string("name")
      table.string("number_phone")
      table.integer("age")
      table.string("gender")
      table.text("address")
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }

}

module.exports = ProfilesTableSchema

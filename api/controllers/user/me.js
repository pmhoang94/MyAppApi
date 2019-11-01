const { JWT } = require('jose')
module.exports = {
  friendlyName: 'Me',

  description: 'Me user.',

  inputs: {
    token: { type: 'string' }
  },

  exits: {},

  fn: async function(inputs, exits) {
    let authorization = this.req.headers.authorization
    let decode = JWT.decode(authorization)
    return exits.success(decode)
  }
}

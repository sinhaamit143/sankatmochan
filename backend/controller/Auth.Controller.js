const createError = require('http-errors')
const User = require('../Models/User.Model')
const Role = require('../Models/Role.Model')
const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
} = require('../helpers/jwt_helpers')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

module.exports = {

    register: async (req, res, next) => {
        try {
          const result = req.body
          result.created_at = Date.now()
          result.updated_at = Date.now()
          result.created_by = req.user ? req.user.username : 'unauth'
          result.updated_by = req.user ? req.user.username : 'unauth'
          result.is_approved = true
        //   const role = await Role.findOne({name:"User"}, {_id:1})
        //   result.role = role._id
          const doesExist = await User.findOne({ email: result.email })
          if (doesExist)
          throw createError.Conflict(`${result.email} is already been registered`)
          console.log(result)
          const user = new User(result)
          const savedUser = await user.save()
          const accessToken = await signAccessToken(savedUser.id)
          const refreshToken = await signRefreshToken(savedUser.id)
    
          res.send({ accessToken, refreshToken, success: true, msg: "User created successfully" })
        } catch (error) {
          if (error.isJoi === true) error.status = 422
          next(error)
        }
      },

    login: async (req, res, next) => {
        try {
            const result = req.body
            let user = {}
            if (result) {
                user = await User.findOne({ email: result.email })
                if (!user) {
                    throw createError.NotFound('User not registered')
                }
            } else {
                throw createError.NotAcceptable('No query Data')
            }
            const isMatch = await user.isValidPassword(result.password)
            if (!isMatch)
                throw createError.NotAcceptable('Username/password not valid')
            const accessToken = await signAccessToken(user.id)
            const refreshToken = await signRefreshToken(user.id)
            const userDataSend = {
                id: user._id,
                name:user.name,
                email: user.email,
            }
            res.send({ success: true, msg: 'Login Successfull', accessToken, refreshToken, user: userDataSend })
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Invalid Email/Password'))
            next(error)
        }
    },

}
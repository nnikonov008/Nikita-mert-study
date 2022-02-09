// Middleware позволяет перехватывать данные и делать логику, которую мы хотим описать

const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {

    //   просто проеряет доступность сервера
  if (req.method === 'OPTIONS') {
    return next()
  }

//   далее
  try {

    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' })
    }

    // раскодируем токен
    // Нужно укажзать тот секретный ключ, который я создавал в default.json = jwtSecret
    const decoded = jwt.verify(token, config.get('jwtSecret')) 
    req.user = decoded
    next()

  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' })
  }
}

import {createContext} from 'react'

// просто пустая функция, которая ничгео не делает
function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
})

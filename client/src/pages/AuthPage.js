import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading,request, error, clearError} = useHttp()
  const[form, setForm]=useState({
    email: "", password: ""
  })

  // Обработка ошибок
  useEffect(() => {
    // console.log("Error", error);
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  // на самом деле этообертка реакта над event-ом
  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async() => {
    try{
      const data = await request("/api/auth/register", "POST", {...form})
      message(data.message)
      // console.log("Data", data);
    }catch (e){} 
    //  catch осталяем пустым так, как мы его уже получили в хуке useHttp
  }

  const loginHandler = async() => {
    try{
      const data = await request("/api/auth/login", "POST", {...form})
      // message(data.message)
      auth.login(data.token, data.userId)
      
    }catch (e){} 
    
  }

  // запросы на сервер

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Авторизация</span>
          <div>

          <div className="input-field">
            <input 
            placeholder="Введите e-mail" 
            id="email" 
            type="text"
            name='email'
            className='yellow-input'
            value={form.email}
            onChange={changeHandler}
            />
            {/* <label for="email">email</label> */}
          </div>

          <div className="input-field">
            <input 
            placeholder="Введите пароль" 
            id="password" 
            type="password"
            name='password'
            className='yellow-input'
            value={form.password}
            onChange={changeHandler}
            />
            {/* <label for="email">Пароль</label> */}
          </div>

          </div>
        </div>
        <div className="card-action">
          <button 
          className='btn yellow darken-4' 
          style={{marginRight: 10}}
          disabled={loading}
          onClick={loginHandler}
          >
          Войти
          </button>
          {/* лучше переносить в style css*/}
          <button 
          className='btn grey lighten-1 black-text'
          onClick={registerHandler}
          disabled={loading}
          >
          Регистрация
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}

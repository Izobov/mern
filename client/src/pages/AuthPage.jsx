import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../contexst/AuthContext'

export const AuthPage = () =>{
   const auth= useContext(AuthContext)
    
    const [form, setForm]=useState({
        email:'', password:''
    })
    const {loading, error, request, clearError} = useHttp()

    const changeHandler =e=>{
        setForm({...form, [e.target.name]:e.target.value})
    }

    const message =useMessage()
    useEffect(()=>{
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(()=>{
        window.M.updateTextFields()
    },[])

    const registerHandler =async ()=>{
        try {
            const data = await request('/api/auth/register', "POST", {...form})// чтобы отправлять запросы на порт 5000 в package.jason пишем "proxy":"http://localhost:5000",
           console.log(data)
            message(data.message)
        } catch (e){

        }
    }
    const loginHandler =async ()=>{
        try {
            const data = await request('/api/auth/login', "POST", {...form})// чтобы отправлять запросы на порт 5000 в package.jason пишем "proxy":"http://localhost:5000",
           auth.login(data.token, data.userId)
        } catch (e){

        }
    }

    return <div className="row">
       <div className="col s6 offset-s3">
           <h1>short the link</h1>
           <div className="row">
                <div className="col s12 m6">
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Authorization</span>
                            <div>
                                <div className="input-field ">
                                     <input className="yellow-input" placeholder="Enter email" id="email" 
                                     onChange={changeHandler}
                                     value={form.email}
                                     type="text" name="email" />
                                     <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field ">
                                     <input className="yellow-input" placeholder="Enter password" id="password" 
                                     onChange={changeHandler}
                                     value={form.password}
                                     type="password" name="password"  />
                                     <label htmlFor="password">Password</label>
                                </div>
                                    
                            </div>
                            
                        </div>
                        <div className="card-action">
                            <button className="btn yellow darken-4 mr10"
                                disabled={loading} 
                                onClick={loginHandler}
                            >Login</button>
                            <button className="btn grey lighten-1 black-text" onClick={registerHandler}
                                disabled={loading}
                            >Sign in</button>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </div>
}
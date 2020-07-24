import React ,{ useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useContext } from 'react'
import { AuthContext } from '../contexst/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = () =>{
    const history= useHistory()
    const auth = useContext(AuthContext)
    const[link, setLink]=useState('')
    const {request} = useHttp()
    const pressHandler =async e=>{
        if(e.key=== "Enter"){
            try{
               const data = await request('/api/link/generate', "POST", {from: link}, {
                   Authorization: `Bearer ${auth.token}`
               })
                history.push(`/detail/${data.link._id}`)
            } catch (e){

            }
        }
    }
    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    return <div className="row">
       <div className="col s8 offset-s2" style={{paddingTop: "2rem"}} >
            <div className="input-field ">
                <input  placeholder="Link" id="link" 
                // onChange={changeHandler}
                type="text" 
                value={link}
                onChange={e=>setLink(e.target.value)}
                onKeyPress={pressHandler}
                />
                <label htmlFor="link">Enter your link</label>
            </div>
       </div>
    </div>
}
import React, { useState, useCallback, useContext, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../contexst/AuthContext'
import { Loader } from '../components/Loader'
import { Link } from '../components/LinkCard'

export const DetailPage = () =>{
    const [link, setLink] =useState(null)
    const auth= useContext(AuthContext)
    const {request, loading} = useHttp()
    const linkId  = useParams().id

    const getLink= useCallback(async()=>{
        try{
            const fetched = await request (`/api/link/${linkId}`, "GET", null,{
                Authorization: `Bearer ${auth.token}`
            })
            setLink(fetched)
        } catch (e){

        }
    }, [auth.token, linkId, request])
    
    useEffect(()=>{
        getLink()
    },[getLink])

    if(loading){
        return <Loader/>
    }
    return <>
        <h1>Link Detail Page</h1>
        {!loading && link && <Link link={link}/>}
    </>
}
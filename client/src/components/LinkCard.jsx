import React from 'react'

export const Link = ({link})=>{
    return <>
        <p>Shorted: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
        <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
        <p>Clicks count: <strong>{link.clicks}</strong> </p>
        <p>Created at: <strong>{new Date (link.date).toLocaleDateString()}</strong> </p>
        
    </>
}
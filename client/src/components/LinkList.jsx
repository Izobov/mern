import React from 'react'
import { NavLink } from 'react-router-dom'

export const LinkList = ({links})=>{
   if(!links.length){
       return <p className="center">No links yet</p>
   }
   return <>
         <table className="striped">
        <thead>
          <tr>
              <th>Shorted link</th>
              <th>Original link</th>
              <th>Clicks count</th>
              <th>Details</th>
          </tr>
        </thead>

        <tbody>
          
            {links.map(i=>{
               return <tr key={i._id} >
                <td >
                    <a  href={i.to}  target="_blank" rel="noopener noreferrer">{i.to}</a>
                </td>
                <td >
                    <a  href={i.from}  target="_blank" rel="noopener noreferrer">{i.from}</a>
                </td>
                <td >
                    {i.clicks}
                </td>
                <td > 
                    <NavLink to={`/detail/${i._id}`}  >show detail</NavLink>
                </td>
               
              </tr>
               
            })}
        </tbody>
      </table>
        
  
    </>
}
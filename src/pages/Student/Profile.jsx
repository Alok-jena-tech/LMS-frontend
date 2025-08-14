import React from 'react'
import { useAuth } from '../../hooks/useAuth'
const Profile = () => {
    const {user}=useAuth()
  return (
    <div>
       {/* <h1>{user?.Role==="Admin" ? ("Admin"):("User")}</h1>  */}
     <h1>welcome{user?.Full_name}</h1> 
    </div>
  )
}

export default Profile

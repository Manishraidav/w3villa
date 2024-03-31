import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./login.css"
import userimage from "./photo/admin.jpg"
import passwordimage from "./photo/password.png"

export default function Login(prop) {
 
  const [name_email,update_name_email]=useState("")
  const [login_user_password,update_login_user_password]=useState("")

  const logineventhandler= async()=>{
  
 
 const userdata= await  fetch("http://localhost:4000/",{
  method:"GET"
})
.catch((err)=>console.log(err))

const stored_data= await userdata.json() 

const val=stored_data.filter((e)=>
  name_email===e.email && login_user_password===e.password
)

if (val.length!==0){alert("sucess") 
localStorage.setItem("user",JSON.stringify(val[0]))
window.location.assign("/application")}
else(alert("invalid user"))




     
  }


  return (
    <div>
        <div className='login_container'>
            <div className='login_main'>
                <div>
                <p style={{fontSize:"25px",color:"#150276"}}>LOGIN</p>

                 <div className='login_input'>
                    <img className='login_image' src={userimage}  alt={userimage} />
                    <input type="text" placeholder='Username / Email' value={name_email} onChange={(e)=>{update_name_email(e.target.value)}} />
                 </div>

                 <div className='login_input'>
                    <img className='login_image' src={passwordimage} alt=''/> 
                    <input type="text" placeholder='Password' value={login_user_password} onChange={(e)=>{update_login_user_password(e.target.value)}} />
                 </div>
                 <button className='login_button' onClick={()=>{logineventhandler()}}>Login</button>
                 <div className='pass_register'>
                     <p className='forgetpassword'>Reset Your Password? </p>
                     <p className='signup'><Link to={"/"}>signup</Link></p>
                 </div>
                </div>


            </div>

        </div>
      
    </div>
  )
}

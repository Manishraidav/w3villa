import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import userimage from "./photo/admin.jpg"
import emailphoto from "./photo/email.jpg"
import passwordimage from "./photo/password.png"
import "./register.css"

export default function Register(prop) {

   const [reg_first_name,update_reg_first_name]=useState("")
   const [reg_last_name,update_reg_last_name]=useState("")
   const [reg_email,update_reg_email]=useState("")
   const [reg_password,update_reg_password]=useState("")
   const [reg_confirmpassword,update_reg_confirmpassword]=useState("")

   const registereventhandler=()=>{
      if(reg_first_name!==""){
         if(reg_last_name!==""){
            if(reg_email!==""){
               if(reg_password!==""){
                  if(reg_confirmpassword!==""){
                     if(reg_confirmpassword===reg_password){
                        
                        const persondetail={
                           firstname:reg_first_name,
                           lastname:reg_last_name,
                           email:reg_email,
                           password:reg_password
                        }
                        prop.collect_detail(persondetail)
                        console.log(persondetail)

                        fetch("http://localhost:4000/",{
                           method:"POST",
                           body:JSON.stringify(persondetail),
                           headers:{
                              'content-type':'application/json'
                           }
                        })
                        .then((data)=>console.log(data)).catch((error)=>console.log(error))
                        
                        localStorage.setItem("user",JSON.stringify(persondetail))



                        alert("Register succesfull")
                        update_reg_first_name("")
                        update_reg_last_name("")
                        update_reg_email("")
                        update_reg_confirmpassword("")
                        update_reg_password("")

                     }
                     else{alert("password and confirm passworn not match")}
                  }else(alert("enter confirm password"))
               }else(alert("enter password"))
            }else(alert("field can't be blank"))
         }else(alert("field can't be blank"))
      }else(alert("field can't be blank"))
   }
  return (
    <div>
        <div className='register_container'>
            <div className='register_main'>
                <div>
                <p style={{fontSize:"25px",color:"#150276"}}>REGISTER</p>

                 <div className='register_input'>
                    <img className='register_image' src={userimage}  alt=''/>                 
                    <input type="text" placeholder='First Name' value={reg_first_name} onChange={(e)=>{update_reg_first_name(e.target.value)}} />                                          
                 </div>

                 <div className='register_input'>
                    <img className='register_image' src={userimage}  alt=''/>
                    <input type="text" placeholder='Last Name' value={reg_last_name}  onChange={(e)=>{update_reg_last_name(e.target.value)}}/>
                 </div>

                 <div className='register_input'>
                    <img className='register_image' src={emailphoto} alt=''/> 
                    <input type="Email" placeholder='Email' value={reg_email}  onChange={(e)=>{update_reg_email(e.target.value)}}/>
                 </div>

                 <div className='register_input'>
                    <img className='register_image' src={passwordimage} alt=''/> 
                    <input type="text" placeholder='Password' value={reg_password}  onChange={(e)=>{update_reg_password(e.target.value)}}/>
                 </div>

                 <div className='register_input'>
                    <img className='register_image' src={passwordimage} alt=''/> 
                    <input type="text" placeholder='Confirm Password' value={reg_confirmpassword} onChange={(e)=>{update_reg_confirmpassword(e.target.value)}}/>
                 </div>

                 <button className='register_button' onClick={()=>{registereventhandler()}}>Register Now</button>
                 <p className='alreadyaccount'><Link to="/login"> Already have an account?</Link></p>
                 
                </div>


            </div>

        </div>
      
    </div>
  )
}

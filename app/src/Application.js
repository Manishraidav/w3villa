import React, { useEffect, useState } from 'react'
import "./Application.css"

function Application() {
    const [name,newName] = useState("")
    const [data,newdata]=useState("")                                     
    const [DataList,NewData_list]=useState([])                                   //// all stored data
    const [edit,editsave]=useState("")
    const[dipidency,changedepidency]=useState(0)
    const[dipidency1,changedepidency1]=useState(10)
    
    



    const submitEventHandler=async()=>{
        const id=Math.random()
        const data2= localStorage.getItem("user")
        const email=JSON.parse(data2).email
    
        fetch("http://localhost:4000/data",{
            method:"POST",
            body:JSON.stringify({data,data_id:id,data_tag:"hide",unique_user:email}),
            headers:{
               'content-type':'application/json'
            }
         }).then((res)=>res.json())
         .then((data)=>console.log())
         .catch((err=>console.log(err)))

         changedepidency(dipidency+1)
         changedepidency1(dipidency+1)
         
        
    }
   

    const DeleteHandle=(id)=>{
        fetch("http://localhost:4000/deletedata",{
            method:"POST",
            body:JSON.stringify({id}),
            headers:{
               'content-type':'application/json'
            }
         }).then((res)=>res.json())
         .then((data)=>console.log(data))
         .catch((err=>console.log(err)))
         changedepidency(dipidency+1)
         changedepidency1(dipidency+1)
        
    }








    const EditEventHandler=(id,condition)=>{
        if(condition==="hide"){
            const newlist=DataList.map((data)=>
        (id===data.data_id)? {...data,data_tag:"show"} : data)                       ///for edit data within line
        NewData_list(newlist)
        }

        else if(condition==="show"){
            fetch("http://localhost:4000/change_data",{
                method:"POST",
                body:JSON.stringify({id,condition,edit}),
                headers:{
                    "content-type":"application/json"
                }
            })
            changedepidency(dipidency+1)
            changedepidency1(dipidency+1)

        
        }
        }
        useEffect(()=>{
            const fetchdata = async()=>{
                const data2= localStorage.getItem("user")
                const email=JSON.parse(data2).email
                
               
               fetch("http://localhost:4000/fetchdata",{
               method:"POST",
               body:JSON.stringify({email}),
               headers:{
                  'content-type':'application/json'
               }
            }).then((res)=>res.json())
               .then((data)=>NewData_list(data))
               .catch((err)=>{})
            }
            fetchdata()
        },[dipidency,dipidency1])

     


useEffect(()=>{
    const User = localStorage.getItem("user")
    const User1  = JSON.parse(User).firstname
    newName(User1)
},[name])
        

  

 
    


  
  return (
    <div>
        <div style={{display:"flex",width:"100%",alignItems:"center", justifyContent:"center"}}>
            <p style={{fontSize:"20px", color:"blue"}}>Hi {name}</p>
            <button onClick={()=>{localStorage.removeItem("user");window.location.assign("/")}} style={{height:"20px", marginLeft:"15px"}}>logout</button>
        </div>
          <div className='application'>
             <div className='main_container'>
                <div className='input_button'>
                    <div>
                    <input type='text' placeholder='Add new text... ' value={data} onChange={(e)=>newdata(e.target.value)}/>
                    <button onClick={submitEventHandler}>ADD</button>
                    </div>
                </div>
                <hr/>
                
                
                <div className='list'>
                    

                    {
                        DataList.map((data,key)=>{return(
                            <div>
                            <p>{data.data}</p>
                            <input className={data.data_tag} onChange={(e)=>editsave(e.target.value)} type='text'/>
            
                            <div>
                                <button className='edit' onClick={()=>EditEventHandler(data.data_id,data.data_tag)}>edit</button>
                                <button className='delete' onClick={()=>DeleteHandle(data.data_id)}>delete</button>
                                
                            </div>
                        </div>

                        )})
                    }
                </div>

             </div>
            
         
          </div>
      
    </div>
  )
}

export default Application




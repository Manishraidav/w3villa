import React, { useState } from 'react'
import "./Application.css"

function Application() {
    const [data,newdata]=useState("")                                     
    const [DataList,NewData_list]=useState([])                                   //// all stored data
    const [edit,editsave]=useState("")
    // const[dipidency,changedepidency]=useState(0)
    // const[dipidency1,changedepidency1]=useState(10)
    
    
    


    // useEffect(()=>{
    //     async function fetchdata(){
    //         const data=await fetch("http://localhost:4000/data",{
    //         method:"GET"
    //     })
        
    //     const newdata=await data.json()
    //     NewData_list(newdata)
    //     }
    //     fetchdata()

    // },[dipidency,dipidency1])

  
   
    // const submitEventHandler= async()=>{
    //     if(data!==""){
    //         NewData_list([...DataList,{data,data_id:Math.random(),condition:"hide"}]) 
    //         newdata("")   
    //     }           
       
     
        
    //    }
    // const DeleteHandle=(id)=>{
        
    //     const newlist=DataList.filter((data)=>data.data_id!==id)                   //// for delete one list
    //     NewData_list(newlist)

    // }



    const submitEventHandler=async()=>{
        const id=Math.random()
        const data2= localStorage.getItem("user")
        const email=JSON.parse(data2).email
        console.log(email)
        fetch("http://localhost:4000/data",{
            method:"POST",
            body:JSON.stringify({data,data_id:id,data_tag:"hide",unique_user:email}),
            headers:{
               'content-type':'application/json'
            }
         }).then((res)=>res.json())
         .then((data)=>console.log())
         .catch((err=>console.log(err)))

        //  changedepidency(dipidency+1)
        //  changedepidency1(dipidency+1)
         
        
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
        //  changedepidency(dipidency+1)
        //  changedepidency1(dipidency+1)
        
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
            // changedepidency(dipidency+1)
            // changedepidency1(dipidency+1)

        
        }
        }

        const showdata=async()=>{
            const data2= localStorage.getItem("user")
             const email=JSON.parse(data2).email
             console.log({email})
            
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




        

    

 
    


  
  return (
    <div>
          <div className='application'>
             <div className='main_container'>
                <div className='input_button'>
                    <div>
                    <input type='text' placeholder='Add new text... ' value={data} onChange={(e)=>newdata(e.target.value)}/>
                    <button onClick={submitEventHandler}>ADD</button>
                    </div>
                </div>
                <hr/>
                <button onClick={showdata}>show</button>
                
                
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



// if(data!==""){
//     const id=Math.random()
//     newdata("")
//     await fetch("http://localhost:2000/",{
//         method:"POST",
//         body:JSON.stringify({data,data_id:id,data_tag}),
//         headers:{
//           'content-type':'application/json'
//         }
        
//       })
      
      
//   }


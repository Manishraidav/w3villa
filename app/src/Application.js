import React, { useState } from 'react'
import "./Application.css"

function Application() {
    const [data,newdata]=useState("")                                     
    const [DataList,NewData_list]=useState([])                                   //// all stored data
    const [edit,editsave]=useState("")
   
    const submitEventHandler= async()=>{
        if(data!==""){
            NewData_list([...DataList,{data,data_id:Math.random(),condition:"hide"}]) 
            newdata("")   
        }           
       
     
        
       }
    const DeleteHandle=(id)=>{
        
        const newlist=DataList.filter((data)=>data.data_id!==id)                   //// for delete one list
        NewData_list(newlist)

    }

    const EditEventHandler=(id,condition)=>{
        if(condition=="hide"){
            const newlist=DataList.map((data)=>
        (id===data.data_id)? {...data,condition:"show"} : data)                       ///for edit data within line
        NewData_list(newlist)
        }

        else if(condition==="show"){
            const newlist=DataList.map((data)=>
        (id===data.data_id)? {...data,data:edit,condition:"hide"} : data)
        NewData_list(newlist)

        
        }
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
                
                <div className='list'>
                    

                    {
                        DataList.map((data)=>{return(
                            <div>
                            <p>{data.data}</p>
                            <input className={data.condition} onChange={(e)=>editsave(e.target.value)} type='text'/>
            
                            <div>
                                <button className='edit' onClick={()=>EditEventHandler(data.data_id,data.condition)}>edit</button>
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


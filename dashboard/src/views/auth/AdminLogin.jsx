import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { admin_login ,messageClear} from "../../store/Reducers/authReducer";
import { PropagateLoader} from 'react-spinners';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";




 const AdminLogin = () => {

    const navigate = useNavigate()
     
    const dispatch = useDispatch()
    const {loader,errorMessage,successMessage} = useSelector(state=>state.auth)
    const [state, setState]= useState({
    
        email:"",
        password:""
    })
    const inputHandle=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        }
        )

    }

    const submit =(e)=>{
        e.preventDefault()
        dispatch(admin_login(state))
        console.log(state)
    }

    const overrideStyle={
        display:'flex',
        height:'25px',
        
        justifyContent:'center',
        alignItems:'center'


    }



useEffect (()=>{
    if(errorMessage){
        toast.error(errorMessage)
        dispatch(messageClear())
    }
    if(successMessage){
        toast.success(successMessage)
        dispatch(messageClear())
        navigate('/')
    }

    }
,[errorMessage,successMessage,dispatch])







    return (
    <div className='min-w-screen min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...
         flex justify-center items-center border border-slate-300'>
        <div className='w-[350px] text-[#ffffff] p-2 flex justify-center items-center'>
            <div className='bg-gradient-to-r from-emerald-400 to-cyan-400 p-6 rounded-md hover:from-pink-500 hover:to-yellow-500 ...' >
                  
                <div>
                    <div>
                        <img src="http://localhost:3000/images/new logo.png" alt="Artsy-Avenue"/>
                    </div>
                </div>
            
                
        



               <form onSubmit={submit}>
               


               <div className="flex flex-col w-full gap-1 mb-3">
               <label htmlFor="email">Email</label>
               <input onChange={inputHandle} value={state.email}className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md" type="email" name="email" placeholder="Email" id="email" required/>
               </div>
               
               <div className="flex flex-col w-full gap-1 mb-3">
               <label htmlFor="name">Password</label>
               <input onChange={inputHandle} value={state.password}className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md" type="password" name="password" placeholder="Password" id="password" required/>
               </div>

               
               <button disabled={loader?true:false} className='bg-slate-500 w-full hover:shadow-purple-600/50 hover:shadow-lg text-white rounded px-7 py-2 mb-3'>
               {
                loader?<PropagateLoader color='#fff' cssOverride={overrideStyle}/>:'Login'
               }
               </button>

            

            

            
               
               
               
               
               
               
               </form>    
    
            </div>
            
    
    
        </div>            
            
    </div>
    );
};

export default AdminLogin;
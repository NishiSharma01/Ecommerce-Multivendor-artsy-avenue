


import React, { useEffect,useState } from "react";
import { screen } from '@testing-library/react';

import { Link,useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { overrideStyle } from '../../utils/utils';
import { seller_login,messageClear } from '../../store/Reducers/authReducer';

 const Login = () => {
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
        dispatch(seller_login(state))
    }

    useEffect(() => {

        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
            navigate('/')
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }


    },[successMessage,errorMessage])

    










    return (
        <div className='min-w-screen min-h-screen bg-gradient-to-r from-fuchsia-500 to-cyan-500
         flex justify-center items-center border border-slate-300'>
            <div className='w-[350px] text-[#ffffff] p-2 flex justify-center items-center'>
               <div className='bg-gradient-to-r from-emerald-400 to-cyan-400 p-6 rounded-md' >
               <h2 className="text-xl mb-3  font-bold ">Welcome to Artsy Avenue</h2>
               <p className="text-s mb-3 font-medium">Please Sign In  Your Account</p>
               <form onSubmit={submit}>
               


               <div className="flex flex-col w-full gap-1 mb-3">
               <label htmlFor="email">Email</label>
               <input onChange={inputHandle} value={state.email}className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md" type="email" name="email" placeholder="Email" id="email" required/>
               </div>
               
               <div className="flex flex-col w-full gap-1 mb-3">
               <label htmlFor="name">Password</label>
               <input onChange={inputHandle} value={state.password}className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md" type="password" name="password" placeholder="Password" id="password" required/>
               </div>

               
               <button disabled={loader ? true : false}  className='bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
            {
               loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Sing In'
            } 
            </button>
               <div className='flex items-center mb-3 gap-3 justify-center'><p>Don't have an account?<Link className='font-bold' to='/register'>Sign Up</Link></p></div>
               <div className="w-full flex justify-center items-center mb-3">
            <div className="w-[45%] bg-slate-600 h-[1px]"></div>
            <div className='w-[10%] justify-center items-center'>
                <span className='pb-1'>OR</span>
            </div>
            <div className="w-[45%] bg-slate-600 h-[1px]"></div>
            </div>
            <div className="flex justify-center items-center gap-3">
             <div className="w-[135px] h-[35px] flex rounded-md bg-orange-400 shadow-lg hover:shadow-orange-700 justify-center cursor-pointer items-center overflow-hidden">
                <span><FaGoogle /></span>
             </div>

             

             
            <div className="w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-700/55 justify-center cursor-pointer items-center overflow-hidden">
                <span><FaFacebookF /></span>
            </div>
            </div>


            

            
               
               
               
               
               
               
               </form>    
    
            </div>
            
    
    
        </div>            
            
    </div>
    );
};

export default Login;
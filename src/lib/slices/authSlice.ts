
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./postSlice";

interface AuthSliceInitialState {
    isUserLoggedIn : boolean ,
    userData : User | null
}

export const initialState : AuthSliceInitialState = {
        isUserLoggedIn : !!localStorage.getItem("token") ,
        userData : null
    } 

export const getUserData = createAsyncThunk("auth/getUserData" , async ()=>{

    const {data} = await axios.get(`https://linked-posts.routemisr.com/users/profile-data`,{
        headers :{
            token : localStorage.getItem("token")
        }
    })

    return data.user
})
const authSlice = createSlice({

    name : "auth" ,

    initialState ,
    reducers :{
        setIsUserLoggedIn :(state , action)=>{
            state.isUserLoggedIn = action.payload
        }
    } ,
    extraReducers(builder) {
        builder.addCase(getUserData.fulfilled , (state , action)=>{

            state.userData = action.payload
        })
    },
})

export const authReducer = authSlice.reducer
export const {setIsUserLoggedIn}=authSlice.actions

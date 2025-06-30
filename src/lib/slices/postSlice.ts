
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

 export interface PostInterface {
  _id: string;
  body: string;
  image: string;
  user: User
  createdAt: string;
  comments:CommentInterface [];
  id: string;
}

 interface CommentInterface {
  _id: string;
  content?: string; // optional because one comment is missing it
  commentCreator: User
  post: string;
  createdAt: string;
}


 export interface User{
    _id: string;
    name: string;
    photo: string;
  };



interface PostsSliceInitialStste {
    posts : PostInterface [] ,
    post  : PostInterface | null ,
    // post  : string | null ,
    isLoading : boolean


}

 const initialState : PostsSliceInitialStste =  {
        posts : [] ,
        post : null ,
        isLoading : true
    } ;


export const getAllPosts = createAsyncThunk("posts/getAllPosts" , async ()=>{
    const {data} = await axios.get(`https://linked-posts.routemisr.com/posts` , {
        headers : {
            token : localStorage.getItem("token")
        }
    })
  const {data : finalData} = await axios.get(`https://linked-posts.routemisr.com/posts?page=${data.paginationInfo.numberOfPages}` , {
        headers : {
            token : localStorage.getItem("token")
        }
    })
    // console.log(data.posts);
    
    return finalData.posts.reverse()
})

export const getSinglePost = createAsyncThunk("posts/getSinglePost" , async (id : string)=>{
    const {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${id}` , {
        headers : {
            token : localStorage.getItem("token")
        }
    })
    // console.log(data.post);
    
    return data.post
})





const postSlice = createSlice({
    name : "posts" ,
    initialState ,
    reducers :{
        setPosts : (state , action)=>{
            state.posts = action.payload
        }
    } ,
    extraReducers (builder){
        builder.addCase(getAllPosts.fulfilled , (state , action)=>{
            state.posts = action.payload
        }) 

        builder.addCase(getSinglePost.fulfilled , (state , action)=>{
            state.post = action.payload
            state.isLoading = false
        })
        builder.addCase(getSinglePost.pending , (state)=>{
            state.isLoading = true

        })

        

    }
})

export const postsReducer = postSlice.reducer
export const {setPosts}=postSlice.actions
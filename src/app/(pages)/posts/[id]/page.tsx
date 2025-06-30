"use client"

import Post from '@/app/_components/Post/Post';
import { getSinglePost } from '@/lib/slices/postSlice';
import { AppDispatch, RootState } from '@/lib/store';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PostDetails = () => {
const {id} = useParams <{id :string}>()
  console.log(id);
  const dispatch = useDispatch <AppDispatch>() ;
  const {post , isLoading} = useSelector((state : RootState) => state.posts)
  


const {back} = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

   async function deletPost(postID : string) {
              setLoading(true)
          const {data} = await axios.delete(`https://linked-posts.routemisr.com/posts/${postID}`,{
              headers :{
                  token : localStorage.getItem("token")
              }
          })
          console.log(data);
           back()
          setLoading(false)
          
          }

  useEffect(()=>{

    dispatch(getSinglePost(id))
  } , [dispatch])

  if (isLoading) {
    return(<>
        <div style={{height : "100vh"}}>Loadin ...</div>
    </>)
  }

  return (
    <>
        <div>PostDetails</div>

        {
          post ?
          <Post post={post} deletPost={deletPost} />
          :
         <div style={{height : "100vh"}}>
            <h1>Loading ...</h1>
         </div>
      }
    </>
  )
}

export default PostDetails
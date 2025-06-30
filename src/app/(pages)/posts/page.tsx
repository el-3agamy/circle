"use client"
import CreatePost from '@/app/_components/CreatePost/CreatePost'
import Post from '@/app/_components/Post/Post'

import { getAllPosts, PostInterface } from '@/lib/slices/postSlice'
import { AppDispatch, RootState } from '@/lib/store'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import axios from 'axios'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'





const Posts = () => {


          const [loading, setLoading] = React.useState<boolean>(false)


         async function deletPost(postID : string) {
              setLoading(true)
          const {data} = await axios.delete(`https://linked-posts.routemisr.com/posts/${postID}`,{
              headers :{
                  token : localStorage.getItem("token")
              }
          })
          console.log(data);
         await dispatch(getAllPosts())
          setLoading(false)
          
          }


  const { posts }: { posts: PostInterface[] } = useSelector((state: RootState) => state.posts)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])



  return (
    <>
      {
        loading == false ?  
<Container maxWidth={'sm'}>
        <CreatePost />
        <Stack spacing={3} mt={4} width={"100%"} justifyContent={"center"} >

          {
            posts.map((post) => <Post post={post} key={post._id} deletPost={()=>deletPost(post?._id)} />)
          }


        </Stack >
      </Container>
        :

         <Box sx={{margin : "auto" , height : "100vh" , textAlign:"center"}} >
                    <Typography variant='h1' component='h1'>Loading ...</Typography>
            </Box>
      }
    </>
  )
}

export default Posts
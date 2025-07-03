"use client"
import Post from '@/app/_components/Post/Post'
import { getUserPosts } from '@/lib/slices/postSlice'
import { AppDispatch, RootState } from '@/lib/store'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Profile() {

  const dispatch = useDispatch<AppDispatch>()
  const { userPosts } = useSelector((state: RootState) => state.posts)

  useEffect(() => {
    dispatch(getUserPosts())
  }, [dispatch])

  async function deletPost(postID: string) {
    // setLoading(true)
    const { data } = await axios.delete(`https://linked-posts.routemisr.com/posts/${postID}`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    console.log(data);
    await dispatch(getUserPosts())
    // setLoading(false)

  }





  return (

    <>
      <Container maxWidth={'sm'}>
        <Stack spacing={3} mt={4} width={"100%"} justifyContent={"center"} >

          {
            userPosts.map((post) => <Post post={post} key={post._id} deletPost={() => deletPost(post?._id)} />)
          }


        </Stack >
      </Container>

    </>
  )
}
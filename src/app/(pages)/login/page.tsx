"use client"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import * as Formik from 'formik';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setIsUserLoggedIn } from '@/lib/slices/authSlice'



function Login() {



  const [isLoading , setIsLoading] = useState<boolean>(false)
  const router = useRouter()
const dispatch = useDispatch()

 interface ValuesOfLogin {
   
    email: string,
    password: string,
   
   
  };
  
  const initialValues  : ValuesOfLogin= {
   
    email: "",
    password: "",
  
  };

 

  const onSubmit = async (values: ValuesOfLogin) => {
    setIsLoading(true)
    const {data} = await axios.post(`https://linked-posts.routemisr.com/users/signin`, values)
    setIsLoading(false)
      
    if (data.message === "success") {
      localStorage.setItem("token" , data.token)
      dispatch(setIsUserLoggedIn(true))
      router.push('/')
      
    }
     
  };


  const formik = Formik.useFormik({
    initialValues,
    onSubmit
  })


  return (
    <Box>


      <Container maxWidth="sm">
        <Typography component={"h1"} variant='h4'>Sign In.</Typography>

        <Box component={"form"}
          onSubmit={formik.handleSubmit}
        >
          

         


          <TextField
            fullWidth
            margin='normal'
            type='email'
            name='email'
            label="Email"
            placeholder='... ex: Saeid12@gmail.com'
            variant='outlined'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />


          {
            formik.errors.email && formik.touched.email &&
            <Typography
              sx={{ textAlign: "center", color: "red" }}
            >
              {String(formik.errors.email)}
            </Typography>
          }

          <TextField
            fullWidth
            margin='normal'
            type='password'
            name='password'
            label="Password"
            variant='outlined'
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}

          />

          {
            formik.errors.password && formik.touched.password &&
            <Typography
              sx={{ textAlign: "center", color: "red" }}
            >
              {String(formik.errors.password)}
            </Typography>
          }

          

        

        
          <Button
            variant='contained'
            fullWidth
            loading ={Boolean(isLoading)}
            loadingPosition="start"
            type='submit'
            sx={{ mt: 3 }}
          >Register</Button>
        </Box>

      </Container>
    </Box>
  )
}

export default Login
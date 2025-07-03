"use client"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import React from 'react'
import { useRouter } from 'next/navigation'
import { setIsUserLoggedIn } from '@/lib/slices/authSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'

export default function Update_Password() {


    const {push} = useRouter()
    interface UpdateValuesInterface {
        password: string,
        newPassword: string
    }

    const dispatch = useDispatch<AppDispatch>()

    const initialValues: UpdateValuesInterface = {

        password: "",
        newPassword: ""

    }

    
    const validationSchema = Yup.object({
      password : Yup.string().required('Curent Password are required.') ,
      newPassword : Yup.string().required().
      matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 
        'Password must be at least 8 characters , include uppercase and lowercase letters, a number, and a special character.')
    })

    async function updatePassword(values : UpdateValuesInterface) {

        const { data } = await axios.patch(`https://linked-posts.routemisr.com/users/change-password`,
            values, {
            headers: {
                token: localStorage.getItem('token')
            }
        }
        )
         if (data.message === "success") {
              localStorage.setItem("token", data.token)
               dispatch(setIsUserLoggedIn(true))
              push('/')
        
            }
        console.log(data);
        
    }

    const {values , handleChange , handleSubmit , handleBlur , errors , touched} = useFormik({
      initialValues ,
      validationSchema ,
      onSubmit : updatePassword
    })

    return (
        <>
                 <Box>
                
                
                      <Container maxWidth="sm">
                        <Typography component={"h1"} variant='h4'>Update Password.</Typography>
                
                        <Box component={"form"}
                          onSubmit={handleSubmit}
                        >
              
                          <TextField
                            fullWidth
                            margin='normal'
                            type='password'
                            name='password'
                            label="Password"
                            variant='outlined'
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                
                          />
                
                          {
                            errors.password && touched.password &&
                            <Typography
                              sx={{ textAlign: "center", color: "red" }}
                            >
                              {String(errors.password)}
                            </Typography>
                          }


                          <TextField
                            fullWidth
                            margin='normal'
                            type='password'
                            name='newPassword'
                            label="New newPassword"
                            variant='outlined'
                            value={values.newPassword}
                            onBlur={handleBlur}
                            onChange={handleChange}
                
                          />
                
                          {
                            errors.newPassword && touched.newPassword &&
                            <Typography
                              sx={{ textAlign: "center", color: "red" }}
                            >
                              {String(errors.newPassword)}
                            </Typography>
                          }
                
                
                
                
                
                
                          <Button
                            variant='outlined'
                            fullWidth
                            // loading={Boolean(isLoading)}
                            loadingPosition="start"
                            type='submit'
                            sx={{ mt: 3 }}
                          >Submit
                          </Button>
                
                        </Box>
                
                
                      </Container>
                    </Box>
        </>
    )
}

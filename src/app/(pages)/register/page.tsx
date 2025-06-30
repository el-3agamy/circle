"use client"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import * as Formik from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation'



function Register() {

  const [isLoading , setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const initialValues  : ValuesOfRegister= {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: "",
    gender: "male"
  };

  interface ValuesOfRegister {
    name: string,
    email: string,
    password: string,
    rePassword: string,
    dateOfBirth: string,
    gender: "male" | "female"
  };

  const onSubmit = async (values: ValuesOfRegister) => {
    setIsLoading(true)
    const {data} = await axios.post(`https://linked-posts.routemisr.com/users/signup`, values)
    setIsLoading(false)
      
    if (data.message === "success") {

      router.push('/login')
      
    }
     
  };

  const validationSchema = Yup.object({
    name: Yup.string().max(12, "Max 12 charcters").min(3, "Min 3 characters").required("Name is required."),
    email : Yup.string().email("Email is not correct").required('Email is required') ,
    password : Yup.string().required("Password is required").min(3).max(15) ,
    rePassword : Yup.string().required().oneOf([Yup.ref('password')]).matches( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) ,
    dateOfBirth: Yup.string().required("Date of Birth is required"),
    gender: Yup.string().oneOf(["male", "female"], "Gender is required").required("Gender is required")


  });

  const formik = Formik.useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })


  return (
    <Box>


      <Container maxWidth="sm">
        <Typography component={"h1"} variant='h4'>Register Now.</Typography>

        <Box component={"form"}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            fullWidth
            margin='normal'
            type='text'
            name='name'
            label="Name"
            placeholder='... ex: SaEid'
            variant='outlined'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />

          {
            formik.errors.name && formik.touched.name &&
            <Typography
              sx={{ textAlign: "center", color: "red" }}
            >
              {String(formik.errors.name)}
            </Typography>
          }


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

          <TextField
            fullWidth
            margin='normal'
            type='password'
            name='rePassword'
            label="Re-Password"
            variant='outlined'
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />

          {
            formik.errors.rePassword && formik.touched.rePassword &&
            <Typography
              sx={{ textAlign: "center", color: "red" }}
            >
              {String(formik.errors.rePassword)}
            </Typography>
          }

          <TextField
            fullWidth
            margin='normal'
            type='date'
            name='dateOfBirth'
            label="Date Of Birth"
            variant='outlined'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            
          />

          {
            formik.errors.dateOfBirth && formik.touched.dateOfBirth &&
            <Typography
              sx={{ textAlign: "center", color: "red" }}
            >
              {String(formik.errors.dateOfBirth)}
            </Typography>
          }

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Gender"
              name='gender'
              value={formik.values.gender || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value={""}>Select Gender</MenuItem>
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>

            </Select>
          </FormControl>
          {
            formik.errors.gender && formik.touched.gender &&
            <Typography
              sx={{ textAlign: "center", color: "red" }}
            >
              {String(formik.errors.gender)}
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

export default Register
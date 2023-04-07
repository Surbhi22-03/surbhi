import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { MenuItem, Typography } from '@mui/material'
import * as yup from "yup"
import Button from '@mui/material/Button';
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";

import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const BASE_URL = process.env.REACT_APP_BASE_URL

const formInitialValues = {
  name: "",
  email: "",
  mobileNumber: "",
  whatsapp: "",
  gender: "",
  dob: "",
  address: "",
  workingExp: "",
  company: "",
  coursename: "",
  fees: ""
}

// const [isError, setIsError] = useState(false)



const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const signup = yup.object().shape({
  name: yup
    .string()
    .min(3, "this is too short")
    .max(10, "this is too long")
    .required("username is required"),

  email: yup
    .string()
    .email("email should be correct")
    .required("email is required"),
  mobileNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),

  whatsappNumber: yup
    .string()
    .min(10, "Number are must be 10 digit")
    .max(10, "number are must be 10 digit")
    .required("Number must be required"),
  //   gender: yup.string().required("Select the specific gender"),
  address: yup.string().required("Address must be important"),
  experience: yup.string().required("experience must be important"),
  company: yup.string().required("company must be important"),
});

const Form = () => {
  // const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [course, setCourses] = useState([])

  const getCourses = () => {
    axios.get("http://localhost:2244/courses").then(res => {
      setCourses(res.data.data)
      console.log(res.data.data)
    }).catch(err => {

    })
  }


  useEffect(() => {
    getCourses()
  }, [])




  const getPost = (data) => {


    axios
      .post("http://localhost:2244/student", data)
      .then((res) => {
        const { status, msg } = res.data
        if (status === "OK") {
          toast.success(msg)
          navigate("/table")
        } else {
          toast.error(msg)
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log("error is in");
        toast.error("Please check network")
      });
  };

  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={true} />

      <Formik
        initialValues={formInitialValues}
        validationSchema={signup}
        onSubmit={(values) => {
          alert("clicked");
          getPost(values)
          console.log("this is values", values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <Container maxWidth="md">
            <Box sx={{ p: 2, border: "2px solid black" }}>
              <form>
                <h1>Geeksdoor</h1>
                <Stack direction="row" spacing={2}>
                  <label className="label">Name</label>
                  <TextField
                    fullWidth
                    variant="standard"
                    id="name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  ></TextField>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <label className="label">Email</label>
                  <TextField
                    variant="standard"
                    fullWidth
                    id="email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  ></TextField>
                </Stack>
                <Stack direction="row" marginTop={2} spacing={2}>
                  <label className="label">Mobile Number</label>
                  <TextField
                    variant="standard"
                    fullWidth
                    id="mobileNumber"
                    type="number"
                    name="mobileNumber"
                    value={values.mobileNumber}
                    onChange={handleChange}
                    error={touched.mobileNumber && Boolean(errors.mobileNumber)}
                    helperText={touched.mobileNumber && errors.mobileNumber}
                  ></TextField>
                </Stack>

                <Stack direction="row" marginTop={2} spacing={2}>
                  <label className="label"> Whatsapp</label>
                  <TextField
                    variant="standard"
                    fullWidth
                    id="whatsapp"
                    type="number"
                    name="whatsappnum"
                    value={values.whatsappnum}
                    onChange={handleChange}
                    error={
                      touched.whatsappNumber && Boolean(errors.whatsappNumber)
                    }
                    helperText={touched.whatsappNumber && errors.whatsappNumber}
                  ></TextField>
                </Stack>

                <Stack direction="row" marginTop={2} spacing={2}>
                  <FormControl>
                    <FormLabel direction="row"> Gender</FormLabel>
                    {/* <label></label> */}
                    <RadioGroup
                      fullWidth
                      name="gender"
                      area-aria-labelledby="gender-group-lable"
                      value={values.gender}
                      onChange={handleChange}
                      error={
                        touched.gender && errors.gender ? errors.gender : null
                      }
                      //   helperText={
                      //     touched.gender && errors.gender ? errors.gender : null
                      //   }
                      row
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                </Stack>

                <Stack direction="row" marginTop={2} spacing={2}>
                  <label className="label"> dob</label>
                  <TextField
                    variant="standard"
                    fullWidth
                    id="dob"
                    type="string"
                    name="dob"
                    value={values.dob}
                    onChange={handleChange}
                    error={
                      touched.dob && Boolean(errors.dob)
                    }
                    helperText={touched.dob && errors.dob}
                  ></TextField>
                </Stack>
                <Stack direction="row" marginTop={1} marginBottom={2} spacing={2}>
                  <label className="label">Address</label>
                  <TextField
                    fullWidth
                    type="text"
                    variant="standard"
                    id="address"
                    name="add"
                    value={values.add}

                    onChange={handleChange}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  ></TextField>
                </Stack>

                <Stack direction="row" marginTop={1} marginBottom={2} spacing={2}>
                  <label className="label">workingExp</label>
                  <TextField
                    fullWidth
                    type="text"
                    variant="standard"
                    id="work"
                    name="working"
                    value={values.working}
                    onChange={handleChange}
                    error={touched.work && Boolean(errors.work)}
                    helperText={touched.work && errors.work}
                  ></TextField>
                </Stack>
                <Stack direction="row" marginTop={1} marginBottom={2} spacing={2}>
                  <label className="label">Company</label>
                  <TextField
                    fullWidth
                    type="text"
                    variant="standard"
                    id="company"
                    name="company"
                    value={values.company}
                    onChange={handleChange}
                    error={touched.company && Boolean(errors.company)}
                    helperText={touched.company && errors.company}
                  ></TextField>
                </Stack>
                <Stack direction="row" marginTop={1} marginBottom={2} spacing={2}>
                  <label className="label">Fees</label>
                  <TextField
                    fullWidth
                    type="text"
                    variant="standard"
                    id="fees"
                    name="fees"
                    value={values.fees}
                    onChange={handleChange}
                    error={touched.fees && Boolean(errors.fees)}
                    helperText={touched.fees && errors.fees}
                  ></TextField>
                </Stack>
                <Stack>
                  {<TextField
                    id="coursename"
                    name="coursename"
                    value={values.coursename}
                    onChange={handleChange}
                    label="course"
                    //onChange={(e) => setCourses(e.target.value)}
                    select
                    style={{ marginBottom: "3px", marginRight: "11px", width: "20%" }}
                  >
                    {course && course.map((course) => {
                      return <MenuItem value={course.coursename}>{course.coursename}</MenuItem>
                    })}
                  </TextField>}

                </Stack>
                &nbsp;&nbsp;&nbsp;&nbsp;



                <Link to={'/Students'}><Button variant="contained" color="success" onClick={() => getPost(values)}>
                  submit
                </Button></Link>
              </form>
            </Box>
          </Container>
        )}
      </Formik>
    </div>
  );
};

export default Form;
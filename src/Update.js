import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField,
} from "@mui/material";
import { Link } from 'react-router-dom';

// const setstudent = () => {
// }
// const value = () => {
// }

const Update = () => {
    const { studentId } = useParams()
    // const Navigate = useNavigate()
    const [Update, setupdate] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        whatsapp: '',
        gender: '',
        dob: '',
        address: '',
        workingExp: '',
        company: ''
    })
    const showData = async () => {
        const resultdata = await axios.get(`http://localhost:2244/students/${studentId}`)
        console.log(resultdata.data)
        setupdate(resultdata.data)
    }
    // const[students,setstudent]=useState([])
    const getupdatedata = () => {
        axios.put(`http://localhost:2244/students/${studentId}`, Update).then((res) => {
            console.log(res.data)
            // setstudent(res.data)
        }).catch((err) => {
            console.log("error")
        })
    }
    const handleInput = (e) => {
        setupdate({ ...Update, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        showData()
        // getupdatedata()
    }, [])
    return (
        <div>
            <Stack direction="row" marginTop={2} spacing={2}>
                <label className="label">Name</label>
                <TextField
                    variant="filled"
                    fullWidth
                    id="name"
                    type="text"
                    name="name"
                    value={Update.name}
                    onChange={handleInput}
                ></TextField>
            </Stack>

            <Stack direction="row" marginTop={2} spacing={2}>
                <label className="label">Whatsapp</label>
                <TextField
                    variant="filled"
                    fullWidth
                    id="whatsapp"
                    type="text"
                    name="whatsapp"
                    value={Update.whatsaapNumber}
                    onChange={handleInput}
                ></TextField>
            </Stack>

            <Stack direction="row" marginTop={2} spacing={2}>
                <label className="label">Email</label>
                <TextField
                    variant="filled"
                    fullWidth
                    id="email"
                    type="text"
                    name="email"
                    value={Update.email}
                    onChange={handleInput}
                ></TextField>
            </Stack>

            <Stack direction="row" marginTop={2} spacing={2}>
                <label className="label">Address</label>
                <TextField
                    variant="filled"
                    fullWidth
                    id="address"
                    type="text"
                    name="address"
                    value={Update.address}
                    onChange={handleInput}
                ></TextField>
            </Stack>

            <Stack direction="row" marginTop={2} spacing={2}>
                <label className="label">mobileNumber</label>
                <TextField
                    variant="filled"
                    fullWidth
                    id="mobileNumber"
                    type="text"
                    name="mobileNumber"
                    value={Update.mobileNumber}
                    onChange={handleInput}
                ></TextField>
            </Stack>

            <Stack direction="row" marginTop={2} spacing={2}>
                <label className="label">Company</label>
                <TextField
                    variant="filled"
                    fullWidth
                    id="company"
                    type="text"
                    name="company"
                    value={Update.company}
                    onChange={handleInput}
                ></TextField>
            </Stack>


            <Stack direction="row" marginTop={2} spacing={2}>
                <label className="label">workingExp</label>
                <TextField
                    variant="filled"
                    fullWidth
                    id="workingExp"
                    type="text"
                    name="workingExp"
                    value={Update.workingExp}
                    onChange={handleInput}
                ></TextField>
            </Stack>

            <Stack direction="row" marginTop={2} spacing={2}>
                <label className="label">Dob</label>
                <TextField
                    variant="filled"
                    fullWidth
                    id="dob"
                    type="text"
                    name="dob"
                    value={Update.dob}
                    onChange={handleInput}
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
                        //   value={values.gender}
                        //   onChange={handleChange}
                        //   error={
                        //     touched.gender && errors.gender ? errors.gender : null
                        //   }
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

            {/* <h2>{}</h2> */}
            {/* <h1>Name:{students.name}</h1>
                <h1>Email:{students.email}</h1>
                <h1>mobileNumber:{students.mobilenumber}</h1>
                <h1>whatsappNumber:{students.whatsaapnumber}</h1>
                <h1>Dob:{students.dob}</h1>
                <h1>Address:{students.address}</h1>
                <h1>workingExperience:{students.working}</h1>
        <h1>Company:{students.name}</h1>*/}
            <Link to="/Students" >
                <button onClick={(e) => {
                    e.preventDefault();
                    getupdatedata()

                     //Navigate('/student')
                }}>clicked</button>
            </Link>
        </div>
    )
}
export default Update
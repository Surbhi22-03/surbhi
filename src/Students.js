import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableRow, TableHead, Button, Pagination, TextField, MenuItem, Grid, Typography, FormControl, FormLabel, FormControlLabel, Checkbox, Stack, FormGroup, } from '@mui/material'
import { Link, Navigate, useNavigate } from 'react-router-dom'
//import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { Box, Container } from "@mui/system";
//const BASE_URL = process.env.REACT_APP_BASE_URL


const Students = () => {

    const [student, setStudent] = useState([])
    const [Search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState('name')
    const [sortType, setSortType] = useState('')
    const [course, setCourse] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [count, setCount] = useState(0)
    console.log(student)

    const navigate = useNavigate()


    const getdata = () => {

        const reqBody = {
            "query": Search,
            "page": page,
            "limit": limit,
            "sortBy": sortBy,
            "sortType": sortType,
        }
        axios.post(`http://localhost:2244/get-students`, reqBody).then((res) => {
            console.log(res.data)
            setStudent(res.data.data.students)
            console.log(res.data.data.students)
            setCount(res.data.data.count[0].totalRecords)
        }).catch((err) => {
            console.log(err, "error")
        })
    }
    const getCourses = () => {
        axios.post("http://localhost:2244/course").then(res => {
            setCourse(res.data.student)
        }).catch(err => {
            console.log("error")
        })
    }

    // const filterdata=()=>{
    //     axios.post("http://localhost:2244/filter").then(res)
    // }

    useEffect(() => {
        getdata()
        getCourses()
    }, [Search, page, limit, sortBy, sortType])


    const deleteStudent = (StudentId) => {

        Swal.fire({
            title: 'Are you sure ?',
            text: 'really want to delete ?',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Yes, Delete.",
            cancelButtonText: "Cancel"
        }).then(action => {
            if (action.isConfirmed) {
                axios.delete(`http://localhost:2244/students/${StudentId}`).then((res) => {
                    console.log(res.data)
                }).catch((err) => {
                    console.log("error", err)
                })

                //TODO :: add delete apis here



                Swal.fire({
                    title: "Deleted",
                    text: "Data deleted successfully.",
                    icon: "info"
                })
            }
        })


    }
    // useEffect(() => {
    //     deleteStudent()
    // }, [])





    //table..........................................................


    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    <Container maxWidth="mg">
                        <Box sx={{ height: "100vh" }}>
                            <TextField
                                style={{ marginBottom: "3px", marginLeft: "20%", marginRight: "1opx", width: "30%" }} placeholder='Search Bar' value={Search}
                                onChange={(e) => setSearch(e.target.value)}
                            >
                                <TextField
                                    type="text"
                                >Search</TextField>
                            </TextField>

                            <TextField
                                id="sortby"
                                label="Sortby"
                                onChange={(e) => setSortBy(e.target.value)}
                                select
                                style={{ marginBottom: "3px", marginRight: "11px", width: "20%" }}
                            >
                                <MenuItem value="name">Name</MenuItem>
                                <MenuItem value="email">Email</MenuItem>
                            </TextField>

                            <TextField
                                id="sorttype"
                                label="SortType"
                                onChange={(e) => setSortType(e.target.value)}
                                select
                                style={{ marginBottom: "3px", marginRight: "11px", width: "20%" }}
                            >
                                <MenuItem value="ASC">Asc</MenuItem>
                                <MenuItem value="DEC">Des</MenuItem>

                            </TextField>



                            <Table>
                                <colgroup>
                                    <col style={{ margin: "50px", marginLeft: "25%", border: "2px solid gray", width: "10%" }} />
                                    <col style={{ margin: "50px", marginLeft: "25%", border: "2px solid gray", width: "10%" }} />
                                    <col style={{ margin: "50px", marginLeft: "25%", border: "2px solid gray", width: "10%" }} />
                                    <col style={{ margin: "50px", marginLeft: "25%", border: "2px solid gray", width: "10%" }} />
                                    <col style={{ margin: "50px", marginLeft: "25%", border: "2px solid gray", width: "10%" }} />
                                    <col style={{ margin: "50px", marginLeft: "25%", border: "2px solid gray", width: "10%" }} />
                                </colgroup>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>S.No.</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell> </TableCell>
                                        <TableCell> </TableCell>

                                        {/* <TableCell>button</TableCell> 
                             <TableCell>button</TableCell>  */}

                                    </TableRow>

                                </TableHead>
                                {
                                    student && student.map((stud, index) => {
                                        return (
                                            <TableBody key={stud._id}>

                                                <TableRow>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{stud.name}</TableCell>
                                                    <TableCell>{stud.email}</TableCell>
                                                    <TableCell>
                                                        <Button type='submit' variant="contained" onClick={() => deleteStudent(stud._id)}>delete</Button>
                                                    </TableCell>
                                                    <TableCell><Button variant='contained' color="inherit"><Link to={`/SingleStudent/${stud._id}`}  >view more</Link></Button></TableCell>
                                                    <TableCell><Button variant='contained' color="inherit"><Link to={`/Update/${stud._id}`}>Edit</Link></Button></TableCell>
                                                </TableRow>

                                            </TableBody>

                                        )
                                    })
                                }
                            </Table>
                            {<Pagination count={Math.ceil(count / limit)} onChange={(e, page) => {
                                setPage(page)
                            }} color="primary" />}
                            {/* {<button onClick={() => { getdata() }}>submit</button>}  */}


                        </Box>
                    </Container>
                </Grid>
                <Grid item xs={3}>
                    <div style={{ botder: "2px solid black", marginTop: "4rem", width: "100%" }}>
                        <Stack>
                            <Typography style={{ textAlign: "center", fontWeight: "700", color: "gray" }}>Filter</Typography>
                            <FormControl>
                                <FormLabel>Course :</FormLabel>
                                <FormGroup>
                                    <div>
                                        {course && course.map(courses => {
                                            return <FormControlLabel value={course.coursename} control={<Checkbox />} label={course.coursename} />
                                        })}
                                    </div>
                                </FormGroup>
                            </FormControl>
                            <hr />
                            <FormControl>
                                <FormLabel>Fees :</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    id="fee"
                                    type="number"
                                    lable="min"
                                    name="fee"
                                />
                                <FormLabel style={{ textAlign: "center" }}>To</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    id="fee"
                                    type="number"
                                    lable="max"
                                    name="fee"
                                />
                                <Button variant="contained" color="info" style={{ marginLeft: "10px", marginTop: "30px", width: "5%" }} >Apply</Button>
                            </FormControl>
                        </Stack>
                    </div>  

                </Grid>
            </Grid>
        </div>
    )
}


export default Students
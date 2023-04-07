import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'


const SingleStudent = () => {
    const { studentId } = useParams()
    const [students, setStudents] = useState([])
    console.log(studentId)
    const getsdata = () => {
        axios.get(`http://localhost:2244/students/${studentId}`).then((res) => {
            console.log(res.data)
            setStudents(res.data)
        }).catch((err) => {
            console.log("error", err)
        })
    }
    useEffect(() => {
        getsdata()
    }, [])
    return (
        <div>

            <h3>Name : {students.name}</h3>
            <h3>Email : {students.email}</h3>
            <h3>mobileNumber : {students.mobileNumber}</h3>
            <h3>whatsappnum : {students.whatsappnum}</h3>
            <h3>dob : {students.dob}</h3>
            <h3>working: {students.working}</h3>
            <h3>gender : {students.gender   }</h3>
            <h3>Address : {students.add}</h3>
            <h3>company : {students.company}</h3>
            <h3>Course : {students.coursename}</h3>
            <h3>Fees : {students.fees}</h3>
            {/* {
           students&& students.map(student=>{
                return(
                    <h5>{student.name}</h5>
                )
            })
        } */}
            <Link to={"./Student"}><button onClick={() => { getsdata() }}>submit</button></Link>
        </div>
    )
}

export default SingleStudent
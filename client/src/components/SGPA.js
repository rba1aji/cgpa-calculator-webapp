import React, { useEffect, useState, useRef } from "react";
import { Form } from "react-bootstrap";
import { Table, Button } from "react-bootstrap";
import axios from 'axios';
// import { DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";

const passOrFail = (grade) => {
    var pass = 'OA+B+';
    if (pass.includes(grade)) return "Pass"
    return "pass/fail";
}


export default function SGPA() {
    const [noOfCourses, setNoOfCourses] = useState([0, 1, 2, 3, 4]);
    const [selectedGrade, setSelectedGrade] = useState([]);
    const [credits, setCredits] = useState([]);
    const gradesAsAlphabet = [
        'AB', 'O', 'A+', 'A', 'B+', 'B', 'RA', 'W', 'I'
    ];
    const [sgpa, setSgpa] = useState()
    const myRef = useRef();

    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

    // useEffect(() => {
    //     axios.get("https://localhost:7213/api/CGPA")
    //         .then((res) => {
    //             console.log(res)
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         })
    // }, [noOfCourses])

    return (
        <>
            <br />
            <h4 className='mb-0'>Enter a semester details</h4>
            <br />
            <Form style={{ display: 'inline-block' }}
                onSubmit={((e) => {
                    let grades = new Array(noOfCourses.length);
                    grades.fill('I');
                    for (let i = 0; i < selectedGrade.length; i++) {
                        grades[i] = selectedGrade[i] === '' ? grades[i] : selectedGrade[i];
                    }
                    e.preventDefault();
                    console.log(credits, grades);

                    const arrdata = [
                        {
                            "credits": credits,
                            "gradesInAlphabet": grades,
                            "noOfCourses": noOfCourses.length
                        }
                    ];

                    axios({
                        method: 'post',
                        url: `https://rjicgpacalc.herokuapp.com/api/CGPA/1`,
                        data: arrdata,
                        headers: {
                            "Content-Type": "application/json; charset=utf-8 "
                        }

                    })
                        .then((res) => {
                            console.log(res);
                            setSgpa(res.data.cgpa.toFixed(2));
                            scrollToRef(myRef);
                        })
                        .catch((err) => {
                            console.log(err.message);
                        })

                })}
            >
                <Table  >
                    <thead>
                        <th className="p-2">Course Title</th>
                        <th className='p-2'>Credits</th>
                        <th className='p-2'>Grade</th>
                        <th className="p-2">Result</th>
                    </thead>

                    <tbody>
                        {noOfCourses.map((item, index) => {
                            return <tr key={index}>
                                <td style={{ width: '22.5%' }} className='my-auto py-auto'>course {index + 1}</td>
                                <td style={{ width: '27.5%' }}>
                                    <Form.Control required
                                        className={`text-center ${window.innerWidth > 600 ? 'mx-4' : ''} bg-secondary p-1`}
                                        style={{ width: '70%', color: 'white', fontSize: '120%', fontWeight: 'bolder' }}
                                        type="number" min='0'
                                        onChange={
                                            (e) => {
                                                credits[index] = e.target.value;
                                            }
                                        }
                                    >
                                    </Form.Control>
                                </td>
                                <td style={{ width: '27.5%' }}>
                                    <Form.Select
                                        required
                                        style={{ width: '70%', color: 'white', fontSize: '120%', fontWeight: 'bolder' }}
                                        className={`text-center ${window.innerWidth > 600 ? 'mx-4' : ''} bg-secondary p-1`}
                                        onChange={
                                            (e) => {
                                                // console.log(e.target.value);
                                                // console.log('selected')
                                            }}
                                    >
                                        {selectedGrade.map((grade, ind) => {
                                            return grade;
                                        })}
                                        {
                                            gradesAsAlphabet.map((item, ind) => {
                                                return <option
                                                    key={ind}
                                                    onClick={() => {
                                                        let t = selectedGrade;
                                                        t[index] = item;
                                                        setSelectedGrade(t)
                                                    }}>
                                                    {item}
                                                </option>
                                            })
                                        }
                                    </Form.Select></td>
                                <td style={{ width: '22.5%' }}>{passOrFail(selectedGrade[index])}</td>
                            </tr>
                        }, [selectedGrade])
                        }
                    </tbody>
                    <tfoot style={{ border: 'none' }} >
                        <td colSpan={2} style={{ border: 'none' }} className='pt-3'>
                            <Button
                                onClick={() => {
                                    var t = noOfCourses;
                                    t.pop();
                                    t.pop()
                                    setNoOfCourses((old) => [...old, old.length]);
                                }}
                                variant="danger" style={{ backgroundColor: "red" }}
                            >
                                - Remove a course
                            </Button>
                        </td>
                        <td colSpan={2} style={{ border: 'none' }} className='pt-3'>
                            <Button
                                onClick={() => setNoOfCourses((old) => [...old, old.length])}
                                variant="success" style={{ backgroundColor: "green" }}
                            >
                                + Add a course
                            </Button>
                        </td>
                    </tfoot>

                </Table>
                <Button type="submit" variant='info' className='px-5'><h5 className='mb-0'>Find my SGPA</h5></Button>
            </Form>
            <div className='' style={{ marginTop: '35vh', marginBottom: '40vh' }}>
                {sgpa != null ? <><span className='h4'>Your SGPA is </span><span className='h3' style={{ color: 'green' }}>{sgpa}</span>
                </> : <></>
                }
                <br />
            </div>
            <div ref={myRef} id='myRef'><br /></div>
        </>
    );
}
import React, { useState } from "react";
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

                    axios({
                        method: 'post',
                        url: 'https://rjicgpacalc.herokuapp.com/api/CGPA/1',
                        data:
                            [
                                {
                                    "credits": credits,
                                    "gradesInAlphabet": grades,
                                    "noOfCourses": noOfCourses
                                }
                            ]

                    })
                        .then(() => {

                        })
                        .catch(() => {

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
                                <td style={{ width: '30%' }} className='my-auto py-auto'>course {index + 1}</td>
                                <td style={{ width: '25%' }}>
                                    <Form.Control required
                                        className='text-center mx-4 bg-secondary p-1'
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
                                <td style={{ width: '25%' }}>
                                    <Form.Select
                                        required
                                        style={{ width: '70%', color: 'white', fontSize: '120%', fontWeight: 'bolder' }}
                                        className='text-center mx-4 bg-secondary p-1'
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
                                <td style={{ width: '30%' }}>{passOrFail(selectedGrade[index])}</td>
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
        </>
    );
}
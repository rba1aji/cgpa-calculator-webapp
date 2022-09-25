import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Table, Button } from "react-bootstrap";
// import { DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";

const passOrFail = () => {
    return "Pass";
}


export default function SGPA() {
    const [noOfCourses, setNoOfCourses] = useState([0, 1, 2, 3, 4]);
    const [selectedGrade, setSelectedGrade] = useState([]);
    // const [courseRows, setCourseRows] = useState([]);
    const gradesAsAlphabet = [
        'O', 'A+', 'A', 'B+', 'B', 'RA', 'W', 'AB', 'I'
    ];


    return (
        <>
            <h2>Enter a semester details</h2>
            <Form style={{ display: 'inline-block' }}>
                <Table>
                    <thead>
                        <th>Course Title</th>
                        <th>Credits</th>
                        <th>Grade</th>
                        <th>Result</th>
                    </thead>

                    <tbody>
                        {noOfCourses.map((item, index) => {
                            return <tr>
                                <td style={{ width: '30%' }}>course {index + 1}</td>
                                <td style={{ width: '25%' }}>
                                    <Form.Control required
                                        className='text-center mx-4 bg-secondary p-1'
                                        style={{ width: '70%', color: 'white', fontSize: '120%', fontWeight: 'bolder' }}
                                        type="number" min='0'>
                                    </Form.Control>
                                </td>
                                <td style={{ width: '25%' }}>
                                    <Form.Select
                                        style={{ width: '70%', color: 'white', fontSize: '120%', fontWeight: 'bolder' }}
                                        className='text-center mx-4 bg-secondary p-1'
                                        onSelect={
                                            () => {
                                                console.log(selectedGrade);
                                                console.log('selected')
                                            }}
                                    >
                                        {selectedGrade.map((grade, ind) => {
                                            return grade;
                                        })}
                                        {
                                            gradesAsAlphabet.map((item, ind) => {
                                                return <option
                                                    onClick={() => {
                                                        let t = selectedGrade;
                                                        t[index] = item;
                                                        setSelectedGrade(t)
                                                        console.log(selectedGrade)
                                                    }}>
                                                    {item}
                                                </option>
                                            })
                                        }
                                    </Form.Select></td>
                                <td style={{ width: '30%' }}>{passOrFail()}</td>
                            </tr>
                        }, [selectedGrade])
                        }
                    </tbody>

                    <tr >
                        <td colSpan={2} style={{ border: 'none' }}>
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
                        <td colSpan={2} style={{ border: 'none' }}>
                            <Button
                                onClick={() => setNoOfCourses((old) => [...old, old.length])}
                                variant="success" style={{ backgroundColor: "green" }}
                            >
                                + Add a course
                            </Button>
                        </td>
                    </tr>

                </Table>
                <Button type="submit">Find my SGPA</Button>
            </Form>
        </>
    );
}
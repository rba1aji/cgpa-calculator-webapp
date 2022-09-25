import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Button, DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";

const passOrFail = () => {
    return "Pass";
}

const SelectedGrade = (props) => {
    return props.arr[props.index];
}

export default function SGPA() {
    const [noOfCourses, setNoOfCourses] = useState(4);
    const [selectedGrade, setSelectedGrade] = useState([]);
    const [courseRows, setCourseRows] = useState([]);
    const gradesAsAlphabet = [
        'O', 'A+', 'A', 'B+', 'B', 'RA', 'W', 'AB', 'I'
    ];

    useEffect(() => {
        console.log(selectedGrade);
    }, [selectedGrade])

    useEffect(() => {
        if (courseRows.length >= noOfCourses) {
            courseRows.pop();
            courseRows.pop();
            selectedGrade.pop();
        }
        for (var i = courseRows.length; i < noOfCourses; i++) {
            console.log('running for',courseRows)

            setCourseRows((old) => {
                // const [val, setVal] = useState('select');
                // var val = selectedGrade;
                return [...old,
                <tr>
                    <td style={{ width: '30%' }}>course {old.length + 1}</td>
                    <td style={{ width: '25%' }}>
                        <Form.Control required className='text-center mx-2' style={{ width: '85%' }} type="number" min='0'>
                        </Form.Control>
                    </td>
                    <td style={{ width: '25%' }}><Dropdown><Dropdown.Toggle
                        // title={selectedGrade[old.length] ? selectedGrade[old.length] : 'select'}
                        // title={val}
                        // as={ButtonGroup}
                        id="dropdown-basic"
                        // onSelect={(e) => {
                        //     console.log("selected")
                        // }}
                        onSelect={
                            () => {
                                // setVal('aas');
                                console.log('change')
                            }}
                    >
                        {/* <SelectedGrade arr={selectedGrade} index={old.length}/> */}
                        {selectedGrade[old.length]}

                    </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                gradesAsAlphabet.map((item, index) => {
                                    return <Dropdown.Item onClick={() => {
                                        let t = selectedGrade;
                                        t[old.length] = item;
                                        setSelectedGrade(t)
                                        console.log(selectedGrade)
                                    }}>
                                        {item}
                                    </Dropdown.Item>
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown></td>
                    <td style={{ width: '30%' }}>{passOrFail()}</td>
                </tr>];
            })
        }
    }, [noOfCourses, selectedGrade])

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
                        {
                            courseRows.map((item, index) => {
                                return item;
                            })
                        }
                    </tbody>
                    <tfoot >
                        <td colSpan={2} style={{ border: 'none' }}>
                            <Button onClick={() => setNoOfCourses((old) => old - 1)}
                                variant="danger" style={{ backgroundColor: "red" }}>
                                - Remove a course
                            </Button>
                        </td>
                        <td colSpan={2} style={{ border: 'none' }}>
                            <Button onClick={() => setNoOfCourses((old) => old + 1)}
                                variant="success" style={{ backgroundColor: "green" }}>
                                + Add a course
                            </Button>
                        </td>
                    </tfoot>
                </Table>
                <Button type="submit">Find my SGPA</Button>
            </Form>
        </>
    );
}
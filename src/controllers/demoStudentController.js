const { default: mongoose } = require('mongoose')

let DemoStudent = require('./../models/demoStudentModel')(mongoose)

let saveStudent = async (req, res) => {
    // Basic example for Save Student
    const { name, className } = req.body
    let newStudent = new DemoStudent({
        name: name,
        className: className
    })
    addedStudent = await newStudent.save()
    res.status(200).json({
        status: 200,
        message: "Student Saved Successfully",
        data: addedStudent
    })
}

let getStudents = async (req, res) => {
    // Basic example for get Students Logic
    const studentData = await DemoStudent.find()
    res.status(200).json({
        status: 200,
        message: "Student fetched Successfully",
        data: studentData
    })
}

let updateStudent = async (req, res) => {
    // Update Student Logic
    data = []
    res.status(200).json({
        status: 200,
        message: "Student Updated Successfully",
        data: data
    })
}

let removeStudent = async (req, res) => {
    // Remove Student Logic
    data = []
    res.status(200).json({
        status: 200,
        message: "Student Removed Successfully",
        data: data
    })
}

module.exports = {
    saveStudent: saveStudent,
    getStudents: getStudents,
    updateStudent: updateStudent,
    removeStudent: removeStudent
}
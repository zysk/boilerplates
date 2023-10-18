const { default: mongoose } = require('mongoose')

let DemoTeacher = require('../models/demoTeacherModel')(mongoose)

let saveTeacher = async (req, res) => {
    // Refer ./demoStudentController.js > saveStudent()
    data = []
    res.status(200).json({
        status: 200,
        message: "Teacher Saved Successfully",
        data: data
    })
}

let getTeacher = async (req, res) => {
    // Update Teacher Logic - Refer ./demoStudentController.js > getStudent()
    data = []
    res.status(200).json({
        status: 200,
        message: "Teacher Fetched Successfully",
        data: data
    })
}

let updateTeacher = async (req, res) => {
    // Update Teacher Logic
    data = []
    res.status(200).json({
        status: 200,
        message: "Teacher Updated Successfully",
        data: data
    })
}

let removeTeacher = async (req, res) => {
    // Update Teacher Logic
    data = []
    res.status(200).json({
        status: 200,
        message: "Teacher Removed Successfully",
        data: data
    })
}

module.exports = {
    saveTeacher: saveTeacher,
    getTeacher: getTeacher,
    updateTeacher: updateTeacher,
    removeTeacher: removeTeacher
}
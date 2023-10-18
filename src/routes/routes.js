const express = require('express')
const router = express.Router()

const demoStudentController = require('../controllers/demoStudentController');
const demoTeacherController = require('../controllers/demoTeacherController');

router.route('/student')
    .get(demoStudentController.getStudents)
    .post(demoStudentController.saveStudent)
    .put(demoStudentController.updateStudent)
    .delete(demoStudentController.removeStudent)

router.route('/teacher')
    .get(demoTeacherController.getTeacher)
    .post(demoTeacherController.saveTeacher)
    .put(demoTeacherController.updateTeacher)
    .delete(demoTeacherController.removeTeacher)

module.exports = router

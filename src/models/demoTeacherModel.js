
const mongoose = require('mongoose')

module.exports = () => {
    let demoTeacherSchema = mongoose.Schema(
        {
            name: {
                type: String,
                required: true
            },
            specialization: {
                type: String,
                required: true
            },
        }
    )
    const DemoTeacher = mongoose.model('DemoTeacher', demoTeacherSchema)
    return DemoTeacher
}
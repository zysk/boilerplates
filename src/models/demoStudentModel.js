
const mongoose = require('mongoose')

module.exports = () => {
    let demoStudentSchema = mongoose.Schema(
        {
            name: {
                type: String,
                required: true
            },
            className: {
                type: String,
                required: true
            },
        }
    )
    const DemoStudent = mongoose.model('DemoStudent', demoStudentSchema)
    return DemoStudent
}
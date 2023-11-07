import { model, Schema } from 'mongoose';

export const StudentDemo = model(
	'StudentDemo',
	new Schema({
		name: {
			type: String,
			required: true
		},
		className: {
			type: String,
			required: true
		},
	})
)

export const TeacherDemo = model(
	'TeacherDemo',
	new Schema({
		name: {
			type: String,
			required: true
		},
		specialization: {
			type: String,
			required: true
		},
	})
)
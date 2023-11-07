import express from 'express';
const app = express()
import dotenv from 'dotenv'
import mongoose from 'mongoose';

import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as  AdminJSMongoose from '@adminjs/mongoose';

import { STUDENT_DEMO_RESOURCE, TEACHER_DEMO_RESOURCE } from './src/resource.js';

dotenv.config({path: `env/.env.${process.env.NODE_ENV}`})

// Register the adapter.
AdminJS.registerAdapter({
	Resource: AdminJSMongoose.Resource,
	Database: AdminJSMongoose.Database
});

(async _ => {
	// Connect to the database.
	await mongoose.connect(process.env.MONGODB_URI);
	// Configuration of AdminJS.
	const adminJs = await new AdminJS({
		resources: [
			STUDENT_DEMO_RESOURCE,
			TEACHER_DEMO_RESOURCE
		]
	});
	
	// Build and use a router to handle AdminJS routes.
	const router = AdminJSExpress.buildRouter(adminJs);
	app.use(adminJs.options.rootPath, router);
})()

export default app;
import express from 'express';
import path from "path";
import ejsLayouts from 'express-ejs-layouts';
import jobControllers from './src/controllers/job.controller.js';
import nodemailer from 'nodemailer';
import { fileUpload } from './src/middleware/resume-upload.middleware.js';
import session from 'express-session';
import { auth, postJob } from './src/middleware/auth.middleware.js';
const server = express();
server.use(session({secret:'secretKey',resave:false,saveUninitialized:true,cookie:{secure:false}}))
const jobController = new jobControllers();
server.use(express.urlencoded({ extended: true }));
//setup view engine settings
server.set('view engine', 'ejs');
server.set("views",path.join(path.resolve(),"src","views"));
//parse data
// server.use(express.urlencoded({ extended: true }));  //Parse incoming requests with query strings (GET) or the body of POST
server.use(ejsLayouts);
server.use(express.static('public'));

server.get('/',jobController.viewFront);
server.get('/jobs',jobController.getJob);
server.get('/job/:id',jobController.details);
server.get('/applicants/:id',auth,jobController.users);

server.post('/apply/:id',fileUpload.single('resume'),jobController.updateUser)
server.post('/register',jobController.getRegister);
server.post("/login",jobController.loginUser);
server.get('/login',jobController.viewLogin);
server.get('/logout',jobController.logout);
server.get('/postjob',postJob,jobController.postJob);
server.post('/postjob',jobController.jobPosted);

server.listen(3500);
console.log("server is running on port 3500");

import JobModel from "../models/job.model.js";
import ApplicantModel from "../models/applicant.model.js";
import nodemailer from 'nodemailer';
import UserModel from "../models/user.model.js";

export default class jobControllers{
    viewFront(req,res){
        res.render('index',{userEmail:req.session.userEmail,userName:req.session.userName});
    }
    getJob(req,res){
        const jobss = JobModel.getAllJobs();
        // console.log(jobss);
        res.render('job',{jobs:jobss,userEmail:req.session.userEmail,userName:req.session.userName});
    }
    details(req,res){
        const id = req.params.id;
        const jobFound = JobModel.getById(id);
        if(jobFound){
            // console.log(jobFound);
        res.render('jobDetails',{jobs:jobFound,userEmail:req.session.userEmail,userName:req.session.userName});
        }
        else{
            res.send('job not found');
        }
    }
    users(req,res){
        const id = req.params.id;
        const applicants = ApplicantModel.getApplicants();
        res.render('allusers',{applicants:applicants,userEmail:req.session.userEmail,userName:req.session.userName})
        // res.render('404',{message:"only recruiter is allowed to access this page, login as recruiter to continue"});
    }
    updateUser(req,res){
        const id = req.params.id;
        
        const {name,email,contact}=req.body;
        const resume = 'resume/'+req.file.filename;
        ApplicantModel.addApplicants(name,email,contact,resume);
        console.log(req.body);
        let user = ApplicantModel.getApplicants();
        console.log(user);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'cnanjali9@gmail.com',
              pass: 'klfx fgre pkxe fxdu'
            }
        })
        var mailOptions = {
          from: 'cnanjalijha@gmail.com', // sender address
          to: email, // list of receivers
          subject: "Job Application Received", // Subject line
          text:'Dear User, Thank You for applying to a job at Easily. We have received your application and are currently reviewing it. If your qualifications match our requirements, we will contact you for the next steps of the selection process. Thank you for your interesr in joining our team! Best regards, The Easily Team',
        };
        transporter.sendMail(mailOptions, function(err, info){
           if (err) {
             console.log(err)
           }else{
               console.log("Email sent: ",info.envelope); 
           }
        });
        const jobFound = JobModel.getById(id);
        if(jobFound){
            jobFound.applicants+=1;
            jobFound.numberOfOpenings-=1;

        }
        const jobss = JobModel.getAllJobs();
        // console.log(jobss);
        res.render('job',{jobs:jobss,userEmail:req.session.userEmail,userName:req.session.userName});
    }
    getRegister(req,res){
        // console.log(req.body);
        const {name,email,password}= req.body;
        UserModel.addUser(name,email,password);
        res.render('login',{userEmail:req.session.userEmail});


    }
    loginUser(req,res){
        const {email, password} = req.body;
        const user = UserModel.isPresent(email,password);
        // console.log(user.name);
        if(user){
            req.session.userEmail = email;
            req.session.userName = user.name;
            const jobss = JobModel.getAllJobs();
        // console.log(jobss);
        res.render('job',{jobs:jobss,userEmail:req.session.userEmail,userName:req.session.userName});
        }
        else{
            res.render("404",{message:"Invalid Credentials"});
        }

    }
    viewLogin(req,res){
        res.render('login');
    }
    logout(req,res){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/login');
            }

        })
    }
postJob(req,res){
    res.render('postjob',{userEmail:req.session.userEmail,userName:req.session.userName});
}
jobPosted(req,res){
    // console.log(req.body);
    // console.log(req.body.skills_required);
    // const {job_category,job_designation,job_location,company_name,salary,number_of_openings,skills_requried,apply_by}= req.body;
    JobModel.addJobs(req.body.job_designation,req.body.job_location,req.body.company_name,req.body.salary,req.body.number_of_openings,req.body.skills_required,req.body.apply_by);
    const jobss = JobModel.getAllJobs();
        console.log(jobss);
        res.render('job',{jobs:jobss,userEmail:req.session.userEmail,userName:req.session.userName});
        

    

}
    
}
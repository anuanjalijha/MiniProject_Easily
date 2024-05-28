export const auth = (req,res,next)=>{
    if(req.session.userEmail){
        next();
    }else{
        return res.render('404',{message:"only recruiter is allowed to access this page, login as recruiter to continue"});
    }
}
export const postJob = (req,res,next)=>{
    if(req.session.userEmail){
        next();
    }else{
        return res.render('404',{message:"only recruiter is allowed to access this page, login as recruiter to continue"});
    }
}

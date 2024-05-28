export default class JobModel{
    constructor(_id,_jobCategory,_jobLocation,_companyName,_salary,_applyBy,_skills,_numberOfOpenings,_jobPosted,_applicants){
        this.id = _id;
        this.jobCategory=_jobCategory;

        this.jobLocation = _jobLocation;
        this.companyName= _companyName;
        this.salary = _salary;
        this.applyBy = _applyBy;
        this.skills = _skills;
        this.numberOfOpenings=_numberOfOpenings;
        this.jobPosted = _jobPosted;
        this.applicants = _applicants;
    }
    static addJobs(job_designation,job_location,company_name,salary,number_of_openings,skills_required,apply_by){
        let job = new JobModel(jobs.length+1,job_designation,job_location,company_name,salary,apply_by,skills_required,number_of_openings,new Date().toLocaleString(),0);
        jobs.push(job);
    }
    static getAllJobs(){
        return jobs;
    }
    static getById(id){
        return jobs.find((j)=>j.id==id);
    }
}
let jobs = [new JobModel(1,'SDE','Gurgaon HR IND Remote','Coding Ninjas','14-20lpa','30 Aug 2023',['REACT','NodeJs','JS','SQL','MongoDB','Express','AWS'],5,new Date().toLocaleString(),1),
new JobModel(2,'Angular Developer','Pune IND On-Site','Go Digit','6-10lpa','30 Aug 2023',['Angular','JS','SQL','MongoDB','Express','AWS'],7,new Date().toLocaleString(),0),
new JobModel(3,'SDE','Bangalore IND','Juspay','20-26lpa','30 Aug 2023',['REACT','NodeJs','JS','SQL','MongoDB','Express','AWS'],3,new Date().toLocaleString(),0)]

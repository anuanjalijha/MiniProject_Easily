export default class ApplicantModel{
  constructor(_applicantId,_name,_email,_contact,_resumePath){
    this.applicantId = _applicantId;
    this.name=_name;
    this.email=_email;
    this.contact=_contact;
    this.resumePath=_resumePath;
  } 
  static addApplicants(name,email,contact,resumePath) {
    let applicant = new ApplicantModel(applicants.length+1, name, email, contact, resumePath);
    applicants.push(applicant);
  }
  static getApplicants(){
    return applicants;
  }
}
let applicants = [];
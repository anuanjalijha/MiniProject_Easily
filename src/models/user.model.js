export default class UserModel{
    constructor(id,name,email,password){
        this.id = id;
        this.name = name;
        this.email= email;
        this.password = password;
    }
    static getUser(){
        return users;
    } 
    static addUser(name,email,password){
        let user = new UserModel(users.length+1,name,email,password);
        users.push(user);

    }
    static isPresent(email,password){
       const result= users.find((u)=>u.email==email && u.password==password);
       return result;
    }

}
let users = []
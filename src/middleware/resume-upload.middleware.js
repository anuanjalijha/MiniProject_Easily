import multer from "multer";
const storageConfig = multer.diskStorage({
    destination:(req, file, cb)=> {
        // The destination is a folder in the project root directory named 'uploads'
        cb(null, 'public/resume/');  
    },
    filename:(req,file,cb)=>{
        const name = Date.now()+"-"+file.originalname;
        cb(null,name);

    },
})
export const fileUpload = multer({storage:storageConfig});
import multer from "multer";
import path from "path"
import { v4 as uuidv4 } from 'uuid';
const storage=multer.diskStorage({
    destination:"uploads/",
    filename:function(req,file,callback){
        const randomeText=uuidv4();
        const filename=randomeText;
        const ext=path.extname(file.originalname);
        callback(null,filename+ext);
    }
})
const upload=multer({storage});
export default upload;
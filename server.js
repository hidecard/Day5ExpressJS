const express = require('express');
const bodyparser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(bodyparser.urlencoded({ extended: true }));

app.post('/submit',(req,res)=>{
    const {name , email } = req.body;

    if(!name || !email ){
        return res.send('Please fill in all the fields');
    }
    res.send(`Form submitted successfully <br> Name : ${name} <br> Email : ${email}`);

})

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});

app.post('/upload',upload.single('file'),(req,res)=>{
    if (!req.file) { 
        return res.send("No file uploaded!"); 
    } 
    res.send('File uploaded successfully!');

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
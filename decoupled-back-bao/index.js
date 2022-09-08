const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());


let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
	
const upload = require("multer")();

app.post("/api/post", upload.single('excel'), (req,res,next) => {
    const name = req.body.name;
    const email = req.body.email;
    const comment = req.body.comment;
    const excel = req.file;
    require("./mailer")(email, name, comment, excel)
    .then(response => res.json(response))
    .catch(error => res.json(error));
});

import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import mysql from 'mysql2';
import flash from 'express-flash';
import session from 'express-session';

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'atulya',
    database: 'express'
});

if(conn){
    console.log('Connected to MySQL');
}else{
    console.log('Error connecting to MySQL');
}

const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join('uploads')))
app.use(flash())

app.use(session({
    cookie:{maxAge:2000},
    secret:'secret',
    resave:false,
    saveUninitialized: true,
}));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({storage:storage});

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/home',(req,res)=>{
    res.render('pages/home')
})

app.get('/add_student',(req,res)=>{
    res.render('pages/add_student')
})

app.post('/student_submit',upload.single("image"),(req,res)=>{
    const roll_number = req.body.roll_number;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const file_name = req.file?.filename;

    const sql = "insert into student(roll_number,first_name,last_name,email,phone_number,student_pic) values(?,?,?,?,?,?)";
    conn.query(sql,[roll_number,first_name,last_name,email,phone_number,file_name],(err,result)=>{
        if(err){
            console.log(err.message);
        }else{
            // console.log(result);
            req.flash('success','Successfully Add in Database.!!')
            res.redirect("/add_student");
        }
   });

});

app.post('/search_student',(req,res)=>{
    try{
        const roll_number = req.body.roll_number;
        const sql = "select * from student where roll_number=?";
        conn.query(sql,[roll_number],(err,student)=>{
            if(err){
                console.log(err.message);
            } else{
                res.render('index',{student})
            }  
        });
    }catch(err){
    console.log(err);
    res.render('pages/error_page',{err:err})
  }
})

app.get('/show_student', (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 3;
    const offset = (page - 1) * limit;

    conn.query('SELECT COUNT(*) AS count FROM student', (err, data: mysql.RowDataPacket[]) => {
        if (err) throw err;
        const totalUsers = data[0].count as number;
        const totalPages = Math.ceil(totalUsers / limit);
        conn.query(`SELECT * FROM student LIMIT ${limit} OFFSET ${offset}`, (err, student) => {
            if (err) throw err;
            res.render('pages/show_student', {
                student: student,
                currentPage: page,
                totalPages: totalPages
            });
        });
    });
});



app.get('/delete_student/:roll_number',(req,res)=>{
    const roll_number = req.params.roll_number;
    const sql = "delete from student where roll_number=?";
    conn.query(sql,[roll_number],(err,result)=>{
        if(err){
            console.log(err.message);
        } else{
            console.log(result);
            req.flash('success','Successfully Delete from Database..!!')
            res.redirect("/show_student");
        }
    });
})

app.get('/edit_student/:roll_number',(req,res)=>{
    const roll_number = req.params.roll_number;
    let sql = "select * from student where roll_number=?";
    conn.query(sql,[roll_number],(err,result)=>{
        if(err){
            console.log(err.message);
        } else{
            res.render('pages/edit_student',{student:result})
        }
    });
});

app.post('/update_student/:roll_number',upload.single("image"),(req,res)=>{
    const roll_number = req.params.roll_number;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const file_name = req.file?.filename;
    let sql = "update student set first_name=?,last_name=?,email=?,phone_number=?,student_pic=? where roll_number=?";
    conn.query(sql,[first_name,last_name,email,phone_number,file_name,roll_number],(err,result)=>{
        if(err){
            console.log(err.message);
        } else{
            console.log(result);
            req.flash('success','Succesfully Update value in Database..!!')
            res.redirect("/show_student");
        }
    });
});


const PORT = 3500;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
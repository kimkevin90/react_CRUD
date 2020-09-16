const fs = require('fs'); //database.json파일에 접근하기 위해 fs불러옴
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

const multer = require('multer');
//upload 폴더를 사용자의 파일이 업로드가 되는 공간으로 설정하겠다.
const upload = multer({ dest: './upload' })
app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER",
    (err, rows, fields) => {
      res.send(rows);
    }
  )
})

app.use("/image", express.static("./upload"))

app.post('/api/customers', upload.single('image'), (req, res) => {
  //null을 쓴 이유는 id값은 데이터베이스에 자동으로 등록 되기 때문이다.
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
  //image라는 변수로 실제로 프로필 이미지에 바이너리 데이터를 서버에 전송 하니까
  //그것을 받아올것임.
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  console.log(name)
  console.log(image)
  console.log(birthday)
  console.log(gender)
  console.log(job)
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(err)
    })
})

app.listen(port, () => console.log(`Listening on ${port}`))


// app.get('/api/hello', (req, res) => {
//   res.send({ message: 'Hello Express!' });
// });

//[
//  {
//    'id': 1,
//    'image': 'https://placeimg.com/64/64/1',
//    name: '임지섭',
//    'birthday': 910101,
//    'gender': '남자',
//    'job': '대학생'
//  },
//  {
//    'id': 2,
//    'image': 'https://placeimg.com/64/64/2',
//    name: '신유라',
//    'birthday': 913201,
//    'gender': '여자',
//    'job': '개발생'
//  },
//  {
//    'id': 3,
//    'image': 'https://placeimg.com/64/64/3',
//    name: '김진욱',
//    'birthday': 9143101,
//    'gender': '남자',
//    'job': '엔지니생'
//  }
//]

//app.get('/api/customers', (req, res) => {
//  connection.query(
//    'SELECT * FROM CUSTOMER',
//    (err, rows, fields) => {
//      res.send(rows);
//    }
//  )
//});
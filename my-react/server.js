const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.get('/api/hello', (req, res) => {
//  res.send({ message: 'Hello Express!' });
//});



app.get('/api/customers', (req, res) => {
  res.send([
    {
      'id': 1,
      'image': 'https://placeimg.com/64/64/1',
      name: '임지섭',
      'birthday': 910101,
      'gender': '남자',
      'job': '대학생'
    },
    {
      'id': 2,
      'image': 'https://placeimg.com/64/64/2',
      name: '신유라',
      'birthday': 913201,
      'gender': '여자',
      'job': '개발생'
    },
    {
      'id': 3,
      'image': 'https://placeimg.com/64/64/3',
      name: '김진욱',
      'birthday': 9143101,
      'gender': '남자',
      'job': '엔지니생'
    }
  ]);
});

app.listen(port, () => console.log(`Listening on ${port}`))
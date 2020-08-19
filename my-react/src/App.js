import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer'

const customers = [
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
  },
]

class App extends Component {
  render() {
    return (
      //props 이용해서 데이터 전달해보기
      //<div>
      //  <Customer
      //    id={customers[0].id}
      //    image={customers[0].image}
      //    name={customers[0].name}
      //    birthday={customers[0].birthday}
      //    gender={customers[0].gender}
      //    job={customers[0].job}
      //  />
      //  <Customer
      //    id={customers[1].id}
      //    image={customers[1].image}
      //    name={customers[1].name}
      //    birthday={customers[1].birthday}
      //    gender={customers[1].gender}
      //    job={customers[1].job}
      //  />
      //  <Customer
      //    id={customers[2].id}
      //    image={customers[2].image}
      //    name={customers[2].name}
      //    birthday={customers[2].birthday}
      //    gender={customers[2].gender}
      //    job={customers[2].job}
      //  />
      //</div>
      <div>
        {
          customers.map(c => {
            return (
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            )
          })
        }
      </div>
    )
  }
}

export default App;




import React, { Component } from 'react';
import './App.css';
import ExCustomer from './components/ExCustomer'




//import Customer from './components/Customer'
import CustomerAdd from './components/CustomerAdd'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
//
//const styles = theme => ({
//  root: {
//    width: '100%',
//    marginTop: theme.spacing(3),
//    overflowX: 'AUTO'
//  },
//  table: {
//    minWidth: 1080,
//  },
//  progress: {
//    margin: theme.spacing(2)
//  }
//})
//
//
//class App extends Component {
//
//  state = {
//    customers: "",
//    completed: 0
//  }
//
//  componentDidMount() {
//    this.timer = setInterval(this.progress, 20);
//    this.callApi()
//      .then(res => this.setState({ customers: res }))
//      .catch(err => console.log(err));
//  }
//
//  callApi = async () => {
//    const response = await fetch('/api/customers')
//    const body = await response.json()
//    return body;
//  }
//
//  progress = () => {
//    const { completed } = this.state;
//    this.setState({ completed: completed > 100 ? 0 : completed + 1 })
//  }
//
//  render() {
//    const { classes } = this.props;
//    return (
//      //props 이용해서 데이터 전달해보기
//      //<div>
//      //  <Customer
//      //    id={customers[0].id}
//      //    image={customers[0].image}
//      //    name={customers[0].name}
//      //    birthday={customers[0].birthday}
//      //    gender={customers[0].gender}
//      //    job={customers[0].job}
//      //  />
//      //  <Customer
//      //    id={customers[1].id}
//      //    image={customers[1].image}
//      //    name={customers[1].name}
//      //    birthday={customers[1].birthday}
//      //    gender={customers[1].gender}
//      //    job={customers[1].job}
//      //  />
//      //  <Customer
//      //    id={customers[2].id}
//      //    image={customers[2].image}
//      //    name={customers[2].name}
//      //    birthday={customers[2].birthday}
//      //    gender={customers[2].gender}
//      //    job={customers[2].job}
//      //  />
//      //</div>
//      <div>
//        <Paper className={classes.root}>
//          <Table className={classes.table} >
//            <TableHead>
//              <TableRow>
//                <TableCell>번호</TableCell>
//                <TableCell>이미지</TableCell>
//                <TableCell>이름</TableCell>
//                <TableCell>생년월일</TableCell>
//                <TableCell>성별</TableCell>
//                <TableCell>직업</TableCell>
//              </TableRow>
//            </TableHead>
//            <TableBody>
//              {this.state.customers ? this.state.customers.map(c => {
//                return (
//                  <Customer
//                    key={c.id}
//                    id={c.id}
//                    image={c.image}
//                    name={c.name}
//                    birthday={c.birthday}
//                    gender={c.gender}
//                    job={c.job}
//                  />
//                )
//              }) :
//                <TableRow>
//                  <TableCell colSpan="6" align="center">
//                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
//                  </TableCell>
//                </TableRow>
//              }
//            </TableBody>
//          </Table>
//        </Paper>
//        <CustomerAdd />
//      </div>
//    )
//  }
//}
//
//export default withStyles(styles)(App);








const styles = theme => ({
  root: {
    width: '100%',
    //위쪽 여백 3의 가중치
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    //테이블 화면 최소 크기 1080이다.
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
})

//const customer = [
//  {
//    id: 1,
//    image: 'https://placeimg.com/65/65/1',
//    'name': '최섭',
//    'birthday': '910101',
//    'gender': '남자',
//    'job': '대학생'
//  },
//  {
//    id: 2,
//    image: 'https://placeimg.com/65/65/2',
//    'name': '지섭',
//    'birthday': '910101',
//    'gender': '남자',
//    'job': '대학생'
//  },
//  {
//    id: 3,
//    image: 'https://placeimg.com/65/65/3',
//    'name': '임섭',
//    'birthday': '910101',
//    'gender': '남자',
//    'job': '대학생'
//  }
//]

class App extends Component {
  //서버에서 데이터를 받아오므로 변경하기위해 state사용
  state = {
    customers: "",
    //progress bar는 0%~100%까지 게이지가 찬다. 그래서 completed변수로 처음 0 지정
    completed: 0
  }
  //api서버에 접근을 해서 데이터를 받아오는 등의 작업은 componentDidMount()에서 비동기적으로 처리 해줄 수 있다.
  componentDidMount() {
    //0.02초마다 progress함수가 실행되게함
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err))
  }

  callApi = async () => {
    //react의 로컬호스트 api customers에 json형태로 출력이되고 그것을 body에 넣어준 후 리턴한다.
    //이후 then으로 body를 불러와서 결과적으로 res라는 이름으로 변수의 이름이 바뀜
    const response = await fetch('/api/customers')
    const body = await response.json();
    return body;
  }
  //progress라는 함수로 애니메이션 만들기
  progress = () => {
    const { completed } = this.state;
    //competed변수가 100이상이면 0으로 다시만들고 그렇지 않으면 1씩 증가할것임
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* 아무리 컴퓨터가 빨라도 초기 this.state.customers의 값음 ""이므로 오류가 발생한다. */}
              {this.state.customers ? this.state.customers.map(c => {
                return (
                  <ExCustomer
                    key={c.id}
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
                )
                //기존에 데이터가 없을때는 ""였는데 여기에 progress bar 적용한다.
              }) :
                <TableRow>
                  <TableCell colSpan='6' align='center'>
                    <CircularProgress className={classes.progress} variant='determinate' value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd />
      </div>
    );
  }
}

export default withStyles(styles)(App);
import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'AUTO'
  },
  table: {
    minWidth: 1080
  }
})


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
    const { classes } = this.props;
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
      <Paper className={classes.root}>
        <Table className={classes.table} >
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
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(App);




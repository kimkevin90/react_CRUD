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
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';







const styles = theme => ({
  root: {
    width: '100%',
    //위쪽 여백 3의 가중치
    minWidth: 1080,
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  tableHead: {
    fontSize: '1em'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
})



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword: ''
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword: ''
    });
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err))
  }

  ////서버에서 데이터를 받아오므로 변경하기위해 state사용
  //state = {
  //  customers: "",
  //  //progress bar는 0%~100%까지 게이지가 찬다. 그래서 completed변수로 처음 0 지정
  //  completed: 0
  //}
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

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    const filteredComponets = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <ExCustomer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
      });
    }
    const { classes } = this.props;
    const cellList = ["번호", "이미지", "이름", "생년월일", "성별", "직업", "설정"];
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              고객관리시스템
          </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
                {/* <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>설정</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* 아무리 컴퓨터가 빨라도 초기 this.state.customers의 값음 ""이므로 오류가 발생한다. */}
              {this.state.customers ?
                filteredComponets(this.state.customers) :
                <TableRow>
                  <TableCell colSpan='6' align='center'>
                    <CircularProgress className={classes.progress} variant='determinate' value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>

      </div>
    );
  }
}

export default withStyles(styles)(App);
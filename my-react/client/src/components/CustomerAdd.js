import React from 'react';
import { post } from 'axios';




class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //시용자의 이미지형태를 file형태로 보내야하므로 file에는 null값넣는다. 나머지는''로 초기화한다.
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: ''
    }
  }



  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value
    })
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    this.addCustomer()
      .then((response) => {
        console.log(response.data);
      })
    this.setState({
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: ''
    })
    window.location.reload();
  }
  //addcustomer를 통해서 api의 주소로 데이터를 보낼 수 있도록 함
  addCustomer = () => {
    const url = '/api/customers';
    const formData = new FormData();
    formData.append('image', this.state.file)
    formData.append('name', this.state.userName)
    formData.append('birthday', this.state.birthday)
    formData.append('gender', this.state.gender)
    formData.append('job', this.state.job)
    //파일이 포함되어있는 데이터를 서버로 전송시에는 웹표준에 맞는 헤더를 추가해야함
    //multipart/form-data의 경우는 전달하고자 하는 데이터에 파일이 포함되고 있을때 설정해줘야되는 요소
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config);
  }

  render() {
    return (
      //버튼 누를시 handleFormSubmit 수행한다.
      //또한 name속성을 주어 실제로 서버에 데이터가 전달될때는 name값을 기준으로해서 변수가 들어가게 된다.
      //즉 서버쪽에서는 파일이라는 변수를 이용해서 해당 프로필 이미지에 해당하는 파일 값을 받아올 수 있다.
      //이후 실제로 사용자가 파일을 업로드해서 보낼 준비가 되었을 때는 그에 대한 처리 결과를 사용자에게 보여줄 수 있도록 하기 위해서 
      //handleFileChange라는 이름의 함수를 불러온다.
      <form onSubmit={this.handleFormSubmit}>
        <h1>고객 추가</h1>
        프로필 이미지: <input type='file' name='file' file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br />
        이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />
        생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br />
        성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />
        직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br />
        <button type="submit">추가하기</button>
      </form>
    )
  }
}

export default CustomerAdd;
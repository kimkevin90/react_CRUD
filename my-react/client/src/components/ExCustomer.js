import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';

class ExCustomer extends React.Component {
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell><img src={this.props.image} alt='profile' /></TableCell>
        <TableCell>{this.props.name}</TableCell>
        <TableCell>{this.props.birthday}</TableCell>
        <TableCell>{this.props.gender}</TableCell>
        <TableCell>{this.props.job}</TableCell>
        <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id} /></TableCell>
      </TableRow>
    )
  }
}






/*구조화 방법 그리고 이제 머터리열 ui로 넘어갈것이다. */
// class ExCustomer extends Component {
//   render() {
//     return (
//       <div>
//         <ExCustomerProfile id={this.props.id} image={this.props.image} name={this.props.name} />
//         <ExCustomerInfo birthday={this.props.birthday} gender={this.props.gender} job={this.props.job} />
//       </div>
//     )
//   }
// }

// class ExCustomerProfile extends Component {
//   render() {
//     return (
//       <div>
//         <img src={this.props.image} alt='profile' />
//         <h2>{this.props.name}({this.props.id})</h2>
//       </div>
//     )
//   }
// }

// class ExCustomerInfo extends Component {
//   render() {
//     return (
//       <div>
//         <p>{this.props.birthday}</p>
//         <p>{this.props.gender}</p>
//         <p>{this.props.job}</p>
//       </div>
//     )
//   }
// }


export default ExCustomer;
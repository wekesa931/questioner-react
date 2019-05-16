import React from 'react';
import axios from 'axios';

// class  extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {  }
//     }
//     render() { 
//         return (  );
//     }
// }
 
// export default ;

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: ''
        }
    }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
  
    this.setState({
        [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    let formData = new FormData

    formData.set("username", this.state.username);
    formData.set("password", this.state.password);
    let obj = {}
    formData.forEach((value, key)=>{
        obj[key] = value
    });
    console.log(obj)
    axios.post(`https://questionerapplication.herokuapp.com/api/v2/user/auth/login`, obj)
      .then(res => {
        localStorage.setItem('currentuser',res.data['token']);
        console.log(res);
        this.props.history.push('/home')
         
        
      })
      .catch(
          err=>{
            console.log('bad request',err);
            console.log(err.message);
          }
      )
  }

  render() {
      let contr = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="username" value={contr.username} placeholder="Username" onChange={this.handleChange}/><br/>
            <input type="text" name="password" value={contr.password} placeholder="Password" onChange={this.handleChange}/>
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}
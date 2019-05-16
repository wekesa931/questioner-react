import React from 'react';
import axios from 'axios';

export default class Auths extends React.Component {
  state = {
        firstname: '',
        lastname: '',
        othername: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: ''
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
    for(let key in this.state){
        formData.set(`${key}`, this.state[key]);
    }

    let obj = {}
    formData.forEach((value, key)=>{
        obj[key] = value
    });
    axios.post(`https://questionerapplication.herokuapp.com/api/v2/user/auth/signup`, obj)
      .then(res => {
        console.log(res);
        this.props.history.push('/auth/signin')
      })
      .catch(
          err=>{
            console.log(err);
            console.log(err.message);
          }
      )
  }

  render() {
    const { firstname, lastname, othername, username, email, phoneNumber, password } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="firstname" value={firstname} placeholder="First name" onChange={this.handleChange}/><br/>
            <input type="text" name="lastname" value={lastname} placeholder="Last name" onChange={this.handleChange}/><br/>
            <input type="text" name="othername" value={othername} placeholder="Other name" onChange={this.handleChange}/><br/>
            <input type="text" name="username" value={username} placeholder="Username" onChange={this.handleChange}/><br/>
            <input type="email" name="email" value={email} placeholder="Email" onChange={this.handleChange}/><br/>
            <input type="text" name="phoneNumber" value={phoneNumber} placeholder="Phone number" onChange={this.handleChange}/><br/>
            <input type="password" name="password" value={password} placeholder="Password" onChange={this.handleChange}/>
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}
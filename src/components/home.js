import React from 'react';
import instance from '../helpers/helpers';

export default class Home extends React.Component {
  state = {
        rendered: ''
  }

  componentDidMount(){
    instance.get(`https://questionerapplication.herokuapp.com/api/v2/meetups`)
    .then(res => {
        let meetups = res.data.meetups;
        let mtpitem = []
        meetups.map((meetup)=>{
        
            return mtpitem.push(
                <div key={meetup.id}>
                    <img src={meetup.image} height="42" width="42"/>
                    <h5>{meetup.topic}</h5>
                    <h6>{meetup.createdon} happening at {meetup.happeningat}</h6>
                    <p>Happening on {meetup.happeningon}</p>
                    <p>Location: {meetup.location} Reservation:{meetup.rsvp}</p>
                    <p>tags: {meetup.tags}</p>
                    <hr/>
                </div>
            )
            
        });
        console.log(mtpitem)
        this.setState({
            rendered:mtpitem
        })
    })
    .catch(
        err=>{
          console.log('bad request',err);
          console.log(err.message);
        }
    )

  }

  render() {
    return (
      <div>
        {this.state.rendered}
      </div>
    )
  }
}
import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; //styling from the date picker

class EditExercise extends Component {
  constructor(props) {
    super(props); //call super when defining the constructor of a sup-class

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: []
    };
  }

  // // ... automatically be called before anything is displayed on the page
  componentDidMount() {
    // this.props.match.params.id is getting the id directly from the url
    axios.get(`http://localhost:5000/excersice/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date:  new Date(res.data.date)
        })
      })
      .catch(err => {
      console.log(err)
    })


    axios.get("http://localhost:5000/users/").then(res => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map(user => user.username)
        });
      }
    });
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  };

  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value
    });
  };

  onChangeDuration =(e) => {
    this.setState({
      duration: e.target.value
    });
  };

  //we will use a callender from bootstrap so and attach a method passong it to this
  onChangeDate = (date) => {
    this.setState({
      date: date
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    //you can create variable inside a method if you are goint to use only in it
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    // using axios to post it to the data base
    console.log(exercise);

    axios.post(`http://localhost:5000/excersice/update/${this.props.match.params.id}`, exercise) //Note we are using the database server port not the frontend port
      .then(res => console.log(res.data));

    window.location = "/"; //take you back to the home page (Note need to learn more about windows.)
  };

  render() {
    return (
      <div>
        <h3> Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(user => {
                return (
                  <option key={user} value={user}>
                    {" "}
                    {user}{" "}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="number"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>

          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
              onChange={this.onSubmit}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditExercise;

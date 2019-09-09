import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';


function Exercise(props) {
    return (
        <tr>
            <td>{props.execer.username}</td>
            <td>{props.execer.description}</td>
            <td>{props.execer.duration}</td>
            <td>{props.execer.date.substring(0,10)}</td>
            <td>
                {/* call deleteExercise(and pass in the id) */}
                <Link to={`/edit/${props.execer._id}`} >Edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.execer._id)} } >delete</a>
            </td>
       </tr>
    )
}

class ExercisesList extends Component{
    constructor(props){
    super(props);
    this.state = {
            exercise: []
       }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/excersice")
            .then(res => this.setState({
            exercise: res.data
        }))
        .catch(err => console.log(err))
    }

    deleteExercise = (id) => {
        axios.delete(`http://localhost:5000/excersice/${id}`) //delete from database
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        
        this.setState({
          exercise: this.state.exercise.filter(el => el._id !== id)
        });
    }

    render() {
        return(
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.exercise.map(execer => {
                                return <Exercise key={execer._id} execer={execer} deleteExercise={this.deleteExercise} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}


export default ExercisesList;



//  render() {
//         return(
//             <div>
//                 <ul>
//                     {
//                         this.state.exercise.map(execer => {
//                             return <li key={execer._id}>{execer.username}</li>
//                         })
//                     }
//                </ul>
//             </div>
//         );
//     }
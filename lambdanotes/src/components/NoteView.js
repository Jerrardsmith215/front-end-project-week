import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { editNote, deleteNote } from '../actions'



//This component shall display a note from the database.
//NoteView shall have two buttons: "edit" & "delete"
//The buttons will trigger an aciton that will delete/edit the note.
class NoteView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNote: [],
            title: '',
            textBody: ''
        }
    }

    deleteHandler = event => {
        event.preventDefault();
        const killNote = { id: this.props.match.params.id }
        this.props.deleteNote(killNote)
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    routerLink = () => {
        return `/notes/edit/${this.props.match.params.id}`
    }

    componentDidMount() {
        axios
            .get(`https://fe-notes.herokuapp.com/note/get/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    currentNote: res.data
                })
            })
    }

    render() {
        return (
            <div className="viewnote">
                <div className="button-box">
                    <Link className="edit-link" to={this.routerLink}><button id="edit">edit</button></Link>
                    <button onClick={this.deleteHandler} id="delete">delete</button>
                </div>

                <div className="viewnote-content">
                    <h2>{this.state.currentNote.title}</h2>
                    <p>{this.state.currentNote.textBody}</p>
                </div>
            </div>
        )
    }
}

export default connect(null, { editNote, deleteNote })(NoteView);
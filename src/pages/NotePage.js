import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as ArrowLeft } from '../assets/chevron-left.svg'

const NotePage = () => {
    const navigate = useNavigate();

    let { id } = useParams();
    let [note, setNote] = useState(null);

    useEffect(() => {
        getNote();
    },[id])

    const getNote = async () => {
        if(id === 'new'){
            return
        }
        let response = await fetch(`/api/notes/${id}/`);
        let data = await response.json();
        setNote(data);
    }

    const creatNote = async () => {
        fetch(`/api/notes/create/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(note)
        })
    }

    const updateNote = async () => {
        fetch(`/api/notes/${id}/update/`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(note)
        })
    }

    const deleteNote = async () => {
        fetch(`/api/notes/${id}/delete/`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        navigate('/');
    }

    const handleSubmit = () => {
        if(id !== 'new' && !note.body) {
            deleteNote();
        } else if(id !== 'new') {
            updateNote();
        } else if(id === 'new' && note) {
            creatNote();
        }
        navigate('/');
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to='/'>
                        <ArrowLeft onClick={handleSubmit} />
                    </Link>
                </h3>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ): (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea onChange={(e) => setNote({...note, 'body': e.target.value})} value={note?.body}></textarea>
        </div>
    );
}

export default NotePage
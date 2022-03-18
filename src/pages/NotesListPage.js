import React from 'react'
import { useState, useEffect } from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'

const NotesListPage = () => {

  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  },[])

  let getNotes = async () => {
      let respone = await fetch('/api/notes/');
      let data = await respone.json();
      setNotes(data);
  }

  return (
    <div className="notes">
      <div className="notes-header">
          <h2 className="notes-title">&#9782; Notes</h2>
          <div className="notes-count">{notes.length}</div>
      </div>
      <div className="notes-list">
          {notes.map((note, index) => (
              <ListItem key={index} note={note} />
          ))}
      </div>
      <AddButton />
    </div>
  )
}

export default NotesListPage

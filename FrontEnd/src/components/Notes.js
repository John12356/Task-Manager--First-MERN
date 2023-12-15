import React, { useEffect, useMemo, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import "./styles/notes.css";
import Note from "./Note";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
axios.defaults.withCredentials = true;

const Notes = ({ notes, setNotes, toast }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Aos.init({ duration: 1000 });
    console.log("3");
    axios
      .get(`${process.env.REACT_APP_API_URL}/note/getNote`)
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => console.log(err));
  }, [setNotes]);

  const filteredItems = useMemo(() => {
    return notes.filter((eachItem) => {
      return eachItem.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [notes, searchQuery]);

  const addNote = (e) => {
    e.preventDefault();
    if (noteTitle === "") {
      toast.error("Please enter title");
      return;
    }
    const id = crypto.randomUUID();
    const title = noteTitle;
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toLocaleTimeString();
    const newNote = {
      id: id,
      noteText: "",
      date: date,
      time: time,
      title: title,
    };
    setNotes([...notes, newNote]);
    setNoteTitle("");
  };

  return (
    <div className="notes-body" data-aos="zoom-in">
      <div className="search-bar">
        <h1>notes</h1>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          placeholder="Search"
        />
        <button id="search-bt">
          <BiSearchAlt2 size={22} />
        </button>
      </div>
      <form className="form-row">
        <input
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          type="text"
          className="todo-ip"
          placeholder="Enter title"
        />
        <button onClick={addNote} id="note-add-bt">
          {"+New Note"}
        </button>
      </form>
      <div className="notes-div" data-aos="zoom-out">
        {filteredItems.map((note) => (
          <Note
            key={note.id}
            val={note}
            notes={notes}
            setNotes={setNotes}
            toast={toast}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;

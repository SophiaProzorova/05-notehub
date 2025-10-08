import type { Note } from "../../types/note";

import css from "./NoteList.module.css";

interface NoteListProps {
  noteList: Note[],
  onDeleteButtonClick: (note: Note) => Promise<void>,
}

const NoteList = ({noteList, onDeleteButtonClick}: NoteListProps) => {
  
  return (
    <ul className={css.list}>
        {noteList.map((note)=>{
          console.log(note.id)
          return(
            <li className={css.listItem} key={note.id}>
                <h2 className={css.title}>{note.title}</h2>
                <p className={css.content}>{note.content}</p>
                <div className={css.footer}>
                    <span className={css.tag}>{note.tag}</span>
                    <button className={css.button} onClick={()=>onDeleteButtonClick(note)}>Delete</button>
                </div>
            </li>
        )})
        }
    </ul>
  )
}

export default NoteList
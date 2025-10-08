import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";

import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";

interface NoteListProps {
  notes: Note[],
}

const NoteList = ({notes}: NoteListProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (note: Note) => deleteNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['note']});
    },
  })

  const handleDeleteNote = async (note: Note) => {
    mutation.mutate(note);
  }
  
  return (
    <ul className={css.list}>
        {notes.map((note)=>(
          <li className={css.listItem} key={note.id}>
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                  <span className={css.tag}>{note.tag}</span>
                  <button className={css.button} onClick={()=>handleDeleteNote(note)}>Delete</button>
              </div>
          </li>
        ))}
    </ul>
  )
}

export default NoteList
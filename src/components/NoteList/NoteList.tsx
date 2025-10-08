import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";

import css from "./NoteList.module.css";
import toast from "react-hot-toast";
import { deleteNote } from "../../services/noteService";

interface NoteListProps {
  notes: Note[],
}

const NoteList = ({notes}: NoteListProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (note: Note) => toast.promise(
      deleteNote(note),
      {
        loading: 'Deleting...',
        success: <p>The note is deleted</p>,
        error: (error)=><b>Could not delete the note. Error: {error.message}</b>
      }
    ),
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
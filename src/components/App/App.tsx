import { useState } from 'react';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import type { Note } from '../../types/note';
import type { NoteFormValues } from '../../types/note';
import { fetchNotes, deleteNote, createNote } from "../../services/noteService";
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import { useDebouncedCallback } from 'use-debounce';

import css from './App.module.css';

function App() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const updateSearchQuery = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value), 300);

  const openModal = () =>  setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchQuery(e);
    setCurrentPage(1);
  }

  const { data } = useQuery({
    queryKey: ['note', currentPage, searchQuery],
    queryFn: () => toast.promise(
      fetchNotes(searchQuery, currentPage),
      {
        loading: "Loading",
        error: (error) => <b>Something went wrong. Error: {error}</b>
      }
    ),
    placeholderData: keepPreviousData
  })

  const mutation = useMutation({
    mutationFn: async (note: Note) => toast.promise(
      deleteNote(note.id),
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

  const addNewNoteMutation = useMutation({
    mutationFn: async ({...note}: NoteFormValues) => {
      toast.promise(
        createNote(note),
        {
          loading: 'Saving...',
          success: <b>The note is saved!</b>,
          error: (error)=><b>Could not save the note. Error: {error.message}</b>,
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['note']});
      closeModal();
    },
    onError(error) {
      toast.error(error.message)
    },
  })

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  const handleDeleteNote = async (note: Note) => {
    console.log("delete ", note.id);
    mutation.mutate(note);
  }

  const handleFormSubmit = async (note: NoteFormValues) => {
    addNewNoteMutation.mutate(note)
  }

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchSubmit}/>
        {totalPages > 1 && <Pagination onPageChange={({ selected }) => setCurrentPage(selected + 1)} totalPages={totalPages} forcePage={currentPage - 1} />}
        <button className={css.button} onClick={openModal}>Create note +</button>
      </header>
      {isModalOpen && <Modal onCancel={closeModal} onFormSubmit={handleFormSubmit}/>}
      {notes?.length > 0 && <NoteList noteList={notes} onDeleteButtonClick={handleDeleteNote}/>}
    </div>

  )
}

export default App

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { fetchNotes } from "../../services/noteService";
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import { useDebouncedCallback } from 'use-debounce';

import css from './App.module.css';
import NoteForm from '../NoteForm/NoteForm';
import type { Note } from '../../types/note';

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const updateSearchQuery = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, 300);

  const openModal = () =>  setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchQuery(e);
  }

  const { data } = useQuery({
    queryKey: ['notes', currentPage, searchQuery],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  })

  const totalPages = data?.totalPages ?? 0;
  const notes: Note[] = data?.notes ?? [];

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchSubmit}/>
        {totalPages > 1 && <Pagination onPageChange={({ selected }) => setCurrentPage(selected + 1)} totalPages={totalPages} forcePage={currentPage - 1} />}
        <button className={css.button} onClick={openModal}>Create note +</button>
      </header>
      {isModalOpen && <Modal onClose={closeModal}><NoteForm onClose={closeModal}/></Modal>}
      {notes?.length > 0 && <NoteList notes={notes} />}
    </div>
  )
}

export default App

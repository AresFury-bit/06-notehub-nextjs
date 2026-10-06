"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Modal from "@/components/Modal/Modal";
import { NoteForm } from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./Notes.client.module.css";
import Pagination from "@/components/Pagination/Pagination";

interface NotesClientesProps {
  initialPage: number;
  initialSearch: string;
}

const NotesClient = ({ initialPage, initialSearch }: NotesClientesProps) => {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [isModal, setIsModal] = useState(false);

  const { data: note } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    refetchOnMount: false,
  });

  const handleButtonClick = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const handleChange = useDebouncedCallback((search: string) => {
    setSearch(search);
    setPage(1);
    console.log(search);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={(search: string) => handleChange(search)} />
        {note && note?.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={note.totalPages}
            setPage={setPage}
          />
        )}
        <button onClick={handleButtonClick} className={css.button}>
          Create note +
        </button>
        {isModal && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={() => setIsModal(false)} />
          </Modal>
        )}
      </header>
      {note && note.notes.length > 0 && <NoteList notes={note.notes} />}
    </div>
  );
};

export default NotesClient;

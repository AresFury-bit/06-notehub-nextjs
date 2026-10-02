import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import { NoteForm } from "../../components/NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../../components/SearchBox/SearchBox";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModal, setIsModal] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: keepPreviousData,
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
        {data && data?.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            setPage={setPage}
          />
        )}
        <button onClick={handleButtonClick} className={css.button}>
          Create note +
        </button>
        {isLoading && <Loader />}
        {isModal && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={() => setIsModal(false)} />
          </Modal>
        )}
        {isError && <ErrorMessage />}
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

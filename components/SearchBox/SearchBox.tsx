import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: (query: string) => void;
}

export default function SearchBox({ search }: SearchBoxProps) {
  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={changeSearch}
    />
  );
}

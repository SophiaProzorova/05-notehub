import styles from "./SearchBox.module.css";

interface SearchBarProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void,
}

const SearchBar = ({ onChange }: SearchBarProps) => {

  return (
        <input
            type="text"
            name="query"
            placeholder="Search notes..."
            className={styles.input}
            onChange={onChange}
        />
  )
}

export default SearchBar
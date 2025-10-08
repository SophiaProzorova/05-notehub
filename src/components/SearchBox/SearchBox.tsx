import styles from "./SearchBox.module.css";

interface SearchBoxProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void,
}

const SearchBox = ({ onChange }: SearchBoxProps) => {

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

export default SearchBox
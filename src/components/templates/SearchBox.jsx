//svg
import { ImSearch } from "react-icons/im";

//helpers
import { createQueryObject } from "../../helpers/helper";

//Style
import styles from "./searchBox.module.css";

function SearchBox({ search, setSearch, setQuery }) {
  const searchHandler = () => {
    console.log(search);
    // setQuery(query=> ({...query, search: search})) //ecma6
    // setQuery((query) => ({ ...query, search })); //...query baraye inke agar search ya categories dashtim, bemune va hazf nashe
    // setQuery((query) => createQueryObject(query, { search: search })); //ecma6
    setQuery((query) => createQueryObject(query, { search }));
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase().trim())} //trim() : Delete white space haye khali
      />
      <button onClick={searchHandler}>
        <ImSearch />
      </button>
    </div>
  );
}

export default SearchBox;

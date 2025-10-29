import { useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useGlobal } from 'reactn';
import search from '../../../actions/search';

function SearchBar() {
  const searchInput = useRef();
  const setSearchResults = useGlobal('searchResults')[1];
  const [nav, setNav] = useGlobal('nav');
  const setSearch = useGlobal('search')[1];

  const onChange = e => {
    if (nav !== 'search') setNav('search');
    setSearch(e.target.value);

    search(e.target.value)
      .then(res => setSearchResults(res.data.users))
      .catch(err => console.error(err));
  };

  return (
    <div className="w-full px-2">
      <div className=" flex items-center gap-2 w-full bg-white rounded-full border border-blue-400 focus-within:border-blue-600 focus-within:shadow-md transition-all px-3 py-2 my-2">
        <FiSearch
          className="text-blue-500 text-xl cursor-pointer"
          onClick={() => searchInput.current.focus()}
        />

        <input
          ref={searchInput}
          type="text"
          placeholder="Search"
          onChange={onChange}
          className=" w-full bg-transparent outline-none focus:outline-none border-none focus:ring-0 placeholder-gray-500 text-gray-800"
        />
      </div>
    </div>
  );
}

export default SearchBar;

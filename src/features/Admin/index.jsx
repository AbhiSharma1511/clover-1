import { useEffect, useRef, useState } from 'react';
import { useGlobal } from 'reactn';
import DataTable from 'react-data-table-component';
import { FiSearch } from 'react-icons/fi';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import search from '../../actions/search';
import Popup from './components/Popup';

function Admin() {
  const setOver = useGlobal('over')[1];
  const [users, setUsers] = useState([]);
  const searchInput = useRef();
  const setSearchResults = useGlobal('searchResults')[1];
  const [searchText, setSearch] = useGlobal('search');
  const [popup, setPopup] = useState(null);
  const [user, setUser] = useState(null);

  const onChange = (e) => {
    setSearch(e.target.value);
    search(e.target.value)
      .then((res) => setSearchResults(res.data.users))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    search(searchText || null, 10000).then((res) => {
      setUsers(res.data.users);
    });
  }, [searchText]);

  const back = () => setOver(false);

  const columns = [
    {
      name: 'First Name',
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Username',
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: 'Actions',
      sortable: false,
      cell: (row) => (
        <div className="flex gap-3">
          <button
            className="text-blue-500 font-medium hover:text-blue-700"
            onClick={() => {
              setUser(row);
              setPopup('edit');
            }}
          >
            Edit
          </button>
          <button
            className="text-red-500 font-medium hover:text-red-700"
            onClick={() => {
              setUser(row);
              setPopup('delete');
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const data = users.map((user) => ({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  }));

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <TopBar back={back} />

      {/* Search Bar */}
      <div className="w-full flex justify-center items-center p-4 bg-[#d6eaff]">
        <div
          className="flex items-center w-[90%] max-w-3xl bg-white rounded-full border border-blue-500 px-3 py-2 shadow-sm"
          onClick={() => searchInput.current && searchInput.current.focus()}
        >
          <FiSearch className="mr-2 text-blue-500 text-lg" />
          <input
            ref={searchInput}
            type="text"
            placeholder="Search users…"
            onChange={onChange}
            className="w-full bg-transparent outline-none focus:outline-none focus:ring-0 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-auto p-2">
        <div className="bg-white rounded-lg">
          <div className="flex justify-between p-2">
            <div className='text-xl text-black font-semibold'>
              Admin Panel
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
              onClick={() => setPopup('create')}
            >
              Create
            </button>
          </div>

          <div className=''>
            <DataTable
              title="Admin — Users"
              columns={columns}
              data={data}
              pagination
              paginationPerPage={20}
            />

          </div>

        </div>
      </div>

      <BottomBar />

      {popup && (
        <Popup
          onClose={(shouldUpdate) => {
            if (shouldUpdate) {
              search(searchText || null, 10000).then((res) => {
                setUsers(res.data.users);
              });
            }
            setPopup(null);
          }}
          user={user}
          type={popup}
        />
      )}
    </div>
  );
}

export default Admin;

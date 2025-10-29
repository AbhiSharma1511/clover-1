import { useGlobal } from 'reactn';
import './NavBar.sass';
import {
  FiMessageCircle, FiStar, FiUsers, FiSearch,
} from 'react-icons/fi';

function NavBar() {
  const [nav, setNav] = useGlobal('nav');

  return (
    <div className="flex justify-around items-center text-center py-3">
      <div className={`flex flex-col items-center hover:text-blue-700 cursor-pointer ${nav === 'rooms' ? ' active' : ''}`} onClick={() => setNav('rooms')}>
        <div className="icon">
          <FiMessageCircle />
        </div>
        <div className="text-md font-semibold">Rooms</div>
      </div>
      <div className={`flex flex-col items-center hover:text-blue-700 cursor-pointer${nav === 'search' ? ' active' : ''}`} onClick={() => setNav('search')}>
        <div className="icon">
          <FiSearch />
        </div>
        <div className="text-md font-semibold">Search</div>
      </div>
      <div className={`flex flex-col items-center hover:text-blue-700 cursor-pointer${nav === 'favorites' ? ' active' : ''}`} onClick={() => setNav('favorites')}>
        <div className="icon">
          <FiStar />
        </div>
        <div className="text-md font-semibold">Favorites</div>
      </div>
      <div
        className={`flex flex-col items-center hover:text-blue-700 cursor-pointer${nav === 'meetings' ? ' active' : ''}`}
        onClick={() => {
          setNav('meetings');
        }}
      >
        <div className="icon">
          <FiUsers />
        </div>
        <div className="text-md font-semibold">Meetings</div>
      </div>
    </div>
  );
}

export default NavBar;

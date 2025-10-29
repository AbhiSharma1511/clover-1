import { useGlobal } from 'reactn';
import Picture from '../../components/Picture';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';

function Welcome() {
  const user = useGlobal('user')[0];
  const setOver = useGlobal('over')[1];

  const back = () => setOver(false);

  return (
    <div className="content flex flex-col min-h-screen text-white">
      <TopBar back={back} />

      <div className="flex flex-col items-center justify-center flex-1 px-4 text-center">

        <h1 className="welcome text-4xl font-bold tracking-wide drop-shadow-lg mb-4 animate-fadeIn">
          Welcome Back,
          <span className="text-[#4cc9f0] ml-2">
            {user.lastName}
          </span>
        </h1>

        <div className="profile mb-6">
          <div className="transform hover:scale-105 transition duration-300 ease-out drop-shadow-2xl">
            <Picture user={user} />
          </div>
        </div>

        <p className="tutorial text-lg text-gray-300 max-w-sm leading-relaxed animate-fadeSlideUp">
          Search for someone to start a conversation,
          <br />
          Add contacts to your favorites to reach them faster
        </p>

      </div>

      <BottomBar />
    </div>
  );
}

export default Welcome;

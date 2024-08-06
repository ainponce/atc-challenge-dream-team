import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/PlayerList">
          <div className="flex items-center justify-center p-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 cursor-pointer">
            <span className="text-xl font-semibold">Lista de Jugadores</span>
          </div>
        </Link>

        <Link href="/TeamList">
          <div className="flex items-center justify-center p-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 cursor-pointer">
            <span className="text-xl font-semibold">Lista de Equipos</span>
          </div>
        </Link>

        <a
          href="https://github.com/ainponce/atc-challenge-dream-team"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-4 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700"
        >
          <span className="text-xl font-semibold">GitHub</span>
        </a>
      </div>
    </div>
  );
};

export default Home;

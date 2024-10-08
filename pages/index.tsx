import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Dream Match</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link href="/PlayerList">
          <div className="flex flex-col items-center justify-center p-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 cursor-pointer">
            <span className="text-xl font-semibold mb-2">
              Lista de Jugadores
            </span>
            <p className="text-center text-white">
              Consulta y selecciona jugadores para tus equipos.
            </p>
          </div>
        </Link>

        <Link href="/TeamList">
          <div className="flex flex-col items-center justify-center p-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 cursor-pointer">
            <span className="text-xl font-semibold mb-2">Lista de Equipos</span>
            <p className="text-center text-white">
              Crea y gestiona equipos de fútbol.
            </p>
          </div>
        </Link>

        <a
          href="https://github.com/ainponce/atc-challenge-dream-team"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-4 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700"
        >
          <span className="text-xl font-semibold mb-2">Github</span>
          <p className="text-center">
            Visita el repositorio del proyecto en GitHub.
          </p>
        </a>
      </div>
      <p className="text-center text-gray-600">
        Usa los botones para navegar entre la lista de jugadores, gestionar
        equipos y acceder al repositorio del proyecto.
      </p>
    </div>
  );
};

export default Home;

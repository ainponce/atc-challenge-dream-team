import React from 'react';
import { useRouter } from 'next/router';
import PlayerList from '../components/PlayerList';

const App: React.FC = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className="relative">
            <button
                onClick={handleGoBack}
                className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
            >
                Volver
            </button>
            <h1 className="text-center my-8">Jugadores</h1>
            <PlayerList onSelect={(player) => console.log(player)} />
        </div>
    );
};

export default App;
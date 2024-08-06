import { useState, useEffect } from 'react';
import { Player, Team } from '../types';
import { fetchPlayersByName, fetchTeams } from '../utils/api';
import PlayerCard from './PlayerCard';

type Props = {
  onSelect: (player: Player) => void;
};

const PlayerList = ({ onSelect }: Props) => {
  const [searchName, setSearchName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (searchName.trim() === '') {
      setPlayers([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const result = await fetchPlayersByName(searchName);
      const uniquePlayers = Array.from(new Map(result.map((player) => [player.id, player])).values());
      setPlayers(uniquePlayers);
      setError(null);
    } catch (error) {
      console.error('Error fetching players:', error);
      setPlayers([]);
      setError('Failed to fetch players');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignPlayer = (player: Player, teamId: string) => {
    console.log(`Asignar jugador ${player.name} al equipo ${teamId}`);
  };

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const teamsData = await fetchTeams();
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError('Failed to fetch teams');
      }
    };

    loadTeams();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Buscar Jugador</h2>
        <input
          type="text"
          placeholder="Ingresa el nombre del jugador"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Buscar
        </button>

        {loading && !error && !searched && <p className="text-blue-500 mt-4">Cargando...</p>}
        {error && !loading && searched && <p className="text-red-500 mt-4">{error}</p>}
        {!loading && searched && players.length === 0 && !error && <p className="text-gray-500 mt-4">No se encontraron jugadores</p>}
        {!loading && searched && players.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onSelect={onSelect}
                teams={teams}
                onAssignPlayer={handleAssignPlayer}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerList;
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Team, Player } from "../types";
import { FaTrash, FaRegEdit, FaTimes } from "react-icons/fa";

type TeamListProps = {
  teams: Team[];
  onSelectTeam: (teamId: string) => void;
};

const TeamList = ({ onSelectTeam }: TeamListProps) => {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const storedTeams = localStorage.getItem("teams");
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    }
  }, []);

  const handleCreateTeam = () => {
    router.push("/FormList");
  };

  const handleEditTeam = (teamId: string) => {
    router.push(`/FormList?id=${teamId}`);
  };

  const handleDeleteTeam = (teamId: string) => {
    const updatedTeams = teams.filter((team) => team.id !== teamId);
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  const handleDeletePlayer = (teamId: string, playerId: string) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        return {
          ...team,
          players: team.players.filter((player) => player.id !== playerId),
        };
      }
      return team;
    });
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  return (
    <div className="container mx-auto px-4 py-6 rounded-lg">
      <div className="flex justify-center mb-4">
        <button
          onClick={handleCreateTeam}
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          Crear Equipo
        </button>
      </div>
      <h2 className="text-center text-xl font-bold mb-6">Equipos</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {teams.length === 0 ? (
          <p className="text-center text-gray-500 w-full">
            Aún no hay equipos creados
          </p>
        ) : (
          <>
            {teams.map((team) => (
              <div
                key={team.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 bg-gray-100 border border-gray-300 rounded-lg relative"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">{team.name}</h3>
                  <p className="text-sm">
                    {team.players.length === 5
                      ? "Estado: Completo"
                      : "Estado: Formado"}
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="text-md font-semibold">Integrantes</h4>
                  {team.players.length === 0 ? (
                    <p className="text-center text-gray-500">
                      No hay jugadores añadidos
                    </p>
                  ) : (
                    <ul className="space-y-2 mt-2">
                      {team.players.map((player: Player) => (
                        <li
                          key={player.id}
                          className="flex items-center space-x-3 p-2 bg-gray-100 border border-gray-300 rounded-md"
                        >
                          <img
                            src={
                              player.image === ""
                                ? "https://apiv3.apifootball.com/badges/players/97489_t-messing.jpg"
                                : player.image
                            }
                            alt={player.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <span className="flex-1">{player.name}</span>
                          <button
                            onClick={() =>
                              handleDeletePlayer(team.id, player.id)
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTimes />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="absolute top-2 right-2 space-x-2">
                  <button
                    onClick={() => handleEditTeam(team.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteTeam(team.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TeamList;

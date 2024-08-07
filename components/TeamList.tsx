import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Team, Player } from "../types";

type TeamListProps = {
  onSelectTeam: (teamId: string) => void;
};

const TeamList = ({ onSelectTeam }: TeamListProps) => {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    const storedTeams = localStorage.getItem("teams");
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    }
  }, []);

  const handleCreateTeam = () => {
    router.push("/team-form");
  };

  const handleTeamClick = (teamId: string) => {
    const team = teams.find((t) => t.id === teamId) || null;
    setSelectedTeam(team);
    onSelectTeam(teamId);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-center mb-4">
        <button
          onClick={handleCreateTeam}
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          Crear Equipo
        </button>
      </div>
      <div className="flex flex-col items-center">
        {teams.length === 0 ? (
          <p className="text-center text-gray-500">
            Aún no hay equipos creados
          </p>
        ) : (
          <>
            <ul className="space-y-2 mb-4">
              {teams.map((team) => (
                <li
                  key={team.id}
                  onClick={() => handleTeamClick(team.id)}
                  className="p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
                >
                  {team.name} -{" "}
                  {team?.status === "complete" ? "Completo" : "Formado"}
                </li>
              ))}
            </ul>
            {selectedTeam && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">
                  Integrantes de {selectedTeam.name}
                </h3>
                {selectedTeam.players.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No hay jugadores añadidos
                  </p>
                ) : (
                  <ul className="space-y-2 mt-2">
                    {selectedTeam.players.map((player: Player) => (
                      <li
                        key={player.id}
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        {player.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TeamList;

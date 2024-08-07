import { useRouter } from "next/router";
import { Team } from "../types";

type TeamListProps = {
  teams: Team[];
  onSelectTeam: (teamId: string) => void;
};

const TeamList = ({ teams, onSelectTeam }: TeamListProps) => {
  const router = useRouter();

  const handleCreateTeam = () => {
    router.push("/FormList");
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
      {teams.length === 0 ? (
        <p className="text-center text-gray-500">Aún no hay equipos creados</p>
      ) : (
        <ul className="space-y-2">
          {teams.map((team) => (
            <li
              key={team.id}
              onClick={() => onSelectTeam(team.id)}
              className="p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
            >
              {team.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamList;

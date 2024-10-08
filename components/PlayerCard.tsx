import { useState } from "react";
import { Player, Team } from "../types";

type Props = {
  player: Player;
  onSelect: (player: Player) => void;
  teams: Team[];
  onAssignPlayer: (player: Player, teamId: string) => void;
};

const PlayerCard = ({ player, onSelect, teams, onAssignPlayer }: Props) => {
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src =
      "https://apiv3.apifootball.com/badges/players/97489_t-messing.jpg";
  };

  const handleAssignPlayer = () => {
    const team = teams.find((team) => team.id === selectedTeam);

    if (!team) {
      setError("Debes seleccionar un equipo.");
      return;
    }

    if (team.players.some((p) => p.id === player.id)) {
      setError("El jugador ya está en este equipo.");
      return;
    }

    if (team.players.length >= 5) {
      setError(
        "El equipo al que quieres agregar al jugador se encuentra lleno."
      );
      return;
    }

    if (selectedTeam) {
      onAssignPlayer(player, selectedTeam);
      setSelectedTeam("");
      setError(null);
    }
  };

  const isPlayerAssigned = teams.some((team) =>
    team.players.some((p) => p.id === player.id)
  );

  return (
    <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 flex flex-col items-center">
      <img
        src={
          player.image === ""
            ? "https://apiv3.apifootball.com/badges/players/97489_t-messing.jpg"
            : player.image
        }
        alt={player.name}
        onError={handleError}
        className="w-32 h-32 rounded-full mb-4"
      />
      <h3 className="text-lg font-semibold text-center">{player.name}</h3>
      <p className="text-center">
        <strong>Tipo:</strong> {player.type}
      </p>
      <p className="text-center">
        <strong>Edad:</strong> {player.age === "" ? "Sin datos." : player.age}
      </p>
      <p className="text-center">
        <strong>Número:</strong>{" "}
        {player.number === "" ? "Sin datos." : player.number}
      </p>
      <div className="mt-4 w-full">
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
        >
          <option value="">Selecciona un equipo</option>
          {teams.map((team) => (
            <option
              key={team.id}
              value={team.id}
              disabled={
                (isPlayerAssigned &&
                  team.players.some((p) => p.id === player.id)) ||
                team.players.length >= 5
              }
            >
              {team.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAssignPlayer}
          disabled={isPlayerAssigned}
          className={`w-full p-2 rounded-md ${
            isPlayerAssigned
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isPlayerAssigned ? "Jugador ya asignado" : "Asignar al equipo"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default PlayerCard;

import { useState } from "react";
import { useRouter } from "next/router";

const TeamForm = () => {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (teamName.trim() === "") {
      setError("El nombre del equipo es obligatorio.");
      return;
    }

    const existingTeams = JSON.parse(localStorage.getItem("teams") || "[]");

    if (existingTeams.length >= 2) {
      setError("Ya llegó al límite de equipos que puede crear.");
      return;
    }

    const newTeam = {
      id: Date.now().toString(),
      name: teamName,
      status: "formado",
      players: [],
    };

    existingTeams.push(newTeam);
    localStorage.setItem("teams", JSON.stringify(existingTeams));

    router.push("/TeamList");
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Crear Nuevo Equipo</h2>
      <input
        type="text"
        placeholder="Nombre del equipo"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Crear Equipo
      </button>
    </div>
  );
};

export default TeamForm;

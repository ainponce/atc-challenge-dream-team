import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Team } from "../types";

type TeamFormProps = {
  team?: Team | null;
};

const TeamForm: React.FC<TeamFormProps> = ({ team }) => {
  const router = useRouter();
  const [name, setName] = useState<string>(team?.name || "");

  useEffect(() => {
    if (team) {
      setName(team.name);
    }
  }, [team]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedTeams = localStorage.getItem("teams");
    let teams: Team[] = storedTeams ? JSON.parse(storedTeams) : [];

    if (team) {
      teams = teams.map((t) => (t.id === team.id ? { ...t, name } : t));
    } else {
      const newTeam: Team = {
        id: Date.now().toString(),
        name,
        status: "incomplete",
        players: [],
      };
      teams.push(newTeam);
    }

    localStorage.setItem("teams", JSON.stringify(teams));
    router.push("/TeamList");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre del Equipo
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        {team ? "Actualizar Equipo" : "Crear Equipo"}
      </button>
    </form>
  );
};

export default TeamForm;

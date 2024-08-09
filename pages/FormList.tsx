import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TeamForm from "../components/TeamForm";
import { Team } from "../types";

const TeamFormPage: React.FC = () => {
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    const { id } = router.query;

    if (id && typeof id === "string") {
      const storedTeams = localStorage.getItem("teams");
      if (storedTeams) {
        const teams: Team[] = JSON.parse(storedTeams);
        const existingTeam = teams.find((team) => team.id === id) || null;
        setTeam(existingTeam);
      }
    }
  }, [router.query]);

  const handleGoBack = () => {
    router.push("/TeamList");
  };

  return (
    <div className="relative">
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
      >
        Volver
      </button>
      <h1 className="text-center my-8">
        {team ? "Edición de Equipo" : "Creación de Equipo"}
      </h1>
      <TeamForm team={team} />
    </div>
  );
};

export default TeamFormPage;

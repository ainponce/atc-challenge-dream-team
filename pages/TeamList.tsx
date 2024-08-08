import React from "react";
import { useRouter } from "next/router";
import TeamList from "../components/TeamList";

const TeamListPage: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="relative min-h-screen bg-gray-100 py-6">
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
      >
        Volver
      </button>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-center text-2xl font-bold mb-8">Lista de Equipos</h1>
        <div className="flex flex-wrap justify-center gap-4">
          <TeamList teams={[]} onSelectTeam={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default TeamListPage;

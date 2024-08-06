import React from "react";
import { useRouter } from "next/router";
import TeamList from "../components/TeamList";

const TeamListPage: React.FC = () => {
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
      <h1 className="text-center my-8">Team List Page</h1>
      <TeamList teams={[]} onSelectTeam={() => {}} />
    </div>
  );
};

export default TeamListPage;

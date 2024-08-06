import { useState } from 'react';
import { useRouter } from 'next/router';

const TeamForm = () => {
  const [teamName, setTeamName] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (teamName.trim() === '') return;

    const newTeam = {
      id: Date.now().toString(),
      name: teamName,
    };

    const existingTeams = JSON.parse(localStorage.getItem('teams') || '[]');
    existingTeams.push(newTeam);
    localStorage.setItem('teams', JSON.stringify(existingTeams));

    router.push('/team-list');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <button
        onClick={handleGoBack}
        className="mb-4 text-blue-500 underline"
      >
        Volver atrás
      </button>
      <h2 className="text-xl font-semibold mb-4">Crear Nuevo Equipo</h2>
      <input
        type="text"
        placeholder="Nombre del equipo"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      />
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

import { useState } from 'react';
import { Team } from '../types';

type TeamFormProps = {
  onCreateTeam: (team: Team) => void;
};

const TeamForm = ({ onCreateTeam }: TeamFormProps) => {
  const [teamName, setTeamName] = useState('');

  const handleSubmit = () => {
    const newTeam = {
      id: `${Date.now()}`,
      name: teamName,
      players: [],
    };
    onCreateTeam(newTeam);
    setTeamName('');
  };

  return (
    <div>
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Enter team name"
      />
      <button onClick={handleSubmit}>Create Team</button>
    </div>
  );
};

export default TeamForm;

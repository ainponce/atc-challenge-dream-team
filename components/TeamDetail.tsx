import { Team } from '../types';

type TeamDetailProps = {
  team: Team | null;
};

const TeamDetail = ({ team }: TeamDetailProps) => {
  if (!team) {
    return <div>Select a team to see the details.</div>;
  }

  return (
    <div>
      <h2>{team.name}</h2>
      <ul>
        {team.players.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamDetail;

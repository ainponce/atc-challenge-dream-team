import { Team } from '../types';

type TeamListProps = {
  teams: Team[];
  onSelectTeam: (teamId: string) => void;
};

const TeamList = ({ teams, onSelectTeam }: TeamListProps) => {
  return (
    <ul>
      {teams.map((team) => (
        <li key={team.id} onClick={() => onSelectTeam(team.id)}>
          {team.name}
        </li>
      ))}
    </ul>
  );
};

export default TeamList;

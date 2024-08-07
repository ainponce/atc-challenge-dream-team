import { Player, Team } from '../types';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const API_URL = 'https://apiv3.apifootball.com/';
const API_KEY = apiKey;

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return res.json();
};

export const fetchPlayersByName = async (playerName: string): Promise<Player[]> => {
  const res = await fetch(`${API_URL}?action=get_players&player_name=${encodeURIComponent(playerName)}&APIkey=${API_KEY}`);
  const data = await handleResponse(res);

  console.log('API response:', data);

  if (!data) {
    console.error('No players found');
    return [];
  }

  return data.map((player: any) => ({
    id: player.player_key,
    name: player.player_name,
    type: player.player_type,
    age: player.player_age,
    number: player.player_number,
    image: player.player_image,
  }));
};

export const fetchTeams = async (): Promise<Team[]> => {
  const res = await fetch(`${API_URL}?action=get_teams&APIkey=${API_KEY}`);
  const data = await handleResponse(res);

  if (!data.teams) {
    throw new Error('Teams data is undefined');
  }

  return data.teams.map((team: any) => ({
    id: team.team_id,
    name: team.team_name,
    players: [],
  }));
};

export const fetchTeamById = async (id: string): Promise<Team> => {
  const res = await fetch(`${API_URL}?action=get_team&team_id=${id}&APIkey=${API_KEY}`);
  const data = await handleResponse(res);
  
  if (!data.team || !data.players) {
    throw new Error('Team or players data is undefined');
  }

  return {
    id: data.team_id,
    name: data.team_name,
    status: data.team_status,
    players: data.players.map((player: any) => ({
      id: player.player_id,
      name: player.player_name,
    })),
  };
};

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPlayersByName } from '../../utils/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;

  if (typeof name !== 'string') {
    return res.status(400).json({ error: 'Name query parameter is required' });
  }

  try {
    const players = await fetchPlayersByName(name);
    if (players.length === 0) {
      return res.status(404).json({ error: 'No players found' });
    }
    res.status(200).json({ players });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch players' });
  }
};

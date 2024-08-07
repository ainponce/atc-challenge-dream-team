export interface Player {
    id: string;
    name: string;
    type: string;
    age: string;
    number: string;
    image: string;
  }
  
  export interface Team {
    id: string;
    name: string;
    players: Player[];
    status : 'complete' | 'incomplete';
  }  
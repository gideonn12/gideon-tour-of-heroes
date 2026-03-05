import { Team } from '../models/team/team';

export const INITIAL_TEAMS: Team[] = [
  {
    id: 1,
    name: 'Team Venus',
    color: '#FF69B4',
    heroIds: [1, 12],
  },
  {
    id: 2,
    name: 'Team Mars',
    color: '#FF4500',
    heroIds: [13, 19],
  },
  {
    id: 3,
    name: 'Team Jupiter',
    color: '#4169E1',
    heroIds: [14],
  },
  {
    id: 4,
    name: 'Team Saturn',
    color: '#DAA520',
    heroIds: [15, 17],
  },
  {
    id: 5,
    name: 'Team Mercury',
    color: '#c0c0c0',
    heroIds: [16, 18],
  },
  {
    id: 6,
    name: 'Team Neptune',
    color: '#1E90FF',
    heroIds: [20],
  },
];


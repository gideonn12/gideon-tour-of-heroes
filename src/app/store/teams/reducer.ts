import { loadTeams } from './actions';
import { createReducer, on } from '@ngrx/store';
import { Team } from '../../features/models/team/team';

export interface TeamState {
  teams: Team[];
}

export const initialTeamState: TeamState = {
  teams: [
    {
      id: 1,
      name: 'Team Venus',
      color: '#FF69B4',
      heroes: [
        { id: 1, name: 'Gabriel is the best person' },
        { id: 12, name: 'Dr. Nice' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
      ],
    },
    {
      id: 2,
      name: 'Team Mars',
      color: '#FF4500',
      heroes: [
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr. IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' },
      ],
    },
    {
      id: 3,
      name: "Team Jupiter",
      color: "#4169E1",
      heroes: [
        { id: 12, name: "Dr. Nice" },
        { id: 14, name: "Celeritas" },
        { id: 16, name: "RubberMan" },
        { id: 18, name: "Dr. IQ" },
        { id: 20, name: "Tornado" }
      ]
    },
    {
      id: 4,
      name: "Team Saturn",
      color: "#DAA520",
      heroes: [
        { id: 13, name: "Bombasto" },
        { id: 15, name: "Magneta" },
        { id: 17, name: "Dynama" },
        { id: 19, name: "Magma" }
      ]
    },
    {
      id: 5,
      name: "Team Mercury",
      color: "#c0c0c0",
      heroes: [
        { id: 1, name: "Gabriel is the best person" },
        { id: 12, name: "Dr. Nice" },
        { id: 16, name: "RubberMan" },
        { id: 18, name: "Dr. IQ" }
      ]
    },
    {
      id: 6,
      name: "Team Neptune",
      color: "#1E90FF",
      heroes: [
        { id: 14, name: "Celeritas" },
        { id: 15, name: "Magneta" },
        { id: 17, name: "Dynama" },
        { id: 19, name: "Magma" },
        { id: 20, name: "Tornado" }
      ]
    }
  ],
};
export const teamsReducer = createReducer(
  initialTeamState,
  on(loadTeams, (state) => ({
    ...state,
    teams: [...state.teams],
  })),
);

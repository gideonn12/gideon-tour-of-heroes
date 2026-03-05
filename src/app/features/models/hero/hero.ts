export type HeroStatus = 'Active' | 'Inactive' | 'Removed' | 'Suspended';

export const statusColorMap: Record<HeroStatus, string> = {
  'Active': '#4CAF50',
  'Inactive': '#878776',
  'Removed': '#F44336',
  'Suspended': '#e4d31b',
};

export interface Hero {
  id: number;
  name: string;
  status: HeroStatus;
  teamId: number;
  equipmentIds: number[];
}

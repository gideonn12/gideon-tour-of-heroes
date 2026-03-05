export const HERO_STATUSES = ['Active', 'Inactive', 'Removed', 'Suspended'];
export type HeroStatus = typeof HERO_STATUSES[number];
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
  maxWeight: number;
}

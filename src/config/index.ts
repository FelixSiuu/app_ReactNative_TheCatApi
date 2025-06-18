export const subId = 'lovecatguy';

export const pendingVotingPosition = {
  left: -100,
  right: 100,
};

export const getImagesLimit = {
  min: 1,
  max: 10,
};

export const colorMap = {
  primary: '#ff6841',
  tabBarActiveTintColor: '#ff6841',
  disabled: '#cbcbcb',
  retry: '#ff6841',
  votingBtnDisabled: '#837777',
  'vote-up': '#00a651',
  'vote-down': '#f73132',
  'slider-minimumTrackTintColor': '#c4b9b9',
  'slider-maximumTrackTintColor': '#ff6841',
  'settings-textDiffColor': '#e23123',
};

export type VotingSettingsType = {
  limit: number;
  mine_types: string; // jpg,png,gif
  has_breeds: boolean | '';
  size: 'thumb' | 'small' | 'med' | 'full' | '';
};

export const defaultVotingSettings: VotingSettingsType = {
  limit: 5,
  mine_types: '',
  has_breeds: '',
  size: '',
};

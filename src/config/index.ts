export const subId = 'lovecatguy';

export const pendingVotingPosition = {
  left: -60,
  right: 60,
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
  'slider-minimumTrackTintColor': '#ff6841',
  'slider-maximumTrackTintColor': '#c4b9b9',
  'settings-textDiffColor': '#e23123',
  'settings-textWarningColor': '#e23123',
  'settings-primaryColor': '#3f96fd',
};

export type VotingSettingsType = {
  limit: number;
  mime_types: string; // jpg,png,gif
  has_breeds: boolean | '';
  size: 'thumb' | 'small' | 'med' | 'full' | '';
};

export const defaultVotingSettings: VotingSettingsType = {
  limit: 5,
  mime_types: '',
  has_breeds: '',
  size: '',
};

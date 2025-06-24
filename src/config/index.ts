import { VotingSettingsType } from '../types';

export const subId = 'lovecatguy';

export const pendingVotingPosition = {
  left: -40,
  right: 40,
};

export const getImagesLimit = {
  min: 1,
  max: 10,
};

export const defaultErrorText = 'Something went wrong, please try again';

export const colorMap = {
  primary: '#ff6841',
  tabBarActiveTintColor: '#ff6841',
  disabled: '#cbcbcb',
  retry: '#ff6841',
  settings: '#ff8818',
  records: '#977fe7',
  'fav-active': '#f70707',
  'fav-disabled': '#cbcbcb',
  'vote-disabled': '#4b4b4b',
  'vote-up': '#4ae395',
  'vote-down': '#8fc2ff',
  'slider-minimumTrackTintColor': '#ff6841',
  'slider-maximumTrackTintColor': '#c4b9b9',
  'settings-textDiffColor': '#e23123',
  'settings-textWarningColor': '#e23123',
  'settings-primaryColor': '#3f96fd',
};

export const defaultVotingSettings: VotingSettingsType = {
  limit: '5',
  mime_types: '',
  has_breeds: '',
  size: '',
  category_ids: '',
};

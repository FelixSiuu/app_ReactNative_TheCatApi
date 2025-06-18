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
  tabBarActiveTintColor: '#ff6841',
  disabled: '#cbcbcb',
  retry: '#ff6841',
  votingBtnDisabled: '#837777',
  'vote-up': '#00a651',
  'vote-down': '#f73132',
};

export type VotingSettingsType = {
  limit: number;
  mine_types?: ('jpg' | 'png' | 'gif')[] | undefined;
  has_breeds?: boolean | undefined;
  size?: 'thumb' | 'small' | 'med' | 'full' | undefined;
};

export const defaultVotingSettings: VotingSettingsType = {
  limit: 5,
};

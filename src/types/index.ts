export type Limit = number;
export type MimeTypes = string; // "jpg,png,gif"
export type HasBreeds = string; // "" | "true" | "false"
export type Size = 'thumb' | 'small' | 'med' | 'full' | '';
export type BreedId = string;

export type VotingSettingsType = {
  limit: Limit;
  mime_types: MimeTypes;
  has_breeds: HasBreeds;
  size: Size;
};

export type BreedsParams = {
  breed_id?: BreedId;
  limit?: Limit;
  mime_types?: MimeTypes;
  has_breeds?: HasBreeds;
  size?: Size;
};

export type Limit = string;
export type MimeTypes = string; // "jpg,png,gif"
export type HasBreeds = string; // "" | "true" | "false"
export type Size = 'thumb' | 'small' | 'med' | 'full' | '';
export type CategoriesId = string;
export type BreedId = string;
export type Order = 'ASC' | 'DESC'; // ASC: 升序 DESC：降序

export type VotingSettingsType = {
  limit: Limit;
  mime_types: MimeTypes;
  has_breeds: HasBreeds;
  size: Size;
  category_ids: CategoriesId;
};

export type BreedsParams = {
  breed_id?: BreedId;
  limit?: Limit;
  mime_types?: MimeTypes;
  has_breeds?: HasBreeds;
  size?: Size;
};

import {
  BreedId,
  BreedsParams,
  CategoriesId,
  HasBreeds,
  Limit,
  MimeTypes,
  Order,
  Size,
} from '../types';
import Request from './request';

const baseUrl = 'https://api.thecatapi.com/';

// search image
export const request_getImg = (params: {
  limit: Limit;
  mime_types: MimeTypes;
  has_breeds: HasBreeds;
  size: Size;
  category_ids: CategoriesId;
}) => {
  return Request({
    method: 'get',
    url: `${baseUrl}v1/images/search`,
    params,
  });
};

// voting img
export const request_vote = (data: {
  image_id: string;
  sub_id: string;
  value: number;
}) => {
  return Request({
    method: 'post',
    url: `${baseUrl}v1/votes`,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// save an favourite image
export const request_saveFav = (data: { image_id: string; sub_id: string }) => {
  return Request({
    method: 'post',
    url: `${baseUrl}v1/favourites`,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// delete an favourte image
export const request_deleteFav = ({
  favourite_id,
}: {
  favourite_id: string;
}) => {
  return Request({
    method: 'delete',
    url: `${baseUrl}v1/favourites/${favourite_id}`,
  });
};

// get fav list
export const request_getFavList = (params: {
  sub_id: string;
  limit: Limit;
  order: Order;
}) => {
  return Request({
    method: 'get',
    url: `${baseUrl}v1/favourites`,
    params,
  });
};

// get vote history
export const request_getVoteHistory = (params: {
  limit: Limit;
  order: Order;
}) => {
  return Request({
    method: 'get',
    url: `${baseUrl}v1/votes`,
    params,
  });
};

// get breeds list
export const request_getBreedsList = () => {
  return Request({
    method: 'get',
    url: `${baseUrl}v1/breeds`,
  });
};

// get breed info
export const request_getBreedInfo = (params: BreedsParams) => {
  return Request({
    method: 'get',
    url: `${baseUrl}v1/images/search`,
    params,
  });
};

// get categories list
export const request_getCategoriesList = () => {
  return Request({
    method: 'get',
    url: `${baseUrl}v1/categories`,
  });
};

// get filter images
export const request_getFilterImages = (params: {
  breed_id: BreedId;
  category_ids: string;
  mime_types: MimeTypes;
  limit: Limit;
}) => {
  return Request({
    method: 'get',
    url: `${baseUrl}v1/images/search`,
    params,
  });
};

import { VotingSettingsType } from '../types';
import Request from './request';

const baseUrl = 'https://api.thecatapi.com/';

// Ask for 1 Image, at full resolution
export const request_getImg = (params: VotingSettingsType) => {
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
  limit?: number;
}) => {
  return Request({
    method: 'get',
    url: `${baseUrl}v1/favourites`,
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
export const request_getBreedInfo = (params: { breed_id: string }) => {
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
  breed_id: string;
  category_ids: string;
  mime_types: string;
  limit: string;
}) => {
  return Request({
    method: 'get',
    url: `${baseUrl}v1/images/search`,
    params,
  });
};

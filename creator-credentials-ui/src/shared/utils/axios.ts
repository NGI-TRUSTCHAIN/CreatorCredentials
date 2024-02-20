// eslint-disable-next-line no-restricted-imports
import _axios from 'axios';
import { config } from '@/shared/constants/config';

const instance = _axios.create({
  baseURL: config.API_URL,
});

export const axios = instance;

import axios, { AxiosResponse } from '../axiosNest';

export type CreateDidWebJsonFilePayload = {
  domain: string;
};

export type CreateDidWebJsonFileResponse = {
  jsonFileContent: string;
};

export const createDidWebJsonFile = (payload: CreateDidWebJsonFilePayload) =>
  axios.post<
    CreateDidWebJsonFilePayload,
    AxiosResponse<CreateDidWebJsonFileResponse, CreateDidWebJsonFilePayload>
  >('/v1/mocks/verification/did-web/create-file', payload);

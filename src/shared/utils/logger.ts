import { AxiosRequestConfig, AxiosResponse } from 'axios';
import pino from 'pino';
import environment from '../../config/environment';

const isVerbose = true;

export const logger = (config: AxiosRequestConfig) => {
  const { data, params } = config;

  if (isVerbose) {
    pino().info({ data, params }, `Sending to ${config.baseURL}${config.url}`);
  }

  return config;
};

export const onSuccess = (response: AxiosResponse) => {
  const { config } = response;
  pino().info({}, `Received data from ${config.baseURL}${config.url}`);

  return response;
};

export const onError = (error: any) => {
  let { data, config } = error.response || {};
  config = config || error.config;

  if (isVerbose) {
    pino().error(
      { data: data, message: error.message },
      `Error on ${config?.baseURL}${config?.url}`
    );
  } else {
    pino().error(`Error on ${config?.baseURL}${config?.url}`);
  }

  return Promise.reject(error);
};
import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { request, RequestDocument } from 'graphql-request';

type AnyOBJ = {
  [key: string]: any;
};

export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client) {
      client = new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 60 * 24, // 24시간
            staleTime: 1000 * 60, // 1분
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });
    }
    return client;
  };
})();

const BASE_URL = `/`;

export const restFetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
}) => {
  try {
    let url = `${BASE_URL}${path}`;
    const axiosConfig: AxiosRequestConfig = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': BASE_URL,
      },
    };
    if (body) axiosConfig.data = JSON.stringify(body);
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += '?' + searchParams.toString();
    }
    const res = await axios(url, axiosConfig);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const graphqlFetcher = (query: RequestDocument, variables = {}) =>
  request(BASE_URL, query, variables);

export const QueryKeys = {};

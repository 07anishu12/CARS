// API client configuration and setup

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.kerb.com';

export interface APIRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  cache?: RequestCache;
  revalidate?: number;
}

interface NextRequestInit extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

/**
 * Standard fetch wrapper for calling backend microservices in a clean, typed manner.
 */
export async function fetchApi<T>(endpoint: string, options: APIRequestOptions = {}): Promise<T> {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  
  if (options.params) {
    Object.entries(options.params).forEach(([key, val]) => {
      url.searchParams.append(key, String(val));
    });
  }

  const fetchOptions: NextRequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (options.cache) {
    fetchOptions.cache = options.cache;
  }

  if (options.revalidate !== undefined) {
    fetchOptions.next = { revalidate: options.revalidate };
  }

  const response = await fetch(url.toString(), fetchOptions);

  if (!response.ok) {
    throw new Error(`API Request failed on ${endpoint}: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

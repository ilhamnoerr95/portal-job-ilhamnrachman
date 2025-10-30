/**
 * querykey[0] untuk path
 * querykey[1] untuk query
 */

type FetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  queryKey?: (string | Record<string, any>)[];
  headers?: HeadersInit;
  credentials?: string;
  url?: string | undefined | null;
  auth?: boolean;
  serverAction?: boolean; // untuk server action
};

export const Fetcher = async <T>(options: FetcherOptions = {}): Promise<T> => {
  try {
    const {
      method = "GET",
      body,
      credentials,
      queryKey,
      url,
      auth = true,
      serverAction = false,
    } = options;
    const query = new URLSearchParams(queryKey?.[1] as any);
    const path = url || `${queryKey?.[0]}?${query.toString()}`;
    const serverActPath = serverAction
      ? (process.env.API_URL_INTERNAL as string)
      : (process.env.NEXT_PUBLIC_ORIGIN as string);
    const urlString = serverActPath + path;

    const opts = {
      method,
      ...(body && { body: JSON.stringify(body) }),
      headers: {
        "Content-Type": "application/json",
        auth,
      },
      ...(credentials && { credentials }),
    };

    const res = await fetch(urlString, opts);

    const result = await res.json();

    if (!res.ok) {
      console.error("not oke", result);
      return result;
    }

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

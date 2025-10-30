import { queryOptions } from "@tanstack/react-query";
import { Fetcher } from "./fetcher";
import { UseQueryOptions } from "@tanstack/react-query";

type IOptionsParams<TData = unknown> = {
  queryKey?: (string | Record<string, any>)[];
  auth?: boolean;
  config?: Omit<UseQueryOptions<TData>, "queryKey" | "queryFn">;
};

export function groupOptions<TData = unknown>(params: IOptionsParams<TData>) {
  const { queryKey, config } = params;

  return queryOptions<TData>({
    ...config,
    queryKey: (queryKey ?? []) as readonly unknown[],
    queryFn: async (payload: Record<string, any>) => {
      /**
       * @isipayload client, meta, queryKey, signal
       */
      // Convert readonly queryKey to mutable array for FetcherOptions compatibility
      const { ...rest } = payload;

      return Fetcher({
        ...rest,
        // queryKey: Array.isArray(queryKey) ? [...queryKey] : [],
        method: "GET",
        auth: params.auth,
      });
    },
    staleTime: 1000 * 60 * 60, // 1 jam
    retry: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
}

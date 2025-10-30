import { Fetcher } from "./fetcher";

interface MutationParams {
  // Define the shape of your mutation parameters here
  // Example:
  // id: string;
  // data: any;
  [key: string]: any;
}

type IPayload = {
  mutationKey: (string | Record<string, any>)[];
  method: "DELETE" | "POST" | "PUT" | "PATCH";
  refetch?: () => void;
};

interface UseHooksMutationResult {
  mutationKey: (string | Record<string, any>)[];
  mutationFn: (params: MutationParams) => Promise<void>;
}

export const useHooksMutation = (payload: IPayload) => {
  const { mutationKey, method } = payload;

  return {
    mutationKey,
    mutationFn: async (params: MutationParams): Promise<void> => {
      const { id, ...body } = params;

      const hasId = `/${id ? id : ""}`;
      const url = (mutationKey[0] as string) + hasId;

      return await Fetcher({ url, method, body });
    },
    // Define your mutation logic here
    // For example, you can use the `useMutation` hook from a library like `react-query`
    // or implement your own custom logic for mutation
  } as UseHooksMutationResult;
};

import { useStorageClient } from "core/storage";
import { useMutation } from "react-query";

const makeFileObjects = (data: string) => [new File([data], "colloquium.json")];

export const useStorageWrite = () => {
  const client = useStorageClient();

  const { mutate, mutateAsync, ...rest } = useMutation((content: string) => {
    const files = makeFileObjects(content);
    return client!.put(files);
  });

  return { write: mutate, writeAsync: mutateAsync, ...rest };
};

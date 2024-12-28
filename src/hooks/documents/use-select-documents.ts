import { useQuery } from "@tanstack/react-query";
import { SelectDocumentType } from "@/drizzle/schema";
import { API_URL } from "@/lib/utils";

export const useSelectDocumentsByOwnerId = () => {
  return useQuery<SelectDocumentType[], Error>({
    queryKey: ["documentByOwnerId"],

    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/documents`,
      );

      if (!response.ok) throw new Error("Error while fetching documents");

      const { data } = await response.json();

      return data;
    },
  });
};
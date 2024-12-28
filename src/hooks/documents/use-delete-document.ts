import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/lib/utils";
import { toast } from "sonner";
import { InsertDocumentType, SelectDocumentType } from "@/drizzle/schema";

type RequestType = {
  id: InsertDocumentType['id']
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  return useMutation<SelectDocumentType, Error, RequestType>({
    mutationFn: async ({id}) => {
      const response = await fetch(`${API_URL}/documents/${id}`, {
        method: "DELETE",

      });
      if (!response.ok) {
        throw new Error("An error occurred while Creating documents");
      }

      const { data } = await response.json();
      return data;
    },
    onSuccess: async () => {
      const invalidateQueries = queryClient.invalidateQueries({
        queryKey: ["documentByOwnerId"],
      });
      toast.success("Document Deleted Successfully");
      return await invalidateQueries;
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

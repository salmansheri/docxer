import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/lib/utils";
import { toast } from "sonner";
import { InsertDocumentType, SelectDocumentType } from "@/drizzle/schema";

type RequestType = {
  id: string;
  title: InsertDocumentType["title"];
  initialContent?: InsertDocumentType["initialContent"];
};

export const useUpdateDocuments = () => {
  const queryClient = useQueryClient();
  return useMutation<SelectDocumentType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await fetch(`${API_URL}/documents/${json.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: json.title,
          initialContent: json.initialContent,
        }),
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
      toast.success("Document Updated Successfully");
      return await invalidateQueries;
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

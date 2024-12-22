import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { InsertUserType, SelectUserType } from "@/drizzle/schema";
import { API_URL } from "@/lib/utils";

export const useSignUp = () => {
  return useMutation<SelectUserType, Error, InsertUserType>({
    mutationFn: async (user) => {
      const response = await fetch(`${API_URL}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
        }),
      });
      if (!response.ok) {
        throw new Error("An error occurred while signing up");
      }

      const { data } = await response.json();
      return data;
    },
    onSuccess: () => {
      toast.success("Signed Up Successfully");
    },
  });
};

type SignInResponseType = {
  message: string;
  status: number;
};

type SignInRequestType = {
  email: InsertUserType["email"];
  password: InsertUserType["password"];
};

export const useSignIn = () => {
  return useMutation<SignInResponseType, Error, SignInRequestType>({
    mutationFn: async (user) => {
      const response = await fetch(`${API_URL}/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });
      if (!response.ok) {
        throw new Error("An error occurred while signing up");
      }
      const jsonResponse = await response.json();
      return jsonResponse.message;
    },
    onSuccess: () => {
      toast.success("Signed In successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error occurred while signing up");
    },
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/sign-out`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("An error occurred while signing out");
      }

      const jsonResponse = await response.json();
      return jsonResponse.message;
    },
    onSuccess: () => {
      toast.success("Signed Out Successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PasswordInput from "@/components/auth/ui/password-input";
import { useSignIn } from "@/hooks/auth/useAuth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password is too short"),
});

type FormType = z.infer<typeof formSchema>;

const SignUpForm: FC = () => {
  const router = useRouter();
  const { mutate, isPending } = useSignIn();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormType) => {
    console.log(values);
    mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push("/templates");
        },
      },
    );
  };
  return (
    <Card className="w-full lg:w-[70%]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg:sheriffsalman00@gmail.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" size="lg" type="submit">
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="">
          Already have an account?{" "}
          <Link
            className="bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent transition-all  ease-in-out hover:underline"
            href="/sign-up"
          >
            <span className="hover:underline">Sign Up</span>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;

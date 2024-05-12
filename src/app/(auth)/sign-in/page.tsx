"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useDebounceCallback } from "usehooks-ts";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// });

const Page = () => {
 
  const { toast } = useToast();
  // toast({
  //   title: "Scheduled: Catch up",
  //   description: "Friday, February 10, 2023 at 5:57 PM",
  // })

  const router = useRouter();

  //zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // useEffect(() => {
  //   const checkUsernameUnique = async () => {
  //     if (username) {
  //       setIsCheckingUsername(true);
  //       setUsernameMessage("");
  //       try {
  //         const response = await axios.get(
  //           `/api/check-username-unique?username=${username}`
  //         );
  //         setUsernameMessage(response.data.message);
  //       } catch (error) {
  //         const axiosError = error as AxiosError<ApiResponse>;
  //         setUsernameMessage(
  //           axiosError.response?.data.message ?? "Error checking username"
  //         );
  //       } finally {
  //         setIsCheckingUsername(false);
  //       }
  //     }
  //   };
  //   checkUsernameUnique();
  // }, [username]);

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error == "CredentialSignin") {
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Failed",
          description: result.error,
          variant: "destructive",
        });
      }
    }

    if (result?.url) {
      router.replace("/dashboard");
    }
  };

  return (
    <>
      {/* <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg lg:text-5xl mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Join Annonify</h1>
        <p className="mb-4">Sign up to start your anonymous adventure</p>

      </div>
    </div> */}

      <div className="min-h-screen flex">
        <div className="bg-red-200 hidden md:block w-3/5 min-h-screen ">
          <div className="flex items-center justify-center pt-20 flex-col">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              JWelcome back to Anonify
            </h1>
            <p className="mb-4">Sign In to start your anonymous adventure</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full md:w-2/5 min-h-screen">
          <div className="w-full px-24">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6  w-full"
              >
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Email or Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username or email" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
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
                        <Input
                          type="password"
                          placeholder="••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant={"secondary"}
                  size={"lg"}
                  // disabled={isSubmitting}
                  className="w-full border"
                >
                  Signin
                </Button>
              </form>
            </Form>
          </div>
          <div className="text-center mt-4">
            <p>
              New Member?{" "}
              <Link
                href="/sign-up"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

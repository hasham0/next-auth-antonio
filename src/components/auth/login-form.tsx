"use client";
import React, { FC, useState } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema, LoginSchemaTS } from "@/database/schemas";
import FormError from "@/components/customComp/form-error";
import FormSuccess from "@/components/customComp/form-success";
import { useTransition } from "react";
import { ResponseTS } from "@/types";
import { loginAction } from "@/actions/login";

type Props = {};

const LoginForm: FC<Props> = ({}) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const form = useForm<LoginSchemaTS>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit: SubmitHandler<LoginSchemaTS> = (data) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const loginData: ResponseTS = await loginAction(data);
        if (loginData?.error) {
          throw new Error(loginData?.error);
        }
        setSuccess(loginData?.success as string);
      } catch (error) {
        const err = (error as { message: string }).message;
        setError(err as string);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
      showSocial={true}
    >
      <div className="">
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleLoginSubmit)}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="ali@gmail.com"
                        type={"email"}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="********"
                        type={"password"}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              type="submit"
              size={"lg"}
              className="w-full"
              variant={"blue"}
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
};

export default LoginForm;

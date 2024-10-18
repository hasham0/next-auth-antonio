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
import { RegisterSchema, RegisterSchemaTS } from "@/db/schemas";
import FormError from "@/components/customComp/form-error";
import FormSuccess from "@/components/customComp/form-success";
import { RegisterAction } from "@/actions/register";
import { useTransition } from "react";

type Props = {};

const RegisterForm: FC<Props> = ({}) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const form = useForm<RegisterSchemaTS>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleRegisterSubmit: SubmitHandler<RegisterSchemaTS> = (data) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const registerData = await RegisterAction(data);
        if (registerData.error) {
          throw new Error(registerData.error);
        }
        setSuccess(registerData.success as string);
      } catch (error) {
        const err = (error as { message: string }).message;
        setError(err as string);
      }
    });
  };
  return (
    <CardWrapper
      headerLabel="Create an Account"
      backButtonLabel="Already have an account?"
      backButtonHref="/login"
      showSocial={true}
    >
      <div className="">
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleRegisterSubmit)}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="ali"
                        type={"text"}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              />
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
              Register
            </Button>
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
};

export default RegisterForm;

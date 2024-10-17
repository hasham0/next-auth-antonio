"use client";
import React, { FC } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema, LoginSchemaTS } from "@/db/schemas";

type Props = {};

const LoginForm: FC<Props> = ({}) => {
  const form = useForm<LoginSchemaTS>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      emai: "",
      password: "",
    },
  });

  const handleLoginSubmit = (data: LoginSchemaTS) => {
    console.log("🚀 ~ handleLoginSubmit ~ data:", data);
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
          <form onSubmit={form.handleSubmit(handleLoginSubmit)}></form>
        </Form>
      </div>
    </CardWrapper>
  );
};

export default LoginForm;

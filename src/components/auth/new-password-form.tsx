"use client";
import React, { FC, useEffect, useState } from "react";
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
import { NewPasswordSchema, NewPasswordSchemaTS } from "@/database/schemas";
import FormError from "@/components/customComp/form-error";
import FormSuccess from "@/components/customComp/form-success";
import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ResponseTS } from "@/types";
import { newPasswordAction } from "@/actions/new-password";

type Props = {};

const NewPasswordForm: FC<Props> = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token: string | null = searchParams.get("token");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const form = useForm<NewPasswordSchemaTS>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleNewPasswordSubmit: SubmitHandler<NewPasswordSchemaTS> = (
    values,
  ) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const newPasswordData: ResponseTS = await newPasswordAction({
          value: values,
          token,
        });
        if (newPasswordData?.error) {
          throw new Error(newPasswordData?.error);
        }
        setSuccess(newPasswordData?.success as string);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (error) {
        const err = (error as { message: string }).message;
        setError(err as string);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter a new Password"
      backButtonLabel="Back to login"
      backButtonHref="/login"
      showSocial={false}
    >
      <div>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleNewPasswordSubmit)}
          >
            <div className="space-y-4">
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
              />{" "}
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
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
};

export default NewPasswordForm;

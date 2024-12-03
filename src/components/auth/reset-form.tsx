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
import { ResetSchema, ResetSchemaTS } from "@/database/schemas";
import FormError from "@/components/customComp/form-error";
import FormSuccess from "@/components/customComp/form-success";
import { useTransition } from "react";
import { ResponseTS } from "@/types";
import { resetPasswordAction } from "@/actions/reset";

type Props = {};

const ResetForm: FC<Props> = ({}) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const form = useForm<ResetSchemaTS>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleResetSubmit: SubmitHandler<ResetSchemaTS> = (values) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const resetData: ResponseTS = await resetPasswordAction(values);
        if (resetData?.error) {
          throw new Error(resetData?.error);
        }
        setSuccess(resetData?.success as string);
      } catch (error) {
        const err = (error as { message: string }).message;
        setError(err as string);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Forget your Password"
      backButtonLabel="Back to login"
      backButtonHref="/login"
      showSocial={false}
    >
      <div>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleResetSubmit)}
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
              Send reset email
            </Button>
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
};

export default ResetForm;

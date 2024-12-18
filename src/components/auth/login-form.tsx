"use client";
import React, { FC, useState } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import { ResponseTS, TwoFactorTS } from "@/types";
import { loginAction } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Props = {};

const LoginForm: FC<Props> = ({}) => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const form = useForm<LoginSchemaTS>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit: SubmitHandler<LoginSchemaTS> = (values) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const loginData: TwoFactorTS | ResponseTS = await loginAction(values);
        if (!loginData) {
          throw new Error("Unexpected null response from login");
        }
        if ("twoFactor" in loginData) {
          toast.success("Two Factor Authentication", {
            description: loginData.message,
          });
          setShowTwoFactor((pre) => !pre);
        } else {
          if (loginData?.error) {
            throw new Error(loginData.error);
          }
          if (loginData?.success) {
            form.reset();
            setSuccess(loginData?.success);
          }
        }
      } catch (error) {
        const errMessage = (error as { message: string }).message;
        form.reset();
        setError(errMessage);
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
      <div>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleLoginSubmit)}
          >
            <div className="space-y-4">
              {showTwoFactor && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type={"text"}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {!showTwoFactor && (
                <>
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
                        <Button
                          size={"sm"}
                          asChild
                          variant={"link"}
                          className="w-full px-0 text-center font-normal hover:underline-offset-1"
                        >
                          <Link href={"/reset"}>Forgot Password</Link>
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              type="submit"
              size={"lg"}
              className="w-full"
              variant={"blue"}
            >
              {showTwoFactor ? "Confirm" : "login"}
            </Button>
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
};

export default LoginForm;

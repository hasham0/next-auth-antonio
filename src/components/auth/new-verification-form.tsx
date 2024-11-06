"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import FormError from "@/components/customComp/form-error";
import FormSuccess from "@/components/customComp/form-success";
type Props = {};

const NewVerificationForm: FC<Props> = ({}) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const onSubmit = useCallback(async () => {
    if (!token) {
      return setError("Missing token");
    }
    try {
      const verificationData = await newVerification(token);
      if (verificationData?.error) {
        throw new Error(verificationData?.error);
      }
      setSuccess(verificationData?.success as string);
    } catch (error) {
      const err = (error as { message: string }).message;
      setError(err as string);
    }
  }, [token, success, error]);

  useEffect(() => {
    if (success || error) return;
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirm your verification"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;

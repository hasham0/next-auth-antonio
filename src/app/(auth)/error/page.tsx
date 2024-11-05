import ErrorCard from "@/components/auth/error-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error",
};

type Props = {};

export default function Errorpage({}: Props) {
  return <ErrorCard />;
}

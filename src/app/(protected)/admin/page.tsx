"use client";

import { toast } from "sonner";
import { UserRole } from "@prisma/client";
import { adminAction } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import RoleGate from "@/app/(protected)/_components/role-gate";
import FormSuccess from "@/components/customComp/form-success";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

type Props = {};

export default function AdminPage({}: Props) {
  const handleApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API Route!");
      } else {
        toast.error("Forbidden API Route!");
      }
    });
  };

  const handleServerActionClick = async () => {
    adminAction().then((data) => {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.success(data.success);
      }
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <div className="flex items-center justify-center gap-x-3 text-2xl font-semibold">
          <ShieldCheck />
          <p>Admin</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowRole={UserRole.ADMIN}>
          <FormSuccess message="You are allow to view this content" />
        </RoleGate>{" "}
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin Only API route</p>
          <Button onClick={handleApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin Only server Action</p>
          <Button onClick={handleServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}

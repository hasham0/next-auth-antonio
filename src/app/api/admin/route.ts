import { UserRole } from "@prisma/client";
import currentRole from "@/lib/current-role";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const role = await currentRole();
  if (role === UserRole.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }
  return new NextResponse(null, { status: 403 });
}

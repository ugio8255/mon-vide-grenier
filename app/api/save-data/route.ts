import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const data = await req.text();
  const filePath = path.join(process.cwd(), "app/lib/produits-data.ts");
  fs.writeFileSync(filePath, `export const PRODUITS_INITIAUX = ${data};`);
  return NextResponse.json({ ok: true });
}

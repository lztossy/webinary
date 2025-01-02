import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { readFileSync } from "fs";

export async function GET(req: NextRequest) {
  const wasmPath = path.join(process.cwd(), "public", "wasm", "binary_scanner_bg.wasm");
  const wasmFile = readFileSync(wasmPath);

  return new NextResponse(wasmFile, {
    headers: {
      "Content-Type": "application/wasm",
      "Cache-Control": "no-store",
    },
  });
}

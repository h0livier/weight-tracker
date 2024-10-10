import { NextResponse } from "next/server";

export function GET(){
    return NextResponse.json({message: "API Up !"}, {status: 200})
}
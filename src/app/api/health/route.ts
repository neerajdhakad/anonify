import { NextResponse } from 'next/server';
export async function GET(request:Request){ 
      return NextResponse.json({
        success: true,
        message: "Server is working fine!!",
      },
      { status: 200 });
}
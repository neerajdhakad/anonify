export async function GET(request:Request){
    return Response.json({
        success: true,
        message: "Server is working fine!!",
      },
      { status: 200 })
}
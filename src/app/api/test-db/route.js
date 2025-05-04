import { connectToDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectToDB();

    return Response.json({
      status: 'success',
      message: 'MongoDB connection verified successfully ✅',
    });
  } catch (error) {
    return Response.json(
      {
        status: 'error',
        message: 'Failed to connect to MongoDB ❌',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

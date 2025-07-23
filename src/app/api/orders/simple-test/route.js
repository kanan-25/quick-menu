export async function POST(request) {
  try {
    console.log('Simple test endpoint called');
    
    const body = await request.json();
    console.log('Received data:', JSON.stringify(body, null, 2));
    
    return Response.json({
      success: true,
      message: 'Simple test successful',
      receivedData: body
    });
    
  } catch (error) {
    console.error('Simple test error:', error);
    return Response.json({
      success: false,
      message: 'Simple test failed',
      error: error.message
    }, { status: 500 });
  }
}

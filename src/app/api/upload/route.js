import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

// This is a simplified image upload handler
// In a production environment, you would use a cloud storage service like AWS S3
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    
    if (!file) {
      return Response.json({ message: 'No file uploaded' }, { status: 400 });
    }
    
    // Get file extension
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    // Validate file type
    const allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    if (!allowedTypes.includes(fileExtension)) {
      return Response.json({ message: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }
    
    // Generate a unique filename
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    
    // Create the uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    
    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Write the file to the uploads directory
    const filePath = join(uploadsDir, uniqueFilename);
    await writeFile(filePath, buffer);
    
    // Return the URL to the uploaded file
    const fileUrl = `/uploads/${uniqueFilename}`;
    
    return Response.json({ 
      message: 'File uploaded successfully',
      imageUrl: fileUrl
    }, { status: 201 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}

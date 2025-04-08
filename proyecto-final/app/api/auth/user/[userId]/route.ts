// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // adjust path if needed


    const storage = new Storage();
    const BUCKET_NAME = 'bucket-videoar'; // Replace with your bucket name
  
  

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { userId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
 
}
 
export async function PUT(request: NextRequest, { params }: { params: { id: string } }){
    const userId = params.id

    
      const user = await prisma.user.findUnique({
        where: { userId: userId },
      });
  
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      const body = await request.json();
      const { name, userImage, password } = body;

    
      const response = await fetch(userImage);
      const buffer = await response.arrayBuffer();
      const fileName = `${userId}-${Date.now()}.jpg`; // Generate a unique file name
      const file = storage.bucket(BUCKET_NAME).file(fileName);
      await file.save(Buffer.from(buffer), {
        metadata: { contentType: 'image/jpeg' }, // Adjust content type if needed
        public: true,
      });
      // Assign the name of the image as its URL
      const imageUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${fileName}`;

      if (!name && !userImage) {
        return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
      }

      const updatedUser = await prisma.user.update({
        where: { userId: userId },
        data: {
          name: user?.name,
          imageUrl: imageUrl,
          password: password        
        },
      });

      return NextResponse.json(updatedUser);
    
      
  
} 

//finish the user put method
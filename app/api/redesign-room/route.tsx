import { NextResponse } from "next/server";
import { writeFile } from "fs/promises"; 
import Replicate from "replicate"; 
import axios from "axios"; 
import { getDownloadURL, ref, uploadString } from "firebase/storage"; 
import { storage } from "@/utils/firebaseConfig"; 
import { db } from "@/utils/db"; 
import { aiGeneratedImages } from "@/utils/schema"; 
import { useUser } from "@clerk/nextjs"; 
const replicate = new Replicate({ auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN, });

export async function POST(req) {
  const { imageUrl, roomType, additionalReq,userEmail} = await req.json();

  try {
    const input = { image: imageUrl, prompt: 'A'+roomType+' with a modern style interior'+ additionalReq }; 
     const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input }); 
    // Convert to Base64
    const base64Image = await convertImageToBase64(output);

    // Save to Firebase
    const fileName = Date.now() + ".png";
    const storageRef = ref(storage, 'room-redesign/' + fileName);
    await uploadString(storageRef, base64Image, 'data_url');
    const downloadUrl = await getDownloadURL(storageRef);

    // Save to DB
    if (!imageUrl || !downloadUrl || !roomType) {
      throw new Error("Missing required data for AI image insert");
    }

    const dbResult = await db.insert(aiGeneratedImages).values({
      roomType: roomType,            // or just roomType
      orgImage: imageUrl,            // must not be null
      generatedImage: downloadUrl,   // must not be null
      userEmail: userEmail,
    }).returning({ id: aiGeneratedImages.id });

    return NextResponse.json({ result: downloadUrl });

  } catch (error) {
    console.error("Insert AiGeneratedImage failed:", error);
    return NextResponse.json({ error: String(error) });
  }
}

async function convertImageToBase64(imageUrl) {
  const resp = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const base64 = Buffer.from(resp.data).toString('base64');
  return `data:image/png;base64,${base64}`;
}

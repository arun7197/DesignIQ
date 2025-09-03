"use client"
import React, { useEffect, useState } from 'react'
import ImageUpload from './_components/ImageUpload'
import RoomType from './_components/RoomType'
import TextArea from './_components/TextArea'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/utils/firebaseConfig'
import { useUser } from '@clerk/nextjs'
import AiOutputDialog from '../_components/AiOutputDialog'
export default function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [orgImage,setOrgImage] = useState();
  const [loading, setLoading] = useState(false);
  const [openOutputDialog,setOpenOutputDialog] = useState(false);
  const {user} =useUser();
  useEffect(() => {
    //console.log(formData);
  }, [formData]);
  const onHandleInputChange = (value: string, fieldName: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }
  const GenerateAiImage = async () => {
    const rawImageUrl = await saveRawImageToFirebase();
    
    try {
      setLoading(true);
      const result = await axios.post('/api/redesign-room', {
        imageUrl: rawImageUrl,
        roomType: formData.roomType,
        additionalRequirements: formData.additionalRequirements,
        userEmail: user?.primaryEmailAddress?.emailAddress
      });
      setGeneratedImage(result.data.result);
      setOpenOutputDialog(true);
    } catch (error: any) {
      console.error(error);
      alert("Failed to generate image: " + error.message);
    } finally {
      setLoading(false);
    }
  }
  const saveRawImageToFirebase = async () => {
    const fileName = Date.now() + "_raw.png";
    const imageRef = ref(storage, "room-redesign/" + fileName);
    await uploadBytes(imageRef, formData.image);
    const downloadUrl = await getDownloadURL(imageRef);
    setOrgImage(downloadUrl);
    return downloadUrl;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Experience the Magic of AI Design
        </h2>
        <p className="mt-4 text-gray-600">
          Transform your living spaces into stunning environments with our cutting-edge AI-generated designs, 
          tailored perfectly to your style and preferences
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ImageUpload selectedImage={(value) => onHandleInputChange(value, 'image')} />
            <RoomType selectedRoomType={(value) => onHandleInputChange(value, 'roomType')} />
            <TextArea TextInput={(value) => onHandleInputChange(value, 'additionalRequirements')} />
          </div>
          
          {generatedImage && (
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className=" text-gray-600 mb-4">Generated Design</h3>
              <img 
                src={generatedImage} 
                alt="AI Generated Room" 
                className="w-full h-auto rounded-lg shadow-md transition-transform hover:scale-[1.02]" 
              />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-3 pt-4">
          <Button 
            onClick={GenerateAiImage} 
            disabled={loading}
            className="w-full max-w-md bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 rounded-lg transition-all"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Generating...
              </span>
            ) : "Generate Design"}
          </Button>
        </div>
      </div>

      <AiOutputDialog 
        openDialog={openOutputDialog}
        closeDialog={() => setOpenOutputDialog(false)}
        orgImage={orgImage}
        genImage={generatedImage}
      />
    </div>
  )
}

"use client"
import React, { useState, useEffect } from "react"
import { Upload } from "lucide-react"

export default function ImageUpload({ selectedImage }: { selectedImage: (file: File) => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [uploading, setUploading] = useState(false)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      setFile(selectedFile)

      // Create preview URL
      const previewUrl = URL.createObjectURL(selectedFile)
      setPreview(previewUrl)

      // ✅ Pass the file itself (not just the preview URL)
      selectedImage(selectedFile)
    }
  }

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors">
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          onChange={onFileChange}
          className="hidden"
        />
        <label
          htmlFor="upload-image"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          {preview ? (
            <div className="relative w-full aspect-video">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-md"
              />
              {uploading && (
                <p className="text-sm text-gray-500 mt-2 text-center">Uploading...</p>
              )}
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-600">
                Drop your image here, or <span className="text-blue-500">browse</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supports: JPG, PNG, GIF (Max 10MB)
              </p>
            </>
          )}
        </label>
      </div>
    </div>
  )
}

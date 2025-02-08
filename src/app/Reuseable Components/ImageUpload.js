"use client";

import { useRef, forwardRef, useImperativeHandle } from "react";

const ImageUpload = forwardRef(({ onUpload }, ref) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file); // Pass the file back to the parent component
    } else {
      alert("No file selected!");
    }
  };

  // Expose methods to the parent component
  useImperativeHandle(ref, () => ({
    clearInput: () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the input field
      }
    },
  }));
  ImageUpload.displayName = "ImageUpload";
  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
      />
    </div>
  );
});

export default ImageUpload;
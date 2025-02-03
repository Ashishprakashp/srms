import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./PassportPhotoUpload.css";

const PassportPhotoUpload = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState("");

  // File validation
  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Please upload a JPEG or PNG image.");
      return false;
    }

    if (file.size > maxSize) {
      setError("File size is too large. Maximum size is 2MB.");
      return false;
    }

    setError("");
    return true;
  };

  // Handle file drop/upload
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      setError("Invalid file. Please upload a valid JPEG or PNG image.");
      return;
    }

    const file = acceptedFiles[0];

    if (validateFile(file)) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Configure dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/jpg",
    maxSize: 2 * 1024 * 1024, // 2MB
    multiple: false, // Allow only one image
  });

  return (
    <div className="photo-upload-container">
      <h2>Upload Passport Size Photo</h2>

      <div className="upload-wrapper">
        {/* Dropzone Area */}
        <div className="dropzone" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag & drop a photo here, or click to select a file (JPEG or PNG, max 2MB).</p>
        </div>

        {/* Image Preview */}
        <div className="image-preview-container">
          <p className="image-preview-label">Preview:</p>
          <div className="image-preview">
            {uploadedImage ? (
              <img src={uploadedImage} alt="Uploaded Preview" />
            ) : (
              <p>No Image Selected</p>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PassportPhotoUpload;

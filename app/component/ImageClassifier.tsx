// app/components/ImageClassifier.tsx
import React, { useState, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
import Image from "next/image";

const ImageClassifier = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadAndClassifyImage = async (imageElement: HTMLImageElement) => {
    // Load the MobileNet model
    const model = await mobilenet.load();
    // Classify the uploaded image
    const predictions = await model.classify(imageElement);
    // Set the result
    setResult(predictions[0]?.className || "No result");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClassifyClick = () => {
    const img = document.getElementById("uploadedImage") as HTMLImageElement;
    if (img) {
      loadAndClassifyImage(img);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">
        Image Classifier with TensorFlow.js
      </h1>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      {image && (
        <div className="flex flex-col items-center">
          <Image
            id="uploadedImage"
            src={image}
            alt="Uploaded"
            width={300}
            height={300}
            className="mb-4 rounded shadow-lg"
          />
          <button
            onClick={handleClassifyClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Classify Image
          </button>
        </div>
      )}

      {result && (
        <div className="mt-4 text-lg font-medium text-green-600">
          Prediction: {result}
        </div>
      )}
    </div>
  );
};

export default ImageClassifier;

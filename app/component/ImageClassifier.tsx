// app/components/ImageClassifier.tsx
import React, { useState, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
import Image from "next/image";
import { motion } from "framer-motion";

const ImageClassifier = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadAndClassifyImage = async (imageElement: HTMLImageElement) => {
    const model = await mobilenet.load();
    const predictions = await model.classify(imageElement);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white px-4 py-8">
      <motion.h1
        className="text-4xl font-extrabold mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        AI-Powered Image Classifier
      </motion.h1>

      <motion.div
        className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-6 space-y-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md text-sm font-semibold shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            Upload an Image
          </label>
          <input
            id="file-upload"
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {image && (
          <motion.div
            className="flex flex-col items-center mt-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              id="uploadedImage"
              src={image}
              alt="Uploaded Image"
              width={300}
              height={300}
              className="rounded-lg border-2 border-gray-300 shadow-lg"
            />
            <motion.button
              onClick={handleClassifyClick}
              className="mt-4 bg-green-500 text-white py-2 px-6 rounded-lg text-sm font-semibold shadow-lg hover:bg-green-600 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Classify Image
            </motion.button>
          </motion.div>
        )}

        {result && (
          <motion.div
            className="mt-6 text-center text-lg font-semibold bg-gray-900 p-4 rounded-lg shadow-md text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Prediction: {result}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ImageClassifier;

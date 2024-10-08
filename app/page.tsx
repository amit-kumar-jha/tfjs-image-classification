// app/page.tsx
// import ImageClassifier from './components/ImageClassifier';
"use client";
import ImageClassifier from "./component/ImageClassifier";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <ImageClassifier />
    </main>
  );
}

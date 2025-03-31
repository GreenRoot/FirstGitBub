"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Confetti from "react-confetti";

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCreateClick = () => {
    setShowVideo(true);
    setShowFinalMessage(false);
    setTimeout(() => {
      videoRef.current?.play().catch((error) => {
        console.error("Video play failed:", error);
      });
    }, 100);
  };

  const handleVideoEnd = () => {
    setShowFinalMessage(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white font-sans p-4 overflow-hidden">
      {!showVideo ? (
        <>
          <header className="w-full p-4 text-center mb-8">
            <h1 className="text-2xl font-bold">GitBub</h1>
            <p className="text-sm text-gray-400">Your friendly code pet</p>
          </header>

          <main className="flex flex-col items-center justify-center flex-grow w-full">
            <p className="mb-6 text-lg text-center">
              Ready to start something amazing?
            </p>
            <button
              onClick={handleCreateClick}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Create GitBub
            </button>
            <p className="mt-4 text-xs text-gray-500">
              (It's totally not a trap)
            </p>
          </main>

          <footer className="w-full p-4 text-center text-xs text-gray-600 mt-8">
            © 2024 GitBub Inc. (Definitely real)
          </footer>
        </>
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-black relative">
          {!showFinalMessage ? (
            <video
              ref={videoRef}
              src="/rickroll.mp4"
              controls
              preload="auto"
              playsInline
              className="max-w-full max-h-full z-10"
              onEnded={handleVideoEnd}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
              <Confetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={400}
                gravity={0.3}
              />
              <h2 className="text-4xl font-bold text-yellow-400 animate-bounce">
                АХхахаха Витёчек, как дела?
              </h2>
              <button
                onClick={() => {
                  setShowVideo(false);
                  setShowFinalMessage(false);
                }}
                className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Try Again?
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";

const fakeUser = {
  name: "Vitya CodeWizard",
  avatarPlaceholder: "VC",
};

const fakeRepos = [
  {
    id: 1,
    name: "cool-project",
    description: "Probably the next big thing.",
    language: "TypeScript",
  },
  {
    id: 2,
    name: "dotfiles",
    description: "My personal config files.",
    language: "Shell",
  },
  {
    id: 3,
    name: "learning-rust",
    description: "Notes and code while learning Rust.",
    language: "Rust",
  },
  {
    id: 4,
    name: "prank-app",
    description: "Top secret project.",
    language: "JavaScript",
  },
];

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
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 font-sans overflow-hidden">
      {!showVideo ? (
        <>
          <header className="w-full p-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl mr-2">👾</span>{" "}
              <h1 className="text-xl font-bold text-white">GitBub</h1>
            </div>
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">
              {fakeUser.avatarPlaceholder}
            </div>
          </header>

          <main className="flex-grow w-full max-w-4xl mx-auto p-4 md:p-6">
            <div className="flex items-center mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-lg font-bold mr-4">
                {fakeUser.avatarPlaceholder}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {fakeUser.name}
                </h2>
                <p className="text-sm text-gray-400">
                  Professional Button Clicker
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Repositories</h3>
              <button
                onClick={handleCreateClick}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md text-sm shadow transition duration-200 ease-in-out"
              >
                ✨ Create GitBub
              </button>
            </div>

            <div className="space-y-3">
              {fakeRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="p-4 bg-gray-800 rounded-md border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCreateClick();
                    }}
                    className="text-blue-400 hover:underline font-semibold"
                  >
                    {fakeUser.name.split(" ")[0].toLowerCase()} / {repo.name}
                  </a>
                  <p className="text-sm text-gray-400 mt-1 mb-2">
                    {repo.description}
                  </p>
                  {repo.language && (
                    <span className="text-xs text-gray-500">
                      {repo.language}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-gray-500">
              (Clicking anything might lead to unexpected fun... or &apos;Create
              GitBub&apos;)
            </p>
          </main>

          <footer className="w-full p-3 text-center text-xs text-gray-500 border-t border-gray-700 mt-8">
            © 2024 GitBub Inc. | Not affiliated with GitHub | Terms | Privacy
            (lol)
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

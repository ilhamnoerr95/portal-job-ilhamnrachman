// components/WebcamCapture.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { Button } from "../atoms/button";

declare global {
  interface Window {
    Hands: any;
    Camera: any;
  }
}

export default function WebcamCapture({ onClose }: { onClose?: () => void }) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [poseSequence, setPoseSequence] = useState<number[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const videoConstraints = { width: 640, height: 480, facingMode: "user" };

  // Hitung jari
  const countFingers = (landmarks: any[]) => {
    if (!landmarks || landmarks.length < 21) return 0;

    const tips = [4, 8, 12, 16, 20];
    const pips = [2, 6, 10, 14, 18];
    let count = 0;

    // Jempol
    if (landmarks[4].x < landmarks[3].x) count++;

    // Jari lain
    for (let i = 1; i < 5; i++) {
      if (landmarks[tips[i]].y < landmarks[pips[i]].y - 0.15) count++;
    }
    return count;
  };

  // Update urutan pose
  const updatePose = (fingers: number) => {
    setPoseSequence((prev) => {
      const last = prev[prev.length - 1];

      if (fingers === 1 && last !== 1) return [...prev.slice(-1), 1];
      if (fingers === 2 && last === 1) return [...prev.slice(-1), 2];
      if (fingers === 3 && last === 2) {
        setCountdown(1);
        setTimeout(() => capturePhoto(), 1000);
        return [];
      }
      if (fingers === 0) return [];
      return prev;
    });
  };

  // Ambil foto
  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setPoseSequence([]);
      setCountdown(null);
    }
  };

  // Simpan
  const savePhoto = () => {
    if (!capturedImage) return;
    const link = document.createElement("a");
    link.href = capturedImage;
    link.download = `gesture-capture-${Date.now()}.jpg`;
    link.click();
  };

  const resetCapture = () => {
    setCapturedImage(null);
    setPoseSequence([]);
    setCountdown(null);
  };

  // Load MediaPipe dari CDN
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js";
    script1.crossOrigin = "anonymous";
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js";
    script2.crossOrigin = "anonymous";

    script1.onload = () => {
      document.body.appendChild(script2);
    };

    script2.onload = () => {
      if (!webcamRef.current?.video || !canvasRef.current) return;

      const hands = new window.Hands({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
      });

      let active = true;

      hands.onResults((results: any) => {
        if (!active || !canvasRef.current) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        ctx.save();
        ctx.clearRect(0, 0, 640, 480);
        ctx.drawImage(results.image, 0, 0, 640, 480);

        if (results.multiHandLandmarks?.[0]) {
          const fingers = countFingers(results.multiHandLandmarks[0]);
          updatePose(fingers);
        } else {
          updatePose(0);
        }

        ctx.restore();
      });

      const camera = new window.Camera(webcamRef.current.video!, {
        onFrame: async () => {
          if (webcamRef.current?.video) {
            await hands.send({ image: webcamRef.current.video });
          }
        },
        width: 640,
        height: 480,
      });

      camera.start().then(() => setIsLoading(false));

      return () => {
        active = false;
        camera.stop();
      };
    };

    return () => {
      document.querySelectorAll('script[src*="mediapipe"]').forEach((s) => s.remove());
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto pb-6 pt-4 font-sans">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col text-left">
          <h3 className="text-lg font-bold mb-1">Raise Your Hand to Capture</h3>
          <p className="text-center">We’ll take the photo once your hand pose is detected.</p>
        </div>

        <X size={32} className="cursor-pointer mr-4" onClick={onClose} />
      </div>

      {!capturedImage ? (
        <div className="relative">
          <div className="relative w-full inline-block border-4 border-purple-600 rounded-lg overflow-hidden">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full max-h-[400px] object-cover"
            />

            <canvas ref={canvasRef} width={620} height={480} className="absolute top-0 left-0" />

            <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white p-3 rounded-lg">
              <p className="text-sm font-semibold">Urutan:</p>
              <p className="text-lg">
                {poseSequence
                  .map((p) => (p === 1 ? "1 finger" : p === 2 ? "2 fingers" : "3 fingers"))
                  .join(" to ") || "Tunggu..."}
              </p>
              {countdown && <p className="text-xl animate-pulse mt-1">Foto dalam {countdown}...</p>}
            </div>
          </div>
          <div className="mt-4 space-x-4">
            <p className="text-sm font-medium">
              To take a picture, follow the hand poses in the order shown below. The system will
              automatically capture the image once the final pose is detected.
            </p>

            <div className="flex text-center gap-4 items-center justify-center mt-4">
              {["/hand1.png", "/hand2.png", "/hand3.png"].map((data, index, arr) => (
                <>
                  <Image src={data} height={57} width={57} alt="hand" />
                  {index < arr.length - 1 && <ArrowRight size={32} />}
                </>
              ))}
            </div>
          </div>

          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <p className="text-white text-xl">Loading MediaPipe...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <div className="inline-block border-4 border-green-600 rounded-lg overflow-hidden">
            <Image src={capturedImage} alt="Captured" width={640} height={480} />
          </div>
          <div className="mt-6 space-x-4">
            <Button
              variant="normal"
              onClick={resetCapture}
              className="px-6 py-2 border boder-gray-600 rounded-lg"
            >
              Retake photo
            </Button>
            <Button onClick={savePhoto} className="px-6 py-2">
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

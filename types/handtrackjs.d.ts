// src/types/handtrackjs.d.ts
declare module "handtrackjs" {
  export function load(config?: {
    flipHorizontal?: boolean;
    maxNumBoxes?: number;
    scoreThreshold?: number;
  }): Promise<any>;

  export interface Prediction {
    bbox: [number, number, number, number];
    class: string;
    score: number;
    landmarks?: number[][];
  }

  export interface HandTrackModel {
    detect(video: HTMLVideoElement): Promise<Prediction[]>;
    getFPS(): number;
    renderPredictions(
      predictions: Prediction[],
      canvas: HTMLCanvasElement,
      context: CanvasRenderingContext2D,
      video: HTMLVideoElement
    ): void;
  }

  export const defaultModel: HandTrackModel;
}

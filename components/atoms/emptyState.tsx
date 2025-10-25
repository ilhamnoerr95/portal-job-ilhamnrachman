import Image from "next/image";
import React from "react";
import { Button } from "./button";
import clsx from "clsx";
type IProps = {
  text?: string;
  btn?: boolean;
  handleOpen?: () => void;
};
const EmptyState: React.FC<IProps> = ({ text, btn = false, handleOpen }) => {
  return (
    <>
      <div className="w-full max-w-[300px] aspect-square relative">
        <Image
          src="/emptyState.webp"
          alt="empty-state"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 200px, 300px"
        />
      </div>
      <div className={clsx(btn && "text-center relative")}>
        <p className="font-bold text-2xl">No job openings available</p>
        <p className="text-gray-500 mt-2">{text}</p>
        {btn && (
          <Button
            size="md"
            className="cursor-pointer rounded-md bg-yellow-400 mt-4 text-zinc-950 hover:bg-yellow-500"
            onClick={handleOpen}
          >
            Create a new job
          </Button>
        )}
      </div>
    </>
  );
};

export default EmptyState;

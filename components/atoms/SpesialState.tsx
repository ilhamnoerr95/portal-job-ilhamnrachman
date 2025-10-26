import Image from "next/image";
import React from "react";
import { Button } from "./button";
import clsx from "clsx";
type IProps = {
  text?: string;
  btn?: boolean;
  handleOpen?: () => void;
  image: string;
  height?: string;
  width?: string;
  title?: string;
};
const SpesialState: React.FC<IProps> = ({
  image,
  text,
  btn = false,
  handleOpen,
  height = "200px",
  width = "300px",
  title = "No job openings available",
}) => {
  return (
    <>
      <div className="w-full max-w-[300px] aspect-square relative">
        <Image
          src={image}
          alt="special-state"
          fill
          className="object-contain"
          sizes={`(max-width: 768px) ${width}, ${height}`}
        />
      </div>
      <div className={clsx(btn && "text-center relative")}>
        <p className="font-bold text-2xl">{title}</p>
        <p className="text-gray-500 mt-2 max-w-[606px]">{text}</p>
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

export default SpesialState;

"use client";

import React from "react";
import clsx from "clsx";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = "",
  //gradient = "from-blue-600 via-blue-700 to-blue-700",
  gradient = "from-red-600 via-red-500 to-red-600"
}) => {
  return (
    <span
      className={clsx(
        "text-transparent bg-clip-text bg-gradient-to-r",
        gradient,
        className
      )}
    >
      {children}
    </span>
  );
};

export default GradientText;

import React from "react";
import { Loader2 } from "lucide-react";

export function Spinner({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Loader2
      size={size}
      className={`animate-spin text-current inline-block ${className}`}
    />
  );
}

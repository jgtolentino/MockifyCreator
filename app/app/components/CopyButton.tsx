"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 px-3 py-1 text-xs rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-200 transition-colors"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

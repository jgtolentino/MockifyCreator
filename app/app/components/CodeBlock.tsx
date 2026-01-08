"use client";

import CopyButton from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div className="relative group">
      <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto text-sm">
        {language && (
          <span className="text-zinc-500 text-xs mb-2 block">{language}</span>
        )}
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  );
}

import React from "react";
import { FaDownload } from "react-icons/fa";

interface DownloadButtonProps {
  content: string;
  fileName?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  content,
  fileName,
}) => {
  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName
      ? `${fileName.replaceAll(".txt", "")}_results.txt`
      : "results.txt";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      className="rounded-xl hover:bg-opacity-15 transition-colors flex items-center gap-3 bg-white p-3 w-max bg-opacity-10"
      onClick={handleDownload}
    >
      <FaDownload />
      <p> Download Results</p>
    </button>
  );
};

export default DownloadButton;

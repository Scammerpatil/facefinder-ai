"use client";
import { IconClipboardText, IconCloudUpload } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const UploadCCTV = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please upload a file first.");
      return;
    }
    try {
      const res = axios.postForm("/api/missing-person/upload-cctv", { file });
      toast.promise(res, {
        loading: "Finding Lost People...",
        success: (data) => {
          return `Lost People Found File Created`;
        },
        error: (error) => {
          console.log(error);
          return error.response.data.message || "Oops!! Something went wrong.";
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Error uploading file. Please try again.");
    }
  };
  return (
    <>
      <h1 className="uppercase text-3xl text-center font-semibold">
        Upload CCTV
      </h1>
      <div className="flex mt-6 items-center justify-center w-full max-w-md mx-auto hover:bg-base-300">
        <label
          className="flex flex-col items-center justify-center w-full h-full border-2 border-base-content border-dashed rounded-lg cursor-pointer bg-base-100 py-2"
          htmlFor="dropzone-file"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <IconCloudUpload size={48} className="text-base-content" />
            <p className="mb-2 text-sm text-base-content">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-base-content">MP4 (MAX. 800x400px)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="video/mp4"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
            }}
          />
          {file && (
            <button className="btn btn-sm btn-info max-w-sm text-center">
              <IconClipboardText size={14} />
              {file?.name}
            </button>
          )}
        </label>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="btn btn-primary w-full max-w-md"
          disabled={!file}
          onClick={handleSubmit}
        >
          Predict
        </button>
      </div>
    </>
  );
};
export default UploadCCTV;

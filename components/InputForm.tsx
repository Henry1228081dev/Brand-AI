
import React, { useState, useRef, useEffect } from 'react';
import type { BrandInfo } from '../types';

interface InputFormProps {
  onSubmit: (
    file: File,
    brandInfo: BrandInfo,
    contentDescription: string
  ) => void;
  isLoading: boolean;
  initialBrandInfo?: BrandInfo | null;
}

export const InputForm: React.FC<InputFormProps> = ({
  onSubmit,
  isLoading,
  initialBrandInfo,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [brandInfo, setBrandInfo] = useState<BrandInfo>(
    initialBrandInfo || {
      name: '',
      personality: '',
      colors: '',
      platform: 'TikTok',
      competitors: '',
    }
  );
  const [contentDescription, setContentDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialBrandInfo) {
      setBrandInfo(initialBrandInfo);
    }
  }, [initialBrandInfo]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === 'contentDescription') {
      setContentDescription(value);
    } else {
      setBrandInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload an image or video file.');
      return;
    }
    if (!brandInfo.name || !brandInfo.platform || !contentDescription) {
      setError('Please fill in Brand Name, Platform, and Content Description.');
      return;
    }
    setError(null);
    onSubmit(file, brandInfo, contentDescription);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
       <div className="bg-gray-800 p-3 rounded-lg border border-brand-accent/50 text-center">
        <p className="text-sm text-gray-300">
            <strong>Step 2:</strong> We've pre-filled your brand DNA. Review it and upload your creative.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Upload Content (Image/Video)
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md cursor-pointer hover:border-brand-accent transition-colors"
        >
          <div className="space-y-1 text-center">
            {preview ? (
              file?.type.startsWith('video/') ? (
                <video
                  src={preview}
                  controls
                  className="max-h-48 mx-auto rounded-md"
                />
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-md"
                />
              )
            ) : (
              <svg
                className="mx-auto h-12 w-12 text-gray-500"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <div className="flex text-sm text-gray-500">
              <p className="pl-1">
                {file ? file.name : 'Click to upload or drag and drop'}
              </p>
            </div>
            <p className="text-xs text-gray-600">PNG, JPG, GIF, MP4 up to 50MB</p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          onChange={handleFileChange}
          accept="image/*,video/*"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Brand Name (e.g., Wendy's)"
          value={brandInfo.name}
          onChange={handleInputChange}
          className="bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-brand-accent focus:border-brand-accent w-full"
        />
        <input
          type="text"
          name="personality"
          placeholder="Brand Personality (e.g., Sassy, Confident)"
          value={brandInfo.personality}
          onChange={handleInputChange}
          className="bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-brand-accent focus:border-brand-accent w-full"
        />
        <input
          type="text"
          name="colors"
          placeholder="Brand Colors (e.g., Red, White)"
          value={brandInfo.colors}
          onChange={handleInputChange}
          className="bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-brand-accent focus:border-brand-accent w-full"
        />
        <select
          name="platform"
          value={brandInfo.platform}
          onChange={handleInputChange}
          className="bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-brand-accent focus:border-brand-accent w-full"
        >
          <option>TikTok</option>
          <option>Instagram Reels</option>
          <option>YouTube Shorts</option>
          <option>X (Twitter)</option>
        </select>
      </div>

      <input
        type="text"
        name="competitors"
        placeholder="Main Competitors (e.g., McDonald's, Burger King)"
        value={brandInfo.competitors}
        onChange={handleInputChange}
        className="bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-brand-accent focus:border-brand-accent w-full"
      />

      <textarea
        name="contentDescription"
        placeholder="Briefly describe the content or paste a transcript..."
        value={contentDescription}
        onChange={handleInputChange}
        rows={3}
        className="bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-brand-accent focus:border-brand-accent w-full"
      />

      {error && <p className="text-sm text-brand-kill">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-brand-accent text-brand-dark font-bold py-3 px-4 rounded-md hover:bg-green-400 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Analyzing...' : 'Get Critique'}
      </button>
    </form>
  );
};

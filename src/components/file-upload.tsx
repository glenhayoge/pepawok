// components/file-upload.tsx
'use client';
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, X, Loader2 } from 'lucide-react';
import { uploadFile } from '@/lib/services/file-upload';
import type { Attachment } from '@/types/pfd';

type FileUploadProps = {
  submissionId: string;
  type: 'FEASIBILITY_STUDY' | 'COST_BENEFIT_ANALYSIS';
  label: string;
  description?: string;
  onUpload: (file: Attachment) => void;
  onRemove: () => void;
  file?: Attachment;
  required?: boolean;
};

export default function FileUpload({
  submissionId,
  type,
  label,
  description,
  onUpload,
  onRemove,
  file,
  required = false
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) return;

      // Validate file
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(selectedFile.type)) {
        setError('Only PDF and DOCX files are allowed');
        return;
      }

      if (selectedFile.size > maxSize) {
        setError('File size exceeds 10MB limit');
        return;
      }

      try {
        setIsUploading(true);
        setError(null);
        
        const uploadedFile = await uploadFile(selectedFile, submissionId, type);
        onUpload({ ...uploadedFile, type });
      } catch (err) {
        console.error('Upload failed:', err);
        setError('File upload failed. Please try again.');
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload, submissionId, type]
  );

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
      </div>

      {file ? (
        <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium truncate max-w-xs">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            disabled={isUploading}
            className="flex-1"
          />
          {isUploading && <Loader2 className="h-5 w-5 animate-spin" />}
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import * as XLSX from 'xlsx';
import { toast } from 'react-hot-toast';

interface BOMUploaderProps {
  onBOMUpload: (data: any[]) => void;
}

const BOMUploader: React.FC<BOMUploaderProps> = ({ onBOMUpload }) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      onBOMUpload(jsonData);
      toast.success('BOM file uploaded successfully');
    } catch (error) {
      toast.error('Error processing BOM file');
      console.error('Error processing file:', error);
    }
  }, [onBOMUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`cyber-card cursor-pointer ${
        isDragActive ? 'border-cyan-400' : 'border-cyan-900'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center p-8">
        <Upload className="h-12 w-12 text-cyan-400 mb-4" />
        <p className="text-center">
          {isDragActive
            ? 'Drop the BOM file here...'
            : 'Drag & drop a BOM file here, or click to select'}
        </p>
        <p className="text-sm text-cyan-300/70 mt-2">
          Supported formats: XLSX, XLS, CSV
        </p>
      </div>
    </div>
  );
};

export default BOMUploader;
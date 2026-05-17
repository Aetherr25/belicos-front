import { ImagePlus } from 'lucide-react';
import React, { useState, useRef } from 'react';

interface ImageDropZoneProps {
  onImageChange: (file: File | null) => void;
  selectedFile: File | null;
}

export const ImageDropZone = ({ onImageChange, selectedFile }: ImageDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generamos una URL temporal para la previsualización
  const previewUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;

  // Evita que el navegador abra la imagen en otra pestaña
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Captura el archivo cuando lo sueltas
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  // Para cuando el usuario prefiere hacer clic tradicional en lugar de arrastrar
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Validación opcional: Solo aceptar imágenes y menores a 10MB
    const isValidType = file.type.startsWith('image/');
    const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB

    if (isValidType && isValidSize) {
      onImageChange(file);
    } else {
      alert("Por favor sube una imagen válida (PNG, JPG) menor a 10MB");
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que el clic abra el selector de archivos
    onImageChange(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-3 mb-2">
      <label className="text-2xl w-fit">
        Subir imágen del producto:
      </label>
      
      <div 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden
          ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}
        `}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={onFileInputChange} 
          accept="image/png, image/jpeg, image/gif" 
          className="hidden" 
        />

        {previewUrl ? (
          <div className="flex flex-col items-center">
            <img src={previewUrl} alt="Preview" className="max-h-40 rounded-lg object-contain mb-3" />
            <p className="text-sm text-gray-700 font-medium">{selectedFile?.name}</p>
            <button 
              type="button" 
              onClick={handleRemoveImage}
              className="mt-2 text-red-500 hover:text-red-700 font-medium text-sm z-10"
            >
              Quitar imagen
            </button>
          </div>
        ) : (
          <>
            <ImagePlus 
              className={`w-12 h-12 mb-3 ${isDragging ? 'text-green-500' : 'text-gray-400'}`}
            />
            <p className="text-gray-600 font-medium text-center">
              <span className="text-blue-500 hover:underline">Sube un archivo</span> o arrastra y suelta
            </p>
            <p className="text-gray-400 text-sm mt-1">PNG, JPG, JPEG, WEBP</p>
          </>
        )}
      </div>
    </div>
  );
};
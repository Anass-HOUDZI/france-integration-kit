
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Upload, X } from 'lucide-react';

interface PhotoCaptureProps {
  onCapture: (file: File, description: string) => Promise<void>;
  onCancel: () => void;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onCapture, onCancel }) => {
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleCapture = async () => {
    if (!selectedFile || !description.trim()) return;

    setIsUploading(true);
    try {
      await onCapture(selectedFile, description.trim());
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la photo:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Ajouter une photo</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="photo-upload">Sélectionner une photo</Label>
          <div className="mt-2">
            <input
              ref={fileInputRef}
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choisir une image
            </Button>
          </div>
        </div>

        {previewUrl && (
          <div className="space-y-3">
            <div className="relative">
              <img
                src={previewUrl}
                alt="Aperçu"
                className="w-full h-48 object-cover rounded border"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSelection}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white hover:bg-opacity-75"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div>
              <Label htmlFor="photo-description">Description de la photo</Label>
              <Input
                id="photo-description"
                placeholder="Ex: Rayure sur le mur gauche, tache sur le sol..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleCapture}
                disabled={!description.trim() || isUploading}
                className="flex-1"
              >
                <Camera className="w-4 h-4 mr-2" />
                {isUploading ? 'Ajout...' : 'Ajouter la photo'}
              </Button>
              <Button variant="outline" onClick={onCancel}>
                Annuler
              </Button>
            </div>
          </div>
        )}

        {!selectedFile && (
          <div className="text-center text-gray-500 py-8">
            <Camera className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Sélectionnez une image pour commencer</p>
            <p className="text-sm">
              La géolocalisation sera automatiquement ajoutée si disponible
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoCapture;

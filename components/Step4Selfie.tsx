import React, { useState, useEffect, useCallback } from 'react';
import { FormData } from '../types';

interface Step4Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const Step4Selfie: React.FC<Step4Props> = ({ formData, updateFormData, nextStep, prevStep }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (formData.selfie) {
            const objectUrl = URL.createObjectURL(formData.selfie);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview(null);
        }
    }, [formData.selfie]);

    const handleFileChange = (file: File | null) => {
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            updateFormData({ selfie: file });
        } else if (file) {
            alert('Por favor, envie um arquivo de imagem válido (JPG ou PNG).');
        }
    };

    const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileChange(e.target.files?.[0] || null);
    };

    const removeImage = () => {
        updateFormData({ selfie: null });
    };

    const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFileChange(e.dataTransfer.files?.[0] || null);
    };

    const isStepComplete = !!formData.selfie;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-text-light dark:text-text-dark">
                    Envie uma Selfie
                </h1>
                <p className="text-base font-normal text-text-muted-light dark:text-text-muted-dark">
                    Para fins de identificação, por favor, envie uma foto sua.
                </p>
            </div>

            <form className="flex flex-col gap-10" onSubmit={(e) => { e.preventDefault(); if (isStepComplete) nextStep(); }}>
                <div className="flex flex-col items-center justify-center w-full gap-4">
                    {preview ? (
                        <div className="relative group w-full max-w-sm">
                            <img src={preview} alt="Pré-visualização da selfie" className="w-full h-auto rounded-lg shadow-md" />
                            <button 
                                type="button" 
                                onClick={removeImage} 
                                className="absolute top-2 right-2 flex items-center justify-center size-8 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
                                aria-label="Remover imagem"
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>
                    ) : (
                        <label 
                            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary/10' : 'border-border-light dark:border-border-dark hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}
                            onDragEnter={onDragEnter}
                            onDragLeave={onDragLeave}
                            onDragOver={onDragOver}
                            onDrop={onDrop}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                <span className="material-symbols-outlined text-5xl text-text-muted-light dark:text-text-muted-dark">cloud_upload</span>
                                <p className="mb-2 text-sm text-text-muted-light dark:text-text-muted-dark"><span className="font-semibold">Clique para enviar</span> ou arraste e solte</p>
                                <p className="text-xs text-text-muted-light dark:text-text-muted-dark">PNG ou JPG</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onChange={onFileSelect} accept="image/png, image/jpeg" />
                        </label>
                    )}
                </div>

                <div className="flex justify-between items-center pt-4">
                    <button type="button" onClick={prevStep} className="flex items-center justify-center gap-2 h-12 px-8 text-base font-bold text-text-muted-light dark:text-text-muted-dark bg-transparent rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600">
                        <span className="material-symbols-outlined">arrow_back</span>
                        Voltar
                    </button>
                    <button type="submit" disabled={!isStepComplete} className="flex items-center justify-center gap-2 h-12 px-8 text-base font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Próximo
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step4Selfie;
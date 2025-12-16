import React, { useState } from 'react';
import { FormData } from './types';
import Step1Personal from './components/Step1Personal';
import Step2Address from './components/Step2Address';
import Step3School from './components/Step3School';
import Step4Selfie from './components/Step4Selfie';
import Step5Survey from './components/Step5Survey';
import Step6Success from './components/Step6Success';
import ProgressBar from './components/ProgressBar';

// Header atualizado com a Logo Colorida
const Header: React.FC = () => (
  <header className="flex items-center justify-center sm:justify-start border-b border-solid border-border-light dark:border-border-dark px-4 sm:px-6 py-3 bg-white dark:bg-gray-800">
    <img 
        src="https://fnfybutkvsozbvvacomo.supabase.co/storage/v1/object/public/imagens%20para%20plataforma/logocolorida.png" 
        alt="Cursinho Comunitário Bonsucesso" 
        className="h-10 sm:h-12 w-auto object-contain" // Ajuste de altura responsivo
    />
  </header>
);

const App: React.FC = () => {
    const initialFormData: FormData = {
        firstName: '', lastName: '', email: '', birthDate: '', phone: '',
        rg: '', rgIssuingBody: '', cpf: '',
        cep: '', street: '', number: '', complement: '', neighborhood: '', city: '', uf: '',
        educationLevel: '', schoolName: '', schoolType: '', graduationYear: '',
        selfie: null,
        motivation: '', vestibulares: [], howDidYouHear: '', termsAccepted: false,
    };

    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const totalSteps = 5;

    const nextStep = () => setStep(prev => (prev < totalSteps + 1 ? prev + 1 : prev));
    const prevStep = () => setStep(prev => (prev > 1 ? prev - 1 : prev));

    const updateFormData = (data: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const resetForm = () => {
        setStep(0);
        setFormData(initialFormData);
    };
    
    const renderFormStep = () => {
        switch (step) {
            case 1: return <Step1Personal formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
            case 2: return <Step2Address formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 3: return <Step3School formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 4: return <Step4Selfie formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 5: return <Step5Survey formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 6: return <Step6Success formData={formData} resetForm={resetForm} />;
            default: return null;
        }
    };

    // --- LAYOUT DA CAPA (ETAPA 0) ---
    if (step === 0) {
        return (
            <div className="relative min-h-screen w-full overflow-hidden bg-gray-900">
                {/* 1. Imagens de Fundo (Mobile e Desktop) */}
                <div className="absolute inset-0 z-0">
                    
                    {/* IMAGEM MOBILE */}
                    <img 
                        src="https://fnfybutkvsozbvvacomo.supabase.co/storage/v1/object/public/imagens%20para%20plataforma/mobile.png" 
                        alt="Background Cursinho Mobile" 
                        className="w-full h-full object-cover opacity-100 md:hidden" 
                    />

                    {/* IMAGEM DESKTOP - ALTERADA PARA OBJECT-FILL */}
                    <img 
                        src="https://fnfybutkvsozbvvacomo.supabase.co/storage/v1/object/public/imagens%20para%20plataforma/logoinscricao.png" 
                        alt="Background Cursinho Desktop" 
                        className="w-full h-full object-fill opacity-100 hidden md:block" 
                    />
                    
                </div>

                {/* 2. Conteúdo da Capa */}
                <div className="relative z-10 min-h-screen w-full flex items-center justify-end px-6 md:pr-12 lg:pr-16">
                    
                    <div className="w-full max-w-md text-white animate-fade-in-up">
                        
                        {/* CARD ÚNICO */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 md:p-8 text-left">
                            
                            {/* Texto de Boas Vindas */}
                            <p className="text-base md:text-lg text-white mb-6 leading-relaxed font-medium text-justify">
                                Já estão abertas as inscrições para o Cursinho Comunitário Bonsucesso para o 1º semestre de 2026.
                            </p>

                            {/* Título do Checklist */}
                            <h3 className="font-bold text-lg mb-4 text-white border-b border-white/10 pb-2">
                                Antes de começar, tenha em mãos:
                            </h3>
                            
                            {/* Lista */}
                            <ul className="space-y-3 text-sm mb-8">
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-white shrink-0">person</span>
                                    <span className="text-white">Dados pessoais (Nome, E-mail, Nascimento).</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-white shrink-0">badge</span>
                                    <span className="text-white">Documentos (RG e CPF).</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-white shrink-0">home</span>
                                    <span className="text-white">Endereço completo com CEP.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-white shrink-0">school</span>
                                    <span className="text-white">Dados da escola de Ensino Médio.</span>
                                </li>
                            </ul>

                            {/* Botão */}
                            <div className="flex justify-start">
                                <button
                                    onClick={nextStep}
                                    className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-primary rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-gray-900 w-full sm:w-auto"
                                >
                                    Iniciar Inscrição
                                    <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    // --- LAYOUT DO FORMULÁRIO (ETAPAS 1 a 6) ---
    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark transition-colors">
            <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5 md:py-10">
                <div className="flex flex-col w-full max-w-4xl flex-1 rounded-xl shadow-2xl bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark overflow-hidden animate-fade-in">
                    <Header />
                    <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        {step > 0 && step <= totalSteps && (
                            <div className="mb-8">
                                <ProgressBar currentStep={step} totalSteps={totalSteps} />
                            </div>
                        )}
                        {renderFormStep()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;
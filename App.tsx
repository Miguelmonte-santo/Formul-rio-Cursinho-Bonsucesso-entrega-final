import React, { useState } from 'react';
import { FormData } from './types';
import Step1Personal from './components/Step1Personal';
import Step2Address from './components/Step2Address';
import Step3School from './components/Step3School';
import Step4Selfie from './components/Step4Selfie';
import Step5Survey from './components/Step5Survey';
import Step6Success from './components/Step6Success';
import ProgressBar from './components/ProgressBar';

// Header do formulário (aparece da etapa 1 em diante)
const Header: React.FC = () => (
  <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark px-4 sm:px-6 py-4">
    <div className="flex items-center gap-4 text-text-light dark:text-text-dark">
      <div className="size-8 text-primary">
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 8.47L4.42 7.07 12 4.49 19.58 7.07 12 11.47z"/>
            <path d="M21.94 17.51L17 19.99v3.02l5-2.5v-2.98zM15 19.99l-5 2.51v-3.02l5-2.5v3.01z"/>
        </svg>
      </div>
      <h2 className="text-lg font-bold tracking-tight">Cursinho Comunitário Bonsucesso</h2>
    </div>
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
                {/* 1. Imagem de Fundo (Capa) */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://fnfybutkvsozbvvacomo.supabase.co/storage/v1/object/public/imagens%20para%20plataforma/estampainscricao.png" 
                        alt="Background Cursinho" 
                        // AJUSTE: Opacidade 100% para a imagem ficar clara e nítida
                        className="w-full h-full object-cover opacity-100" 
                    />
                    {/* Overlay: AJUSTE: Gradiente muito mais suave (termina em 60% opacidade) para clarear a tela */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/0 via-gray-900/30 to-gray-900/60"></div>
                </div>

                {/* 2. Conteúdo da Capa */}
                {/* AJUSTE: 'lg:pr-12' move o conteúdo mais para a direita (perto da borda) */}
                <div className="relative z-10 min-h-screen w-full flex items-center justify-end px-6 md:pr-12 lg:pr-16">
                    
                    {/* AJUSTE: 'max-w-md' torna o bloco de conteúdo mais estreito (menor) */}
                    <div className="w-full max-w-md text-white animate-fade-in-up">
                        
                        {/* AJUSTE: 'text-justify' para alinhar o texto perfeitamente */}
                        <p className="text-base md:text-lg text-gray-100 mb-8 leading-relaxed font-medium drop-shadow-md text-justify">
                            Já estão abertas as inscrições para o Cursinho Comunitário Bonsucesso para o 1º semestre de 2026.
                        </p>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-8 text-left shadow-xl">
                            <h3 className="font-bold text-lg mb-4 text-blue-200 border-b border-white/10 pb-2">
                                Antes de começar, tenha em mãos:
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-blue-400 shrink-0">person</span>
                                    <span>Dados pessoais (Nome, E-mail, Nascimento).</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-blue-400 shrink-0">badge</span>
                                    <span>Documentos (RG e CPF).</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-blue-400 shrink-0">home</span>
                                    <span>Endereço completo com CEP.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-blue-400 shrink-0">school</span>
                                    <span>Dados da escola de Ensino Médio.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Botão alinhado à esquerda dentro do bloco (que já está à direita) */}
                        <div className="flex justify-start">
                            <button
                                onClick={nextStep}
                                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-primary rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-gray-900 shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-1 w-full sm:w-auto"
                            >
                                Iniciar Inscrição
                                <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
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
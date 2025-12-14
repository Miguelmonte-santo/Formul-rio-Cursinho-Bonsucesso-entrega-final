import React, { useState } from 'react';
import { FormData } from './types';
import Step0Welcome from './components/Step0Welcome';
import Step1Personal from './components/Step1Personal';
import Step2Address from './components/Step2Address';
import Step3School from './components/Step3School';
import Step4Selfie from './components/Step4Selfie';
import Step5Survey from './components/Step5Survey';
import Step6Success from './components/Step6Success';
import ProgressBar from './components/ProgressBar';

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
        // Step 1
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        phone: '',
        rg: '',
        rgIssuingBody: '',
        cpf: '',
        // Step 2
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        uf: '',
        // Step 3
        educationLevel: '',
        schoolName: '',
        schoolType: '',
        graduationYear: '',
        // Step 4
        selfie: null,
        // Step 5
        motivation: '',
        vestibulares: [],
        howDidYouHear: '',
        termsAccepted: false,
    };

    const [step, setStep] = useState(0); // Start at step 0 (Welcome Screen)
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
    
    const renderStep = () => {
        switch (step) {
            case 0:
                return <Step0Welcome nextStep={nextStep} />;
            case 1:
                return <Step1Personal formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
            case 2:
                return <Step2Address formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 3:
                return <Step3School formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 4:
                return <Step4Selfie formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 5:
                return <Step5Survey formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 6:
                return <Step6Success formData={formData} resetForm={resetForm} />;
            default:
                return <Step0Welcome nextStep={nextStep} />;
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col">
            <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5 md:py-10">
                <div className="flex flex-col w-full max-w-4xl flex-1 rounded-xl shadow-lg bg-white dark:bg-gray-800/50 border border-border-light dark:border-border-dark overflow-hidden">
                    <Header />
                    <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        {step > 0 && step <= totalSteps && (
                            <div className="mb-8">
                                <ProgressBar currentStep={step} totalSteps={totalSteps} />
                            </div>
                        )}
                        {renderStep()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;
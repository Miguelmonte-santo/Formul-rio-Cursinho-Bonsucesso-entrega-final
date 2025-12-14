import React from 'react';
import { FormData } from '../types';

interface Step6Props {
    formData: FormData;
    resetForm: () => void;
}

const Step6Success: React.FC<Step6Props> = ({ formData, resetForm }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center gap-6 py-10">
            <div className="flex items-center justify-center size-20 bg-success/20 rounded-full">
                <span className="material-symbols-outlined text-success text-5xl">
                    check_circle
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-text-light dark:text-text-dark">
                    Inscrição Realizada com Sucesso!
                </h1>
                <p className="text-base font-normal text-text-muted-light dark:text-text-muted-dark max-w-md mx-auto">
                    Obrigado, {formData.firstName}! Sua inscrição foi enviada. Entraremos em contato pelo e-mail <span className="font-semibold text-primary">{formData.email}</span> com os próximos passos.
                </p>
            </div>
            <button
                onClick={resetForm}
                className="flex items-center justify-center gap-2 h-12 px-8 mt-4 text-base font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
                Nova Inscrição
            </button>
        </div>
    );
};

export default Step6Success;
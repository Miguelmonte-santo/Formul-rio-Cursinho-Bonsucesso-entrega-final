import React, { useEffect, useState } from 'react';
import { FormData } from '../types';

interface Step6Props {
    formData: FormData;
    resetForm: () => void;
}

const Step6Success: React.FC<Step6Props> = ({ formData, resetForm }) => {
    const [secondsLeft, setSecondsLeft] = useState(15);

    useEffect(() => {
        // Redireciona após 15 segundos
        const timer = setTimeout(() => {
            resetForm();
        }, 15000);

        // Atualiza a contagem regressiva visual
        const countdown = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        // Limpa os timers se o componente for desmontado antes
        return () => {
            clearTimeout(timer);
            clearInterval(countdown);
        };
    }, [resetForm]);

    return (
        <div className="flex flex-col items-center justify-center text-center gap-6 py-10 animate-fade-in">
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
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-2">
                    Redirecionando para o início em {secondsLeft} segundos...
                </p>
            </div>
            <button
                onClick={resetForm}
                className="flex items-center justify-center gap-2 h-12 px-8 mt-4 text-base font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
                Nova Inscrição Agora
            </button>
        </div>
    );
};

export default Step6Success;

import React from 'react';

interface Step0Props {
    nextStep: () => void;
}

const Step0Welcome: React.FC<Step0Props> = ({ nextStep }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center gap-8 py-10">
            <div className="flex items-center justify-center size-20 bg-primary/20 rounded-full">
                <span className="material-symbols-outlined text-primary text-5xl">
                    school
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-text-light dark:text-text-dark">
                    Bem-vindo(a) ao Cursinho Comunitário Bonsucesso!
                </h1>
                <p className="text-base font-normal text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">
                    Estamos felizes em ter você aqui. Preencha o formulário de inscrição para garantir sua vaga e dar o próximo passo em sua jornada educacional.
                </p>
            </div>

            <div className="w-full max-w-lg bg-background-light dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark text-left">
                <h2 className="text-lg font-bold mb-4 text-text-light dark:text-text-dark">Antes de começar, tenha em mãos:</h2>
                <ul className="space-y-3 text-text-muted-light dark:text-text-muted-dark">
                    <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">person</span>
                        <span>Seus dados pessoais (Nome, E-mail, Data de Nascimento, Telefone).</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">badge</span>
                        <span>Documentos de identificação (RG e CPF).</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">home</span>
                        <span>Seu endereço completo com CEP.</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">school</span>
                        <span>Informações sobre sua escola de Ensino Médio.</span>
                    </li>
                </ul>
            </div>

            <button
                onClick={nextStep}
                className="flex items-center justify-center gap-2 h-12 px-8 mt-4 text-base font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
                Iniciar Inscrição
                <span className="material-symbols-outlined">arrow_forward</span>
            </button>
        </div>
    );
};

export default Step0Welcome;

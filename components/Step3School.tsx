import React from 'react';
import { FormData } from '../types';

interface Step3Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const Step3School: React.FC<Step3Props> = ({ formData, updateFormData, nextStep, prevStep }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'graduationYear') {
            updateFormData({ [name]: value.slice(0, 4) });
        } else {
            updateFormData({ [name]: value });
        }
    };

    const isStepComplete = (() => {
        if (!formData.educationLevel) return false;
        
        if (formData.educationLevel === 'concluido') {
            return !!(formData.schoolName && formData.schoolType && formData.graduationYear && formData.graduationYear.length === 4);
        }
        
        if (formData.educationLevel === 'fundamental' || formData.educationLevel === 'medio') {
            return !!(formData.schoolName && formData.schoolType);
        }
        
        return false;
    })();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-text-light dark:text-text-dark">
                    Dados Escolares
                </h1>
                <p className="text-base font-normal text-text-muted-light dark:text-text-muted-dark">
                    Nos conte um pouco sobre sua formação.
                </p>
            </div>

            <form className="flex flex-col gap-10" onSubmit={(e) => { e.preventDefault(); if (isStepComplete) nextStep(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <label className="flex flex-col md:col-span-2">
                        <p className="text-sm font-medium pb-2">Qual seu nível de escolaridade?</p>
                        <select name="educationLevel" value={formData.educationLevel} onChange={handleChange} className="form-select appearance-none flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" required>
                            <option value="" disabled>Selecione uma opção</option>
                            <option value="fundamental">Cursando Ensino Fundamental</option>
                            <option value="medio">Cursando Ensino Médio</option>
                            <option value="concluido">Ensino Médio Concluído</option>
                        </select>
                    </label>

                    {formData.educationLevel && (
                        <>
                            <label className="flex flex-col md:col-span-2">
                                <p className="text-sm font-medium pb-2">
                                    {formData.educationLevel === 'concluido' ? 'Nome da Última Escola que Frequentou' : 'Nome da Instituição de Ensino Atual'}
                                </p>
                                <input name="schoolName" value={formData.schoolName} onChange={handleChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Digite o nome da escola" required autoComplete="off" />
                            </label>
                            
                            <label className="flex flex-col flex-1">
                                <p className="text-sm font-medium pb-2">Tipo de Escola</p>
                                <select name="schoolType" value={formData.schoolType} onChange={handleChange} className="form-select appearance-none flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" required>
                                    <option value="" disabled>Selecione o tipo</option>
                                    <option value="publica">Pública</option>
                                    <option value="privada">Privada</option>
                                </select>
                            </label>

                            {formData.educationLevel === 'concluido' && (
                                <label className="flex flex-col flex-1">
                                    <p className="text-sm font-medium pb-2">Ano de Conclusão do Ensino Médio</p>
                                    <input name="graduationYear" value={formData.graduationYear} onChange={handleChange} type="number" min="1950" max={new Date().getFullYear()} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Ex: 2023" required />
                                </label>
                            )}
                        </>
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

export default Step3School;
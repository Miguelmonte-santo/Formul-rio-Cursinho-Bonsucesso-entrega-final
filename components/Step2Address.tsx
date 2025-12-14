
import React, { useState, useCallback } from 'react';
import { FormData } from '../types';

interface Step2Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const Step2Address: React.FC<Step2Props> = ({ formData, updateFormData, nextStep, prevStep }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCepChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const cep = e.target.value.replace(/\D/g, '');
        updateFormData({ cep: e.target.value });

        if (cep.length === 8) {
            setIsLoading(true);
            setError('');
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                if (!response.ok) throw new Error('CEP não encontrado');
                const data = await response.json();
                if (data.erro) throw new Error('CEP inválido');

                updateFormData({
                    street: data.logradouro,
                    neighborhood: data.bairro,
                    city: data.localidade,
                    uf: data.uf,
                });
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Erro ao buscar CEP";
                setError(errorMessage);
                updateFormData({ street: '', neighborhood: '', city: '', uf: '' });
            } finally {
                setIsLoading(false);
            }
        }
    }, [updateFormData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        updateFormData({ [e.target.name]: e.target.value });
    };
    
    const isStepComplete = 
        formData.cep &&
        formData.street &&
        formData.number &&
        formData.neighborhood &&
        formData.city &&
        formData.uf;

    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-text-light dark:text-text-dark">
                    Onde você mora?
                </h1>
                <p className="text-base font-normal text-text-muted-light dark:text-text-muted-dark">
                    Precisamos do seu endereço para continuar o cadastro.
                </p>
            </div>

            <form className="flex flex-col gap-10" onSubmit={(e) => { e.preventDefault(); if (isStepComplete) nextStep(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <label className="flex flex-col flex-1 relative">
                        <p className="text-sm font-medium pb-2">CEP</p>
                        <input name="cep" value={formData.cep} onChange={handleCepChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" placeholder="00000-000" required />
                        {isLoading && <span className="absolute right-3 top-[42px] material-symbols-outlined animate-spin">progress_activity</span>}
                        {error && <p className="text-error text-xs mt-1">{error}</p>}
                    </label>
                    <label className="flex flex-col flex-1">
                        <p className="text-sm font-medium pb-2">Rua</p>
                        <input name="street" value={formData.street} onChange={handleChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Digite o nome da sua rua" required />
                    </label>
                    <label className="flex flex-col flex-1">
                        <p className="text-sm font-medium pb-2">Número</p>
                        <input name="number" value={formData.number} onChange={handleChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Ex: 123" required />
                    </label>
                    <label className="flex flex-col flex-1">
                        <p className="text-sm font-medium pb-2">Complemento (Opcional)</p>
                        <input name="complement" value={formData.complement} onChange={handleChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Ex: Apto 4B" />
                    </label>
                    <label className="flex flex-col flex-1">
                        <p className="text-sm font-medium pb-2">Bairro</p>
                        <input name="neighborhood" value={formData.neighborhood} onChange={handleChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Digite o seu bairro" required />
                    </label>
                    <label className="flex flex-col flex-1">
                        <p className="text-sm font-medium pb-2">Município</p>
                        <input name="city" value={formData.city} onChange={handleChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Digite a sua cidade" required />
                    </label>
                    <label className="flex flex-col md:col-span-2">
                        <p className="text-sm font-medium pb-2">UF</p>
                        <select name="uf" value={formData.uf} onChange={handleChange} className="form-select appearance-none flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" required>
                            <option value="" disabled>Selecione um estado</option>
                            {ufs.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                        </select>
                    </label>
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

export default Step2Address;

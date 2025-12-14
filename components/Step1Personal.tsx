import React, { useState } from 'react';
import { FormData } from '../types';

interface Step1Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    nextStep: () => void;
}

const issuingBodies = [
    { value: "SSP", label: "Secretaria de Segurança Pública" },
    { value: "PM", label: "Polícia Militar" },
    { value: "PC", label: "Polícia Civil" },
    { value: "CNIG", label: "Conselho Nacional de Imigração" },
    { value: "CNT", label: "Carteira Nacional de Habilitação" },
    { value: "DIC", label: "Diretoria de Identificação Civil" },
    { value: "DT", label: "Diretoria de Trânsito" },
    { value: "DPF", label: "Departamento de Polícia Federal" },
    { value: "POF", label: "Polícia Federal" },
    { value: "POM", label: "Polícia Marítima" },
    { value: "II", label: "Instituto de Identificação" },
    { value: "IFP", label: "Instituto de Identificação Félix Pacheco" },
    { value: "IPF", label: "Instituto Pereira Faustino" },
    { value: "IML", label: "Instituto Médico-Legal" },
    { value: "MTE", label: "Ministério do Trabalho e Emprego" },
    { value: "MAE", label: "Ministério da Aeronáutica" },
    { value: "MEX", label: "Ministério do Exército" },
    { value: "MMA", label: "Ministério da Marinha" },
    { value: "OAB", label: "Ordem dos Advogados do Brasil" },
    { value: "CREA", label: "Conselho Regional de Engenharia e Agronomia" },
    { value: "CRM", label: "Conselho Regional de Medicina" },
    { value: "COREN", label: "Conselho Regional de Enfermagem" },
    { value: "CRO", label: "Conselho Regional de Odontologia" },
    { value: "CRA", label: "Conselho Regional de Administração" },
    { value: "CRB", label: "Conselho Regional de Biblioteconomia" },
    { value: "CRC", label: "Conselho Regional de Contabilidade" },
    { value: "CRE", label: "Conselho Regional de Estatística" },
    { value: "CRF", label: "Conselho Regional de Farmácia" },
    { value: "CRESS", label: "Conselho Regional de Serviço Social" },
    { value: "CRMV", label: "Conselho Regional de Medicina Veterinária" },
    { value: "CRP", label: "Conselho Regional de Psicologia" },
    { value: "CRPRE", label: "Conselho Regional de Profissionais de Relações Públicas" },
    { value: "CRQ", label: "Conselho Regional de Química" },
    { value: "DETRAN", label: "Departamento Estadual de Trânsito" },
    { value: "FGTS", label: "Fundo de Garantia do Tempo de Serviço" },
    { value: "SJS", label: "Secretaria da Justiça e Segurança" },
    { value: "SJTS", label: "Secretaria da Justiça do Trabalho e Segurança" }
];

const Step1Personal: React.FC<Step1Props> = ({ formData, updateFormData, nextStep }) => {
    const [cpfError, setCpfError] = useState('');
    const [rgError, setRgError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const maxDate = new Date().toISOString().split('T')[0];

    const validateCPF = (cpf: string): boolean => {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false;
        }
        let add = 0;
        for (let i = 0; i < 9; i++) {
            add += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }
        if (rev !== parseInt(cpf.charAt(9))) {
            return false;
        }
        add = 0;
        for (let i = 0; i < 10; i++) {
            add += parseInt(cpf.charAt(i)) * (11 - i);
        }
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }
        if (rev !== parseInt(cpf.charAt(10))) {
            return false;
        }
        return true;
    };

    const validateRG = (rg: string): boolean => {
        const digitsOnly = rg.replace(/\D/g, '');
        // Simple validation: check if it has at least 5 digits, as RG formats vary by state.
        return digitsOnly.length >= 5;
    };
    
    const validatePhone = (phone: string): boolean => {
        const digitsOnly = phone.replace(/\D/g, '');
        return digitsOnly.length === 10 || digitsOnly.length === 11;
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'cpf') {
            setCpfError('');
            // Remove non-digit characters and limit to 11 digits
            const numericValue = value.replace(/\D/g, '').slice(0, 11);
            
            // Apply CPF mask
            const maskedValue = numericValue
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
                .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');

            updateFormData({ cpf: maskedValue });
            return;
        }

        if (name === 'rg') {
            setRgError('');
            // Remove non-digit characters and limit to 11 digits
            const numericValue = value.replace(/\D/g, '').slice(0, 11);
            updateFormData({ rg: numericValue });
            return;
        }

        if (name === 'phone') {
            setPhoneError('');
            const numericValue = value.replace(/\D/g, '').slice(0, 11);
            let maskedValue = numericValue;
            
            if (numericValue.length <= 2) {
                maskedValue = `(${numericValue}`;
            } else if (numericValue.length <= 6) {
                maskedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
            } else if (numericValue.length <= 10) {
                maskedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}-${numericValue.slice(6)}`;
            } else { // 11 digits
                maskedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7)}`;
            }
            if (numericValue.length === 0) maskedValue = '';
            
            updateFormData({ phone: maskedValue });
            return;
        }
        updateFormData({ [name]: value });
    };

    const handleCpfBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const cpf = e.target.value;
        if (cpf && !validateCPF(cpf)) {
            setCpfError('CPF inválido. Por favor, verifique.');
        } else {
            setCpfError('');
        }
    };

    const handleRgBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const rg = e.target.value;
        if (rg && !validateRG(rg)) {
            setRgError('RG inválido. Verifique o número digitado.');
        } else {
            setRgError('');
        }
    };

    const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const phone = e.target.value;
        if (phone && !validatePhone(phone)) {
            setPhoneError('Telefone inválido. Use (XX) XXXXX-XXXX.');
        } else {
            setPhoneError('');
        }
    };

    const isStepComplete =
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.birthDate &&
        formData.phone &&
        formData.rg &&
        formData.rgIssuingBody &&
        formData.cpf &&
        !cpfError &&
        !rgError &&
        !phoneError;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-text-light dark:text-text-dark">
                    Dados Pessoais
                </h1>
                <p className="text-base font-normal text-text-muted-light dark:text-text-muted-dark">
                    Preencha seus dados para iniciar a inscrição.
                </p>
            </div>

            <form className="flex flex-col gap-10" onSubmit={(e) => { e.preventDefault(); if (isStepComplete) nextStep(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <label className="flex flex-col flex-1">
                        <p className="text-sm font-medium pb-2">Nome</p>
                        <input name="firstName" value={formData.firstName} onChange={handleChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Digite seu nome" required />
                    </label>
                    <label className="flex flex-col flex-1">
                        <p className="text-sm font-medium pb-2">Sobrenome</p>
                        <input name="lastName" value={formData.lastName} onChange={handleChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Digite seu sobrenome" required />
                    </label>
                    <label className="flex flex-col md:col-span-2">
                        <p className="text-sm font-medium pb-2">E-mail</p>
                        <input name="email" value={formData.email} onChange={handleChange} type="email" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" placeholder="seuemail@exemplo.com" required />
                    </label>
                    <label className="flex flex-col flex-1">
                        <p className="text-sm font-medium pb-2">Data de Nascimento</p>
                        <input name="birthDate" value={formData.birthDate} onChange={handleChange} type="date" min="1900-01-01" max={maxDate} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" required />
                    </label>
                    <label className="flex flex-col flex-1">
                        <p className="text-sm font-medium pb-2">Telefone</p>
                        <input name="phone" value={formData.phone} onChange={handleChange} onBlur={handlePhoneBlur} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" placeholder="(XX) XXXXX-XXXX" required />
                        {phoneError && <p className="text-error text-xs mt-1">{phoneError}</p>}
                    </label>
                     <label className="flex flex-col flex-1">
                        <p className="text-sm font-medium pb-2">RG</p>
                        <input name="rg" value={formData.rg} onChange={handleChange} onBlur={handleRgBlur} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Apenas números" required />
                        {rgError && <p className="text-error text-xs mt-1">{rgError}</p>}
                    </label>
                    <label className="flex flex-col flex-1">
                        <p className="text-sm font-medium pb-2">Órgão Emissor</p>
                        <select name="rgIssuingBody" value={formData.rgIssuingBody} onChange={handleChange} className="form-select appearance-none flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" required>
                            <option value="" disabled>Selecione</option>
                            {issuingBodies.map(body => (
                                <option key={body.value} value={body.value}>{body.label} ({body.value})</option>
                            ))}
                        </select>
                    </label>
                    <label className="flex flex-col md:col-span-2">
                        <p className="text-sm font-medium pb-2">CPF</p>
                        <input name="cpf" value={formData.cpf} onChange={handleChange} onBlur={handleCpfBlur} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-12 p-3 text-base font-normal border-border-light dark:border-border-dark focus:border-primary focus:ring-1 focus:ring-primary" placeholder="XXX.XXX.XXX-XX" required />
                        {cpfError && <p className="text-error text-xs mt-1">{cpfError}</p>}
                    </label>
                </div>

                <div className="flex justify-end items-center pt-4">
                    <button type="submit" disabled={!isStepComplete} className="flex items-center justify-center gap-2 h-12 px-8 text-base font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Próximo
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step1Personal;
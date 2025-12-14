
import React, { useState } from 'react';
import { FormData } from '../types';
import { supabase } from '../supabaseClient';

interface Step5Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const TermsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Termos de Uso e Política de Privacidade</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Fechar modal">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </header>
                <main className="p-6 overflow-y-auto text-text-muted-light dark:text-text-muted-dark space-y-4 text-sm">
                    <h3 className="font-bold text-base text-text-light dark:text-text-dark">TERMO DE CIÊNCIA E CONSENTIMENTO – LEI 13.709/2018 (LGPD – Lei Geral de Proteção de Dados Pessoais)</h3>
                    <p>Prezado (a) titular de dados pessoais,</p>
                    <p>O presente Termo de Ciência e Consentimento (“Termo”) tem como finalidade o registro da manifestação inequívoca, por meio da qual o titular dos direitos pessoais (“Titular”) concorda com o tratamento de seus dados pelo Cursinho Comunitário Bonsucesso.</p>
                    <p>Assim, aceitando o presente Termo, o Titular consente e concorda que o Cursinho Comunitário Bonsucesso adote as melhores decisões para o tratamento das informações pessoais para uso exclusivo pelo Cursinho Comunitário Bonsucesso.</p>
                    
                    <h4 className="font-bold text-text-light dark:text-text-dark pt-2">1. DA FINALIDADE:</h4>
                    <p>O Titular autoriza e concorda com o tratamento dos dados pela Cursinho Comunitário Bonsucesso com a finalidade específica de armazenamento dos dados pessoais para realização de cadastro para de alunos(as), bem como para contato de suporte e acompanhamento sociopedagógico.</p>
                    
                    <h4 className="font-bold text-text-light dark:text-text-dark pt-2">2. DA ADEQUAÇÃO:</h4>
                    <p>O Titular tem ciência de que o tratamento dos dados pessoais atende a finalidade exposta pelo Cursinho Comunitário Bonsucesso.</p>
                    
                    <h4 className="font-bold text-text-light dark:text-text-dark pt-2">3. DA NECESSIDADE:</h4>
                    <p>O Titular autoriza o tratamento dos dados pessoais com o objetivo de permitir acesso às ferramentas pedagógicas que o Cursinho Comunitário Bonsucesso fornece aos alunos(as).</p>
                    
                    <h4 className="font-bold text-text-light dark:text-text-dark pt-2">4. DO CADASTRO E DO LIVRE ACESSO:</h4>
                    <p>O cadastro realizado pelo Titular é de uso estritamente pessoal e não deverá ser utilizado por terceiros, sendo que a guarda, sigilo e a utilização do nome e senha do usuário são de exclusiva responsabilidade do usuário, que se compromete a fazer um uso diligente, bem como a não os colocar à disposição de terceiros.</p>
                    <p>O Titular tem ciência de que poderá consultar e atualizar os dados pessoais cadastrados a qualquer tempo.</p>
                    
                    <h4 className="font-bold text-text-light dark:text-text-dark pt-2">5. DA QUALIDADE E VERACIDADE DOS DADOS:</h4>
                    <p>O Titular concorda em fornecer informações verdadeiras, exatas, e completas, se responsabilizando pelo cadastro das informações que serão utilizadas pelo Cursinho Comunitário Bonsucesso, bem como por informar qualquer modificação destas informações, mantendo as informações sempre atualizadas.</p>
                    
                    <h4 className="font-bold text-text-light dark:text-text-dark pt-2">6. DA TRANSPARÊNCIA:</h4>
                    <p>O Titular tem ciência de que o não fornecimento dos dados requeridos pelo Cursinho Comunitário Bonsucesso, impossibilita todas as interações do contato dentro dos portais das ferramentas fornecidas aos alunos(as).</p>
                    
                    <h4 className="font-bold text-text-light dark:text-text-dark pt-2">7. DA SEGURANÇA:</h4>
                    <p>O Cursinho Comunitário Bonsucesso realizará o tratamento dos dados pessoais do Titular para a finalidade acima exposta, ficando este responsável em adotar as medidas técnicas e administrativas aptas para proteger os dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou difusão.</p>
                    
                    <h4 className="font-bold text-text-light dark:text-text-dark pt-2">8. DA PREVENÇÃO:</h4>
                    <p>O Cursinho Comunitário Bonsucesso adotará as medidas preventivas para a manutenção da proteção e segurança dos dados pessoais do Titular</p>
                    
                    <h4 className="font-bold text-text-light dark:text-text-dark pt-2">9. DA NÃO DISCRIMINAÇÃO:</h4>
                    <p>Os dados pessoais disponibilizados pelo Titular ao Cursinho Comunitário Bonsucesso, em hipótese alguma, serão utilizados para fins discriminatórios, ilícitos ou abusivos.</p>
                    
                    <h4 className="font-bold text-text-light dark:text-text-dark pt-2">10. DA RESPONSABILIZAÇÃO E PRESTAÇÃO DE CONTAS:</h4>
                    <p>O Titular poderá requisitar informações relacionadas ao nível de governança do Cursinho Comunitário Bonsucesso a fim de compreender as ações adotadas para o atendimento da lei geral de proteção de dados pessoais (lei 13.709/2018).</p>
                    
                    <p className="font-bold pt-4">Coordenação Cursinho Comunitário Bonsucesso.</p>
                </main>
                <footer className="p-4 border-t border-border-light dark:border-border-dark flex justify-end">
                    <button onClick={onClose} className="flex items-center justify-center gap-2 h-10 px-6 text-base font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50">
                        Fechar
                    </button>
                </footer>
            </div>
        </div>
    );
};

const motivationOptions = ["Me preparar para o vestibular", "Melhorar meus estudos", "Curiosidade", "Outros"];
const vestibularesOptions = ["ENEM", "FUVEST", "ETEC", "FATEC", "UNIVESP", "ITA", "MEI", "CPAEN", "ESA", "EEAR", "SENAI", "Outros"];
const howDidYouHearOptions = ["Youtube", "Instagram", "Facebook", "Site", "Amigo", "Outros"];

const Step5Survey: React.FC<Step5Props> = ({ formData, updateFormData, nextStep, prevStep }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const currentVestibulares = formData.vestibulares || [];

        if (checked) {
            updateFormData({ vestibulares: [...currentVestibulares, value] });
        } else {
            updateFormData({ vestibulares: currentVestibulares.filter(item => item !== value) });
        }
    };
    
    const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData({ termsAccepted: e.target.checked });
    };

    const isStepComplete = formData.motivation && formData.howDidYouHear && formData.vestibulares.length > 0 && formData.termsAccepted;

    const handleCadastro = async () => {
        if (!isStepComplete) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // 1. Selfie Upload
            if (!formData.selfie) {
                throw new Error("Selfie não encontrada. Por favor, volte e envie uma foto.");
            }

            const fileExt = formData.selfie.name.split('.').pop();
            const fileName = `selfie_${formData.email}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('selfies')
                .upload(filePath, formData.selfie);

            if (uploadError) {
                throw new Error(`Erro ao enviar a selfie: ${uploadError.message}`);
            }

            const { data: urlData } = supabase.storage
                .from('selfies')
                .getPublicUrl(filePath);

            if (!urlData || !urlData.publicUrl) {
                throw new Error("Não foi possível obter a URL da selfie após o upload.");
            }
            const selfieUrl = urlData.publicUrl;

            // 2. Prepare data for insertion (with cleaning)
            const submissionData = {
                nome: formData.firstName,
                sobrenome: formData.lastName,
                email: formData.email,
                data_nascimento: formData.birthDate,
                telefone: formData.phone.replace(/\D/g, ''),
                rg: formData.rg.replace(/\D/g, ''),
                orgao_emissor: formData.rgIssuingBody,
                cpf: formData.cpf.replace(/\D/g, ''),
                cep: formData.cep.replace(/\D/g, ''),
                rua: formData.street,
                numero: formData.number,
                complemento: formData.complement,
                bairro: formData.neighborhood,
                municipio: formData.city,
                uf: formData.uf,
                nivel_escolaridade: formData.educationLevel,
                nome_ultima_escola: formData.schoolName,
                tipo_escola: formData.schoolType,
                ano_conclusao_ensino_medio: formData.graduationYear || null,
                selfie_url: selfieUrl,
                motivo_cursinho: formData.motivation,
                vestibulares_pretendidos: formData.vestibulares,
                como_ficou_sabendo: formData.howDidYouHear,
                concordou_termos: formData.termsAccepted,
            };

            // 3. Insert data, relying on DB for uniqueness check
            const { error: insertError } = await supabase
                .from('inscricoes')
                .insert([submissionData]);

            if (insertError) {
                 if (insertError.code === '23505') { // Postgres unique_violation code
                     if (insertError.message.toLowerCase().includes('cpf')) {
                        throw new Error("O CPF informado já está cadastrado.");
                     }
                     if (insertError.message.toLowerCase().includes('rg')) {
                        throw new Error("O RG informado já está cadastrado.");
                     }
                    throw new Error("Erro de duplicidade: CPF ou RG já cadastrado."); // Fallback
                }
                throw new Error(`Erro ao salvar inscrição: ${insertError.message}`);
            }

            // 4. Success
            nextStep();

        } catch (error) {
            console.error("Erro no processo de cadastro:", error);
            const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido.";
            setSubmitError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-text-light dark:text-text-dark">
                        Só mais algumas perguntas
                    </h1>
                    <p className="text-base font-normal text-text-muted-light dark:text-text-muted-dark">
                        Suas respostas nos ajudarão a melhorar o cursinho.
                    </p>
                </div>

                <form className="flex flex-col gap-10" onSubmit={(e) => { e.preventDefault(); handleCadastro(); }}>
                    <div className="flex flex-col gap-8">
                        {/* Motivation Question */}
                        <div className="flex flex-col gap-3">
                            <p className="text-base font-medium text-text-light dark:text-text-dark">Por qual motivo você quer fazer o Cursinho Comunitário Bonsucesso?</p>
                            <div className="flex flex-col gap-2">
                                {motivationOptions.map(option => (
                                    <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                                        <input type="radio" name="motivation" value={option} checked={formData.motivation === option} onChange={handleRadioChange} className="form-radio text-primary focus:ring-primary/50" required />
                                        <span className="text-base">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Vestibulares Question */}
                        <div className="flex flex-col gap-3">
                            <p className="text-base font-medium text-text-light dark:text-text-dark">Quais vestibulares você pretende fazer? (Marque quantos quiser)</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                {vestibularesOptions.map(option => (
                                    <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                                        <input type="checkbox" name="vestibulares" value={option} checked={formData.vestibulares.includes(option)} onChange={handleCheckboxChange} className="form-checkbox rounded text-primary focus:ring-primary/50" />
                                        <span className="text-base">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* How did you hear Question */}
                        <div className="flex flex-col gap-3">
                            <p className="text-base font-medium text-text-light dark:text-text-dark">Como você ficou sabendo do Cursinho Comunitário Bonsucesso?</p>
                            <div className="flex flex-col gap-2">
                                {howDidYouHearOptions.map(option => (
                                    <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                                        <input type="radio" name="howDidYouHear" value={option} checked={formData.howDidYouHear === option} onChange={handleRadioChange} className="form-radio text-primary focus:ring-primary/50" required />
                                        <span className="text-base">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 border-t border-border-light dark:border-border-dark pt-6">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                checked={formData.termsAccepted || false}
                                onChange={handleTermsChange}
                                className="form-checkbox rounded text-primary focus:ring-primary/50 mt-1 size-5"
                                required
                            />
                            <span className="text-base text-text-muted-light dark:text-text-muted-dark">
                                Eu li e concordo com os{' '}
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(true)}
                                    className="text-primary font-semibold underline hover:no-underline focus:outline-none"
                                >
                                    Termos de Uso e Política de Privacidade
                                </button>
                                .
                            </span>
                        </label>
                    </div>

                    {submitError && (
                        <div className="text-center text-error text-sm p-4 bg-error/10 rounded-lg -mb-4">
                            <p className="font-bold">Ocorreu um erro ao enviar sua inscrição:</p>
                            <p>{submitError}</p>
                        </div>
                    )}

                    <div className="flex justify-between items-center pt-4">
                        <button type="button" onClick={prevStep} className="flex items-center justify-center gap-2 h-12 px-8 text-base font-bold text-text-muted-light dark:text-text-muted-dark bg-transparent rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600">
                            <span className="material-symbols-outlined">arrow_back</span>
                            Voltar
                        </button>
                        <button type="submit" disabled={!isStepComplete || isSubmitting} className="flex items-center justify-center gap-2 h-12 px-8 min-w-[220px] text-base font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:bg-gray-400 disabled:cursor-not-allowed">
                             {isSubmitting ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    Finalizar Cadastro
                                    <span className="material-symbols-outlined">check_circle</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            {isModalOpen && <TermsModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default Step5Survey;

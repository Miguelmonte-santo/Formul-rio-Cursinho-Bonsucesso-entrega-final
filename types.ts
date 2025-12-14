export interface FormData {
    // Step 1: Personal Data
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    phone: string;
    rg: string;
    rgIssuingBody: string;
    cpf: string;

    // Step 2: Address
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    uf: string;

    // Step 3: School Information
    educationLevel: 'fundamental' | 'medio' | 'concluido' | '';
    schoolName: string;
    schoolType: 'publica' | 'privada' | '';
    graduationYear: string;

    // Step 4: Selfie
    selfie: File | null;

    // Step 5: Survey
    motivation: string;
    vestibulares: string[];
    howDidYouHear: string;
    termsAccepted: boolean;
}
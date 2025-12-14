import React from 'react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    const percentage = (currentStep / totalSteps) * 100;
    
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium leading-normal text-text-light dark:text-text-dark">
                    Etapa {currentStep} de {totalSteps}
                </p>
            </div>
            <div className="h-2 w-full rounded-full bg-border-light dark:bg-border-dark">
                <div 
                    className="h-2 rounded-full bg-primary transition-all duration-500 ease-out" 
                    style={{ width: `${percentage}%` }}>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
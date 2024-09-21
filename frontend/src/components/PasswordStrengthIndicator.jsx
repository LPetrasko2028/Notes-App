import React from 'react'
import { Check, X } from 'lucide-react'

const getPasswordCriteria = (password) => {
    const criteria = [
        {label: 'At least 8 characters', valid: password.length >= 8},
        {label: 'At least one uppercase letter', valid: /[A-Z]/.test(password)},
        {label: 'At least one lowercase letter', valid: /[a-z]/.test(password)},
        {label: 'At least one number', valid: /[0-9]/.test(password)},
        {label: 'At least one special character', valid: /[!@#$%^&*]/.test(password)},
    ];
    return criteria;
}
const PasswordCriteria = ({criteria}) => {
    return (
        <div className='mt-2 space-y-1'>
            {criteria.map((criterion, index) => (
                <div key={index} className={`text-sm ${criterion.valid ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                    {criterion.valid ? <Check className='size-4 mr-2'/> : <X className='size-4 mr-2'/>}
                    {criterion.label}
                </div>
            ))}
        </div>
    );
}

const PasswordStrengthIndicator = ({password}) => {
    
    const [criteria, setCriteria] = React.useState([]);
    React.useEffect(() => {
        setCriteria(getPasswordCriteria(password));
    }, [password]);

    const getStrength = (criteria) => { 
        // Get strength function exploded because I prioritized having only 1 location for the criteria. 
        // It adds +1 for each criterion that is valid, upper and lower case are combined as 1 criterion.
        let strength = 0;
        criteria.map((criterion, index) => {
            if(criterion.valid) {
                if(index === 1 || index === 2) { strength += 0.5; }
                else {strength += 1;}
            }
        });
        return Math.floor(strength);
    }
    // Get strength text and color functions
    const strength = getStrength(criteria);

    const getStrengthText = (strength) => {
        if(strength === 0) return 'Very Weak';
        if(strength === 1) return 'Weak';
        if(strength === 2) return 'Fair';
        if(strength === 3) return 'Good';
        if(strength === 4) return 'Strong';
        else return 'error';
    }
    const getStrengthColor = (strength) => {
        if(strength === 0) return 'bg-red-500';
        if(strength === 1) return 'bg-red-400';
        if(strength === 2) return 'bg-yellow-400';
        if(strength === 3) return 'bg-green-400';
        if(strength === 4) return 'bg-green-500';
        else return 'bg-gray-500';
    }

  return (
    <div className='mt-2'>
        <div className='flex justify-between items-center mb-1'>
            <span className='text-xs text-gray-400'>Password Strength:</span>
            <span className='text-xs text-gray-400'>{getStrengthText(strength)}</span>
        </div>
        <div className='flex space-x-1'>
            {[1,2,3,4].map((_, index) => (
                <div
                key={index}
                className={`h-1 w-1/4 rounded-full transition-colors duration-300
                    ${index < strength ? getStrengthColor(strength) : 'bg-gray-500'}
                `}
                />
            ))}
        </div>
        <PasswordCriteria criteria={criteria} />
    </div>
  )
}

export default PasswordStrengthIndicator
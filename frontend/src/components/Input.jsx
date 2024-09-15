import React from 'react';

const Input = ({ icon: Icon, type, onChange, ...props }) => {
    const handleChange = (e) => {
        if (type === 'email') {
            e.target.value = e.target.value.toLowerCase();
        }
        onChange(e);
    };

    return (
        <div className='relative mb-6'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <Icon className='size 5 text-black' />
            </div>
            <input
                {...props}
                type={type}
                onChange={handleChange}
                className='w-full pl-10 pr-3 py-2 bg-gray-200 bg-opacity-50 rounded-lg border border-gray-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 text-black placeholder-black transition duration-200'
                required
            />
        </div>
    );
};

export default Input;
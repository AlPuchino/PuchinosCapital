'use client';
import React, { useState } from 'react';
import { Select, Space } from 'antd';

export interface FiltersProps {
    onSelectChain: (value: string) => void;
}

const Filters = ({ onSelectChain }: FiltersProps) => {
    const handleChange = (value: string) => {
        onSelectChain(value);
        console.log(`selected ${value}`);
    };

    return (

        <Space wrap>
            <Select
                defaultValue="Everything"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                    { value: 'everything', label: 'Everything' },
                    { value: 'solana', label: 'Solana' },
                    { value: 'ethereum', label: 'Ethereum' },
                ]}
            />
        </Space>

    );
};

export default Filters;

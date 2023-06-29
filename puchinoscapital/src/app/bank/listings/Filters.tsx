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
      // Aquí puedes filtrar los listings según la cadena seleccionada
      // Puedes utilizar el estado "selectedChain" para realizar la filtración
    };

  return (
    <Space wrap>
      <Select
        defaultValue="everything"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: 'everything', label: 'everything' },
          { value: 'solana', label: 'Solana' },
          { value: 'ethereum', label: 'Ethereum' },
        ]}
      />
    </Space>
  );
};

export default Filters;

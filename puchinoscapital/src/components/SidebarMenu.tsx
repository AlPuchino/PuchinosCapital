"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import '../styles/sidemenu.css';
import type { MenuProps } from 'antd';
import { Button, Menu, Skeleton } from 'antd';

import { BiSolidBank } from 'react-icons/bi';
import { CgListTree } from 'react-icons/cg';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { BsFillSafeFill } from 'react-icons/bs';
import { AiTwotoneSetting } from 'react-icons/ai';
import { BsDiscord } from 'react-icons/bs';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Borrow', 'borrow', <FaMoneyCheckAlt />),
  getItem('Lend', 'lend', <BiSolidBank />),
  getItem('Listings', 'listings', <CgListTree />),
  getItem('Vaults', 'vaults', <BsFillSafeFill />),
];

const items2: MenuItem[] = [
  getItem('Settings', 'settings', <AiTwotoneSetting />),
  getItem('Community', 'discord', <BsDiscord />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (key: React.Key) => {
    router.push(`/bank/${key}`);
  };

  return (
    <div className='sidebar-menu'>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        className='menu'
        onClick={({ key }) => handleMenuClick(key)}
      />

      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items2}
        className='menu'
        onClick={({ key }) => handleMenuClick(key)}
      />
    </div>
  );
};

export default App;

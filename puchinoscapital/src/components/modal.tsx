'use client'
import React from 'react';
import { Modal } from 'antd';

export default function ModalComponent(props: {
    children: React.ReactNode
    visible: boolean
    setVisible: (visible: boolean) => void
    title: string
    }) {
    return (
        <Modal
        title={props.title}
        visible={props.visible}
        onOk={() => props.setVisible(false)}
        onCancel={() => props.setVisible(false)}
        >
        {props.children}
        </Modal>
    )
    }

import '@/style/lato-fonts.css';
import React from 'react';
import App from './App';

interface IProps {
    header: React.ReactNode;
}

export default function Frame(props: IProps) {
    const {
        header,
    } = props;

    return (
        <div>
            {header}
            <App />
        </div>
    );
}

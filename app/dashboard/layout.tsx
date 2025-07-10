import TemplateStandardPage from '@/components/templates/TemplateStandardPage';
import React from 'react';
import SetApplicationForm from './SetApplicationForm';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <TemplateStandardPage className="max-w-none">
            <SetApplicationForm />
            {children}
        </TemplateStandardPage>
    );
};

export default Layout;

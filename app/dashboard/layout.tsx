import TemplateStandardPage from '@/components/templates/TemplateStandardPage';
import React from 'react';
import AddApplicationForm from './AddApplicationForm';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <TemplateStandardPage className="max-w-none">
            <AddApplicationForm />
            {children}
        </TemplateStandardPage>
    );
};

export default Layout;

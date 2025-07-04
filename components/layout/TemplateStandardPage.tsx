import { cn } from '@/lib/utils';
import React from 'react';

const TemplateStandardPage = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <main className={cn('container mx-auto max-w-6xl my-5 flex flex-col gap-5 relative', className)}>{children}</main>;
};

export default TemplateStandardPage;

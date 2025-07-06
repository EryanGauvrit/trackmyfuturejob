import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const Loader = ({ className, inComponent, classNameIcon }: { className?: string; inComponent?: boolean; classNameIcon?: string }) => {
    return (
        <div className={`flex items-center justify-center ${inComponent ? 'h-full' : 'h-screen'} ${className}`}>
            <Loader2 className={cn(`animate-spin  ${inComponent ? 'h-10 w-10' : 'h-16 w-16'}`, classNameIcon)} />
        </div>
    );
};

export default Loader;

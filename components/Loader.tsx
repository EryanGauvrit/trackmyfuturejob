import { Loader2 } from 'lucide-react';

const Loader = ({ className, inComponent }: { className?: string; inComponent?: boolean }) => {
    return (
        <div className={`flex items-center justify-center ${inComponent ? 'h-full' : 'h-screen'} ${className}`}>
            <Loader2 className={`animate-spin  ${inComponent ? 'h-10 w-10' : 'h-16 w-16'}`} />
        </div>
    );
};

export default Loader;

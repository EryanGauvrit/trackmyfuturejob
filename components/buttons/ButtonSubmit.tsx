'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '../ui/button';

type ButtonSubmitProps = ButtonProps & {
    isLoading?: boolean;
};

const ButtonSubmit = ({ isLoading, ...props }: ButtonSubmitProps) => {
    const { pending } = useFormStatus();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (pending) {
            setLoading(true);
            return;
        }
        if (isLoading) {
            setLoading(true);
            return;
        }

        if (!pending && !isLoading && loading) {
            setTimeout(() => {
                setLoading(false);
            }, 500);
            return;
        }
    }, [pending, isLoading, loading]);

    if (loading) {
        return <Loader2 size={16} className={cn('animate-spin mx-auto', props.className)} />;
    }
    return <Button {...props} />;
};

export default ButtonSubmit;

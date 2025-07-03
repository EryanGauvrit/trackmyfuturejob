'use client';

import AlertDialogComp from '@/components/basics/AlertDialogComp';
import { signOut } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { StandardResponse } from '@/lib/wrapResponse';
import { ButtonSizes, ButtonVariants } from '@/types/variants';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { JSX, useState } from 'react';
import { toast } from 'sonner';
import Loader from './Loader';

type ConfirmDialogProps = {
    id: string;
    title: string;
    description: string;
    messageValidation: string;
    fnAction: (id: string, ...args: any) => Promise<StandardResponse<any>>;
    className?: string;
    openLabel?: string | JSX.Element;
    size?: ButtonSizes;
    isAccountDelete?: boolean;
    redirect?: string;
    variant?: ButtonVariants;
    args?: any;
    tooltip?: string;
    isSettingsMode?: boolean;
    fnAfterAction?: () => void;
};

const ConfirmDialog = ({
    id,
    fnAction,
    title,
    description,
    messageValidation,
    className,
    openLabel,
    size,
    isAccountDelete,
    redirect,
    variant,
    args,
    tooltip,
    fnAfterAction,
}: ConfirmDialogProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <AlertDialogComp
                title={title}
                description={description}
                confirmAction={async () => {
                    setIsLoading(true);
                    const res = await fnAction(id, args);
                    if (!res.error) {
                        toast.success(messageValidation);
                        if (isAccountDelete) {
                            signOut();
                            router.push('/auth/login');
                            return;
                        }
                        if (redirect) {
                            router.push(redirect);
                        }
                        if (!fnAfterAction) {
                            router.refresh();
                        } else {
                            fnAfterAction();
                        }
                    } else {
                        toast.error(res.error);
                    }
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 300);
                }}
                closeLabel="Annuler"
                confirmLabel="Confirmer"
                openLabel={openLabel ?? <Trash size={size === 'xs_icon' ? 18 : 20} />}
                size={size ?? 'icon'}
                variant={variant ?? 'destructive'}
                className={cn(className)}
                tooltip={tooltip}
            />
            {isLoading && <Loader />}
        </>
    );
};

export default ConfirmDialog;

'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ButtonSizes, ButtonVariants } from '@/types/variants';
import ButtonSubmit from '../buttons/ButtonSubmit';

type AlertDialogCompProps = {
    title: string;
    description: string;
    closeLabel: React.ReactNode;
    confirmLabel: React.ReactNode;
    openLabel: React.ReactNode;
    variant?: ButtonVariants;
    size?: ButtonSizes;
    confirmAction?: () => void;
    openHasChild?: boolean;
    isSubmit?: boolean;
    className?: string;
    tooltip?: string;
    disabled?: boolean;
};

const AlertDialogComp = ({
    title,
    description,
    closeLabel,
    confirmLabel,
    openLabel,
    variant,
    confirmAction,
    size,
    openHasChild = false,
    isSubmit,
    className,
    tooltip,
    disabled,
}: AlertDialogCompProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <ButtonSubmit
                    className={className}
                    variant={variant}
                    size={size}
                    asChild={openHasChild}
                    type={isSubmit ? 'submit' : 'button'}
                    tooltip={tooltip}
                    disabled={disabled}
                >
                    {openLabel}
                </ButtonSubmit>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{closeLabel}</AlertDialogCancel>
                    <AlertDialogAction
                        className={cn(
                            buttonVariants({
                                variant: variant,
                            }),
                        )}
                        onClick={confirmAction}
                    >
                        {confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDialogComp;

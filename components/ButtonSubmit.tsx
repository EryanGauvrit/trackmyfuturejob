import { Loader2 } from 'lucide-react';
import { Button, ButtonProps } from './ui/button';

type ButtonSubmitProps = ButtonProps & {
    isLoading?: boolean;
};

const ButtonSubmit = ({ isLoading, ...props }: ButtonSubmitProps) => {
    if (isLoading) {
        return <Loader2 size={16} className="animate-spin mx-auto" />;
    }
    return <Button {...props} />;
};

export default ButtonSubmit;

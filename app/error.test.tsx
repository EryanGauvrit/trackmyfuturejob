import { fireEvent, render, screen } from '@testing-library/react';
import ErrorComp from './error';

jest.mock('@/components/buttons/ButtonBack', () => (props: any) => (
    <button data-testid="button-back" {...props}>
        {props.message}
    </button>
));
jest.mock('@/components/ui/button', () => ({
    Button: (props: any) => <button {...props}>{props.children}</button>,
    buttonVariants: jest.fn(() => 'mocked-variant'),
}));
jest.mock('@/lib/utils', () => ({
    cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));
jest.mock('lucide-react', () => ({
    Home: () => <svg data-testid="icon-home" />,
    RotateCcw: () => <svg data-testid="icon-rotate" />,
}));

describe('Error component', () => {
    const error = new Error('Test error');
    const reset = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders error message and UI elements', () => {
        render(<ErrorComp error={error} reset={reset} />);
        expect(screen.getByText('Erreur inconnue')).toBeInTheDocument();
        expect(screen.getByText("Une erreur inconnue s'est produite. Veuillez réessayer plus tard.")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Réessayer/i })).toBeInTheDocument();
        expect(screen.getByTestId('button-back')).toHaveTextContent('Retour');
        expect(screen.getByRole('link', { name: /Accueil/i })).toHaveAttribute('href', '/');
        expect(screen.getByTestId('icon-home')).toBeInTheDocument();
        expect(screen.getByTestId('icon-rotate')).toBeInTheDocument();
    });

    it('calls reset when "Réessayer" button is clicked', () => {
        render(<ErrorComp error={error} reset={reset} />);
        fireEvent.click(screen.getByRole('button', { name: /Réessayer/i }));
        expect(reset).toHaveBeenCalled();
    });

    it('logs the error to console', () => {
        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(<ErrorComp error={error} reset={reset} />);
        expect(spy).toHaveBeenCalledWith(error);
        spy.mockRestore();
    });
});

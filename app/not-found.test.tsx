import { render, screen } from '@testing-library/react';
import NotFound from './not-found';

// Mock ButtonBack and next/link
jest.mock('@/components/layout/buttons/ButtonBack', () => (props: any) => (
    <button data-testid="button-back" {...props}>
        {props.message}
    </button>
));
jest.mock('next/link', () => {
    return ({ href, children, ...rest }: any) => (
        <a href={href} {...rest}>
            {children}
        </a>
    );
});

describe('NotFound', () => {
    it('renders the 404 heading', () => {
        render(<NotFound />);
        expect(screen.getByText('404')).toBeInTheDocument();
    });

    it('renders the main error message', () => {
        render(<NotFound />);
        expect(screen.getByText('Oups! La page que vous recherchez est introuvable.')).toBeInTheDocument();
    });

    it('renders the explanation paragraph', () => {
        render(<NotFound />);
        expect(screen.getByText("Vous avez peut-être mal tapé l'adresse ou la page a peut-être été déplacée.")).toBeInTheDocument();
    });

    it('renders the ButtonBack with correct props', () => {
        render(<NotFound />);
        const button = screen.getByTestId('button-back');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Retour');
        expect(button).toHaveClass('relative');
    });

    it('renders the link to home', () => {
        render(<NotFound />);
        const link = screen.getByRole('link', { name: "Retour à l'accueil" });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/');
    });
});

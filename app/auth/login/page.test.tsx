import { render, screen } from '@testing-library/react';
import Page from './page';

// Mock next/image
jest.mock('next/image', () => (props: any) => <img {...props} />);

// Mock next/link
jest.mock('next/link', () => {
    return ({ children, href }: any) => <a href={href}>{children}</a>;
});

// Mock signIn and toast
jest.mock('@/lib/auth-client', () => ({
    signIn: {
        social: jest.fn(),
        email: jest.fn(),
    },
}));
jest.mock('sonner', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));

describe('Login Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders login form', () => {
        render(<Page />);
        expect(screen.getByText(/Connexion/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
        expect(screen.getByText(/Se connecter/i)).toBeInTheDocument();
        expect(screen.getByText(/Créez-en un/i)).toBeInTheDocument();
    });

    it('renders social login buttons', () => {
        render(<Page />);
        expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /LinkedIn/i })).toBeInTheDocument();
    });
});

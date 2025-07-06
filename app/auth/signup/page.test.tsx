import { render, screen } from '@testing-library/react';
import Page from './page';

// Mock next/image
jest.mock('next/image', () => (props: any) => <img {...props} />);

// Mock next/link
jest.mock('next/link', () => {
    return ({ children, href }: any) => <a href={href}>{children}</a>;
});

// Mock assets
jest.mock('@/assets/google_icon.png', () => 'google_icon.png');

// Mock ButtonSubmit
jest.mock('@/components/buttons/ButtonSubmit', () => (props: any) => (
    <button onClick={props.onClick} type={props.type} disabled={props.isLoading}>
        {props.children}
    </button>
));

// Mock UI components
jest.mock('@/components/ui/card', () => ({
    Card: ({ children }: any) => <div>{children}</div>,
    CardContent: ({ children }: any) => <div>{children}</div>,
    CardDescription: ({ children }: any) => <div>{children}</div>,
    CardHeader: ({ children }: any) => <div>{children}</div>,
    CardTitle: ({ children }: any) => <div>{children}</div>,
}));
jest.mock('@/components/ui/input', () => ({
    Input: (props: any) => <input {...props} />,
}));
jest.mock('@/components/ui/label', () => ({
    Label: (props: any) => <label {...props} />,
}));

jest.mock('@/lib/auth-client', () => ({
    signIn: {
        social: jest.fn(),
    },
    signUp: {
        email: jest.fn(),
    },
}));

jest.mock('sonner', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));

describe('Signup Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the signup form', () => {
        render(<Page />);
        expect(screen.getByText(/Créer un compte/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nom d'utilisateur/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /S'inscrire/i })).toBeInTheDocument();
        expect(screen.getByText(/Déjà un compte/i)).toBeInTheDocument();
    });
});

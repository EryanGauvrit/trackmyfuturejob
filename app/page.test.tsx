import { getSession } from '@/lib/auth-server';
import { render, screen } from '@testing-library/react';
import Home from './page';

// Mock next/image
jest.mock('next/image', () => (props: any) => <img {...props} />);

// Mock next/link
jest.mock('next/link', () => {
    return ({ children, href }: any) => <a href={href}>{children}</a>;
});

// Mock logo import
jest.mock('@/assets/Logo.png', () => 'logo.png');

// Mock lucide-react Info icon
jest.mock('lucide-react', () => ({
    Info: () => <svg data-testid="info-icon" />,
}));

// Mock all UI components
jest.mock('@/components/layout/TemplateStandardPage', () => ({ children, ...props }: any) => (
    <div data-testid="template-standard-page" {...props}>
        {children}
    </div>
));
jest.mock('@/components/ui/alert', () => ({
    Alert: ({ children, ...props }: any) => (
        <div data-testid="alert" {...props}>
            {children}
        </div>
    ),
    AlertTitle: ({ children, ...props }: any) => (
        <div data-testid="alert-title" {...props}>
            {children}
        </div>
    ),
}));
jest.mock('@/components/ui/button', () => ({
    Button: ({ children, ...props }: any) => <button>{children}</button>,
}));
jest.mock('@/components/ui/card', () => ({
    Card: ({ children, ...props }: any) => (
        <div data-testid="card" {...props}>
            {children}
        </div>
    ),
    CardHeader: ({ children, ...props }: any) => (
        <div data-testid="card-header" {...props}>
            {children}
        </div>
    ),
    CardContent: ({ children, ...props }: any) => (
        <div data-testid="card-content" {...props}>
            {children}
        </div>
    ),
    CardFooter: ({ children, ...props }: any) => (
        <div data-testid="card-footer" {...props}>
            {children}
        </div>
    ),
    CardAction: ({ children, ...props }: any) => (
        <div data-testid="card-action" {...props}>
            {children}
        </div>
    ),
}));

// Mock getSession
jest.mock('@/lib/auth-server', () => ({
    getSession: jest.fn(),
}));

describe('Home page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing (no session)', async () => {
        (getSession as jest.Mock).mockResolvedValueOnce(null);
        // @ts-ignore
        render(await Home());
        expect(screen.getByTestId('template-standard-page')).toBeInTheDocument();
    });

    it('renders alert with user name when session exists', async () => {
        (getSession as jest.Mock).mockResolvedValueOnce({ user: { name: 'Alice' } });
        // @ts-ignore
        render(await Home());
        expect(screen.getByTestId('alert')).toBeInTheDocument();
        expect(screen.getByTestId('alert-title')).toHaveTextContent('Salut Alice');
        expect(screen.getByRole('link', { name: /Accéder au tableau de bord/i })).toBeInTheDocument();
    });

    it('renders welcome section with logo', async () => {
        (getSession as jest.Mock).mockResolvedValueOnce(null);
        // @ts-ignore
        render(await Home());
        expect(screen.getAllByTestId('card')[0]).toBeInTheDocument();
        expect(screen.getByAltText('Logo TrackMyFutureJob')).toBeInTheDocument();
        expect(screen.getByText(/Bienvenue sur/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Commencer maintenant/i })).toBeInTheDocument();
    });

    it('renders aside section', async () => {
        (getSession as jest.Mock).mockResolvedValueOnce(null);
        // @ts-ignore
        render(await Home());
        // The aside is a div with className="w-full bg-amber-500"
        expect(document.querySelector('.bg-amber-500')).toBeInTheDocument();
    });

    it('renders "Le concept" section', async () => {
        (getSession as jest.Mock).mockResolvedValueOnce(null);
        // @ts-ignore
        render(await Home());
        expect(screen.getByText('Le concept')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Inscrivez-vous dès maintenant/i })).toBeInTheDocument();
    });

    it('renders "Comment ça marche ?" section', async () => {
        (getSession as jest.Mock).mockResolvedValueOnce(null);
        // @ts-ignore
        render(await Home());
        expect(screen.getByText('Comment ça marche ?')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Connectez-vous pour commencer/i })).toBeInTheDocument();
    });

    it('renders "La simplicité avant tout" section', async () => {
        (getSession as jest.Mock).mockResolvedValueOnce(null);
        // @ts-ignore
        render(await Home());
        expect(screen.getByText('La simplicité avant tout')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Essayer dès à présent/i })).toBeInTheDocument();
    });
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './page';

// Mocks for next/image and next/link
jest.mock('next/image', () => ({ priority, ...props }: any) => <img {...props} />);
jest.mock('next/link', () => {
    return ({ children, href }: any) => <a href={href}>{children}</a>;
});

// Mock assets
jest.mock('@/assets/demo/desktop.webp', () => 'desktop.webp');
jest.mock('@/assets/demo/desktop_light.webp', () => 'desktop_light.webp');
jest.mock('@/assets/Logo.png', () => 'Logo.png');

// Mock components
jest.mock('@/components/templates/TemplateStandardPage', () => ({ children }: any) => <div data-testid="template">{children}</div>);
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
jest.mock('lucide-react', () => ({
    Info: () => <svg data-testid="info-icon" />,
}));
jest.mock('./AsideDemo', () => () => <aside data-testid="aside-demo" />);
// Mock SessionBanner
jest.mock('./_components/SessionBanner', () => () => <div data-testid="session-banner">Session Banner</div>);

// Mock getSession
const mockGetSession = jest.fn();
jest.mock('@/lib/auth-server', () => ({
    getSession: () => mockGetSession(),
}));

describe('Home page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the main sections and cards', async () => {
        mockGetSession.mockResolvedValue(null);

        render(<Home />);

        // Template wrapper
        expect(screen.getByTestId('template')).toBeInTheDocument();

        // Welcome card
        expect(screen.getAllByTestId('card')[0]).toHaveTextContent('Bienvenue sur');
        expect(screen.getAllByTestId('card')[0]).toHaveTextContent('TrackMyFutureJob');

        // AsideDemo
        expect(screen.getByTestId('aside-demo')).toBeInTheDocument();

        // Demo screenshots
        expect(screen.getAllByRole('img', { name: /Application sur desktop/ })).toHaveLength(2);

        // Concept, How it works, Simplicity cards
        expect(screen.getByText('Le concept')).toBeInTheDocument();
        expect(screen.getByText('Comment ça marche ?')).toBeInTheDocument();
        expect(screen.getByText('La simplicité avant tout')).toBeInTheDocument();

        // Buttons
        expect(screen.getByText(/Commencer maintenant/i)).toBeInTheDocument();
        expect(screen.getByText(/Inscrivez-vous dès maintenant/i)).toBeInTheDocument();
        expect(screen.getByText(/Connectez-vous pour commencer/i)).toBeInTheDocument();
        expect(screen.getByText(/Essayer dès à présent/i)).toBeInTheDocument();
    });

    it('renders logo image in the welcome card', () => {
        mockGetSession.mockResolvedValue(null);

        render(<Home />);
        const logoImg = screen.getByAltText('Logo TrackMyFutureJob');
        expect(logoImg).toBeInTheDocument();
        expect(logoImg).toHaveAttribute('src', expect.stringContaining('Logo.png'));
    });

    it('renders all links with correct hrefs', () => {
        mockGetSession.mockResolvedValue(null);

        render(<Home />);
        expect(screen.getAllByRole('link', { name: /Commencer maintenant/i })[0]).toHaveAttribute('href', '/auth/login');
        expect(screen.getAllByRole('link', { name: /Inscrivez-vous dès maintenant/i })[0]).toHaveAttribute('href', '/auth/signup');
        expect(screen.getAllByRole('link', { name: /Connectez-vous pour commencer/i })[0]).toHaveAttribute('href', '/auth/login');
        expect(screen.getAllByRole('link', { name: /Essayer dès à présent/i })[0]).toHaveAttribute('href', '/auth/signup');
    });
});

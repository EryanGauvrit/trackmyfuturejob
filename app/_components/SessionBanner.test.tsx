import { render, screen } from '@testing-library/react';
import SessionBanner from './SessionBanner';
const mockGetSession = require('@/lib/auth-server').getSession;

// Mock dependencies
jest.mock('@/lib/auth-server', () => ({
    getSession: jest.fn(),
}));
jest.mock('next/link', () => {
    return ({ children, href }: any) => <a href={href}>{children}</a>;
});

describe('SessionBanner', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders nothing if there is no session', async () => {
        mockGetSession.mockResolvedValueOnce(null);

        const SessionBannerComponent = await SessionBanner();

        expect(SessionBannerComponent).toBeNull();
    });

    it('renders the banner with user name and dashboard link if session exists', async () => {
        mockGetSession.mockResolvedValueOnce({
            user: { name: 'Alice' },
        });

        render(await SessionBanner());

        expect(screen.getByText(/Salut Alice/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Accéder au tableau de bord/i })).toHaveAttribute('href', '/dashboard');
    });
});

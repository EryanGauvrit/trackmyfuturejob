import { render, screen } from '@testing-library/react';
import Footer from './Footer';
const { useIsPWA } = require('@/hooks/useIsPwa');
const { useSession } = require('@/lib/auth-client');

// Mock dependencies
jest.mock('@/hooks/useIsPwa', () => ({
    useIsPWA: jest.fn(),
}));
jest.mock('@/lib/auth-client', () => ({
    useSession: jest.fn(),
}));
jest.mock('next/link', () => ({ children, ...props }: any) => <a>{children}</a>);
jest.mock('../NavLink', () => ({ children, ...props }: any) => <a>{children}</a>);

describe('Footer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders PWA footer with dashboard and profile links when user is logged in', () => {
        useIsPWA.mockReturnValue(true);
        useSession.mockReturnValue({ data: { user: { name: 'Test User' } } });

        render(<Footer />);

        expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
        expect(screen.getByText(/Tableau de bord/i)).toBeInTheDocument();
        expect(screen.getByText(/Mon profil/i)).toBeInTheDocument();
        expect(screen.queryByLabelText(/Se connecter/i)).not.toBeInTheDocument();
    });

    it('renders PWA footer with login link when user is not logged in', () => {
        useIsPWA.mockReturnValue(true);
        useSession.mockReturnValue({ data: null });

        render(<Footer />);

        expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
        expect(screen.getByText(/Se connecter/i)).toBeInTheDocument();
        expect(screen.queryByLabelText(/Tableau de bord/i)).not.toBeInTheDocument();
        expect(screen.queryByLabelText(/Mon profil/i)).not.toBeInTheDocument();
    });

    it('renders classic footer when not in PWA', () => {
        useIsPWA.mockReturnValue(false);
        useSession.mockReturnValue({ data: null });

        render(<Footer />);

        expect(screen.getByText(/TrackMyFutureJob. Tous droits réservés./i)).toBeInTheDocument();
        expect(screen.getByText(/Politique de confidentialité/i)).toBeInTheDocument();
        expect(screen.getByText(/Nous contacter/i)).toBeInTheDocument();
    });
});

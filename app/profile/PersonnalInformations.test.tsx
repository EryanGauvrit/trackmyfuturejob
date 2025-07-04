import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import PersonnalInformations from './PersonnalInformations';

// Mock dependencies
jest.mock('@/services/userService', () => ({
    updateUser: jest.fn(),
}));
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));
jest.mock('sonner', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));

const user = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
} as any;

const userSession = {
    id: '1',
    email: 'john@example.com',
} as any;

const setup = () => {
    (useRouter as jest.Mock).mockReturnValue({ refresh: jest.fn() });
    return render(<PersonnalInformations user={user} userSession={userSession} />);
};

describe('PersonnalInformations', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders user informations', () => {
        setup();
        expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
        expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
        expect(screen.getByText(/informations personnelles/i)).toBeInTheDocument();
    });
});

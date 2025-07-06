import Link from 'next/link';

const Footer = () => {
    return (
        <footer>
            <div className="container mx-auto  text-center py-4">
                <p className="text-gray-600 text-sm">
                    &copy; {new Date().getFullYear()} TrackMyFutureJob. Tous droits réservés.
                    <Link href={'/legal/policy'} className="text-secondary hover:underline ml-2">
                        Politique de confidentialité
                    </Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;

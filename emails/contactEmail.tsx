import { Tailwind } from '@react-email/components';

type Props = {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
};

const ContactEmail = ({ email, firstName, lastName, message, subject }: Props) => {
    return (
        <Tailwind>
            <div className="w-full bg-[#ffffff] py-20 font-sans">
                <div className="p-4 h-auto max-w-2xl m-auto">
                    <h1 className="text-2xl font-bold my-4 w-full text-center">TrackMyFutureJob</h1>
                    <h2 className="text-xl">SUJET: {subject}</h2>
                    <div>
                        <h2 className="text-lg m-0 my-1">Email: {email}</h2>
                        <h2 className="text-lg m-0 my-1">Nom: {lastName}</h2>
                        <h2 className="text-lg m-0 my-1">Prénom: {firstName}</h2>
                    </div>
                </div>
                <div className="bg-gray-600 h-[1px] w-full max-w-2xl my-4 mx-auto"></div>
                <div className="px-4 max-w-2xl m-auto">
                    <h2 className="text-lg font-bold my-4">Message: </h2>
                    <p className="text-left max-w-[600px] m-auto p-3 whitespace-pre-wrap">{message}</p>
                </div>
            </div>
        </Tailwind>
    );
};

export default ContactEmail;

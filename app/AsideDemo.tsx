import Image from 'next/image';
import addForm from '../assets/demo/add_application.webp';
import noteDisplay from '../assets/demo/note.webp';
import profilePageScreenshot from '../assets/demo/profile.webp';

const AsideDemo = () => {
    return (
        <aside className="flex h-[360px] gap-0.5 overflow-auto">
            <Image src={addForm} alt="Ajout d'une candidature" height={360} className="rounded-lg object-contain object-center" />
            <Image
                src={profilePageScreenshot}
                alt="Capture d'écran de l'application sur desktop"
                height={360}
                className="rounded-lg object-contain object-center"
                priority
            />
            <Image
                src={noteDisplay}
                alt="Affichage des notes sur une candidature"
                height={360}
                className="rounded-lg object-contain object-center"
                priority
            />
        </aside>
    );
};

export default AsideDemo;

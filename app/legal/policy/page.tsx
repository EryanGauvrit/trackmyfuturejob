const Page = () => {
    const APP_NAME = 'TrackMyFutureJob';
    return (
        <main className="container mx-auto p-4 flex-1">
            <h1>Politique de confidentialité</h1>
            <p>
                Cette politique de confidentialité décrit comment {APP_NAME} collecte, utilise et protège vos données personnelles
                conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>

            <h2>1. Responsable du traitement</h2>
            <p>
                Le responsable du traitement des données est {APP_NAME}. Pour toute question concernant vos données, vous pouvez nous
                contacter à l’adresse email de contact du site.
            </p>

            <h2>2. Données collectées</h2>
            <p>
                Nous collectons uniquement les données nécessaires à l’utilisation de notre service, telles que votre nom, adresse email, et
                informations relatives à votre recherche d’emploi.
            </p>

            <h2>3. Finalités de la collecte</h2>
            <ul>
                <li>Fournir et améliorer nos services</li>
                <li>Gérer votre compte utilisateur</li>
                <li>Vous contacter en cas de besoin</li>
            </ul>

            <h2>4. Conservation des données</h2>
            <p>
                Vos données sont conservées pendant la durée nécessaire à la réalisation des finalités pour lesquelles elles ont été
                collectées, sauf obligation légale contraire.
            </p>

            <h2>5. Partage des données</h2>
            <p>Vos données ne sont jamais vendues ni partagées avec des tiers sans votre consentement, sauf obligation légale.</p>

            <h2>6. Vos droits</h2>
            <p>
                Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, de suppression, de limitation et d’opposition au
                traitement de vos données. Vous pouvez exercer ces droits en nous contactant.
            </p>

            <h2>7. Sécurité</h2>
            <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles.</p>

            <h2>8. Modifications</h2>
            <p>Cette politique de confidentialité peut être modifiée à tout moment. Toute modification sera publiée sur cette page.</p>
        </main>
    );
};

export default Page;

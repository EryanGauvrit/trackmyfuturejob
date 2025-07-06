import ConfirmDialog from '@/components/ConfirmDialog';
import DialogForm from '@/components/DialogForm';
import DisplayValueUpdateTrigger from '@/components/DisplayValueUpdateTrigger';
import ActionTableHeader from '@/components/table/ActionTableHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { deleteApplication, updateApplication } from '@/services/applicationService';
import { IApplication } from '@/types/application';
import { ColumnDef } from '@tanstack/react-table';
import { ExternalLink, NotebookPen, Settings } from 'lucide-react';
import Link from 'next/link';

export const ApplicationColumns: ColumnDef<IApplication>[] = [
    {
        id: 'createdAt',
        accessorKey: 'createdAt',
        header: ({ column, table }) => (
            <ActionTableHeader column={column} label="Date" setColumnOrder={table.setColumnOrder} enableDragAndDrop />
        ),
        cell: ({ getValue }) => {
            const date = new Date(getValue() as string);
            return date.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        },
        meta: {
            valueType: 'date',
        },
        filterFn: 'filterByDate' as any,
        enableHiding: false,
    },
    {
        id: 'title',
        accessorKey: 'title',
        header: ({ column, table }) => (
            <ActionTableHeader column={column} label="Titre" setColumnOrder={table.setColumnOrder} enableDragAndDrop />
        ),
        cell: ({ getValue, row }) => (
            <DisplayValueUpdateTrigger>
                {(getValue() as string) || 'Aucun titre pour cette candidature.'}
                <DialogForm
                    actionFn={updateApplication}
                    title="Modifier le titre de la candidature"
                    description="Entrez le nouveau titre pour cette candidature."
                    textOpen={<Settings />}
                    textSubmit="Enregistrer"
                    variant="ghost"
                    size={'xs_icon'}
                    tooltip="Modifier le titre"
                    classNameTrigger="hidden group-hover:flex"
                    textSuccess="Le titre a été mis à jour."
                >
                    <Input
                        type="text"
                        name="title"
                        placeholder="Aucun titre pour cette candidature."
                        autoFocus
                        defaultValue={getValue() as string}
                    />
                    <Input type="hidden" name="id" value={row.id} />
                </DialogForm>
            </DisplayValueUpdateTrigger>
        ),
        meta: {
            valueType: 'string',
        },
        enableHiding: false,
    },
    {
        id: 'type',
        accessorKey: 'type',
        header: ({ column, table }) => (
            <ActionTableHeader column={column} label="Poste" setColumnOrder={table.setColumnOrder} enableDragAndDrop />
        ),
        cell: ({ getValue, row }) => (
            <DisplayValueUpdateTrigger>
                {(getValue() as string) || 'Aucun type de poste pour cette candidature.'}
                <DialogForm
                    actionFn={updateApplication}
                    title="Modifier le type de poste"
                    description="Entrez le nouveau type de poste pour cette candidature."
                    textOpen={<Settings />}
                    textSubmit="Enregistrer"
                    variant="ghost"
                    size={'xs_icon'}
                    tooltip="Modifier le type de poste"
                    classNameTrigger="hidden group-hover:flex"
                    textSuccess="Le type de poste a été mis à jour."
                >
                    <Input
                        type="text"
                        name="type"
                        placeholder="Aucun type de poste pour cette candidature."
                        autoFocus
                        defaultValue={getValue() as string}
                    />
                    <Input type="hidden" name="id" value={row.id} />
                </DialogForm>
            </DisplayValueUpdateTrigger>
        ),
        meta: {
            valueType: 'string',
        },
        enableHiding: false,
    },
    {
        id: 'company',
        accessorKey: 'company',
        header: ({ column, table }) => (
            <ActionTableHeader column={column} label="Entreprise" setColumnOrder={table.setColumnOrder} enableDragAndDrop />
        ),
        cell: ({ getValue, row }) => (
            <DisplayValueUpdateTrigger>
                {(getValue() as string) || 'Aucune entreprise pour cette candidature.'}
                <DialogForm
                    actionFn={updateApplication}
                    title="Modifier le nom de l'entreprise"
                    description="Entrez le nouveau nom de l'entreprise pour cette candidature."
                    textOpen={<Settings />}
                    textSubmit="Enregistrer"
                    variant="ghost"
                    size={'xs_icon'}
                    tooltip="Modifier le nom de l'entreprise"
                    classNameTrigger="hidden group-hover:flex"
                    textSuccess="Le nom de l'entreprise a été mis à jour."
                >
                    <Input
                        type="text"
                        name="company"
                        placeholder="Aucune entreprise pour cette candidature."
                        autoFocus
                        defaultValue={getValue() as string}
                    />
                    <Input type="hidden" name="id" value={row.id} />
                </DialogForm>
            </DisplayValueUpdateTrigger>
        ),
        meta: {
            valueType: 'string',
        },
        enableHiding: false,
    },
    {
        id: 'location',
        accessorKey: 'location',
        header: ({ column, table }) => (
            <ActionTableHeader column={column} label="Localisation" setColumnOrder={table.setColumnOrder} enableDragAndDrop />
        ),
        cell: ({ getValue, row }) => (
            <DisplayValueUpdateTrigger>
                {(getValue() as string) || 'Aucune localisation pour cette candidature.'}
                <DialogForm
                    actionFn={updateApplication}
                    title="Modifier la localisation"
                    description="Entrez la nouvelle localisation pour cette candidature."
                    textOpen={<Settings />}
                    textSubmit="Enregistrer"
                    variant="ghost"
                    size={'xs_icon'}
                    tooltip="Modifier la localisation"
                    classNameTrigger="hidden group-hover:flex"
                    textSuccess="La localisation a été mise à jour."
                >
                    <Input
                        type="text"
                        name="location"
                        placeholder="Aucune localisation pour cette candidature."
                        autoFocus
                        defaultValue={getValue() as string}
                    />
                    <Input type="hidden" name="id" value={row.id} />
                </DialogForm>
            </DisplayValueUpdateTrigger>
        ),
        meta: {
            valueType: 'string',
        },
        enableHiding: false,
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: ({ column, table }) => (
            <ActionTableHeader column={column} label="Statut" setColumnOrder={table.setColumnOrder} enableDragAndDrop />
        ),
        cell: ({ getValue, row }) => (
            <DisplayValueUpdateTrigger>
                {(getValue() as string) || 'Aucun statut pour cette candidature.'}
                <DialogForm
                    actionFn={updateApplication}
                    title="Modifier le statut de la candidature"
                    description="Sélectionnez le nouveau statut pour cette candidature."
                    textOpen={<Settings />}
                    textSubmit="Enregistrer"
                    variant="ghost"
                    size={'xs_icon'}
                    tooltip="Modifier le statut"
                    classNameTrigger="hidden group-hover:flex"
                    textSuccess="Le statut a été mis à jour."
                >
                    <Input
                        type="text"
                        name="status"
                        placeholder="Aucun statut pour cette candidature."
                        autoFocus
                        defaultValue={getValue() as string}
                    />
                    <Input type="hidden" name="id" value={row.id} />
                </DialogForm>
            </DisplayValueUpdateTrigger>
        ),
        meta: {
            valueType: 'string',
        },
        enableHiding: false,
    },
    {
        id: 'address',
        accessorKey: 'address',
        header: ({ column, table }) => (
            <ActionTableHeader column={column} label="Adresse" setColumnOrder={table.setColumnOrder} enableDragAndDrop />
        ),
        cell: ({ getValue, row }) => (
            <DisplayValueUpdateTrigger>
                <div className="text-sm text-wrap max-w-xs">{(getValue() as string) || 'Aucune adresse pour cette candidature.'}</div>
                <DialogForm
                    actionFn={updateApplication}
                    title="Modifier l'adresse de la candidature"
                    description="Entrez la nouvelle adresse pour cette candidature."
                    textOpen={<Settings />}
                    textSubmit="Enregistrer"
                    variant="ghost"
                    size={'xs_icon'}
                    tooltip="Modifier l'adresse"
                    classNameTrigger="hidden group-hover:flex"
                    textSuccess="L'adresse a été mise à jour."
                >
                    <Input
                        type="text"
                        name="address"
                        placeholder="Aucune adresse pour cette candidature."
                        autoFocus
                        defaultValue={getValue() as string}
                    />
                    <Input type="hidden" name="id" value={row.id} />
                </DialogForm>
            </DisplayValueUpdateTrigger>
        ),
        meta: {
            valueType: 'string',
        },
        enableHiding: false,
    },
    {
        id: 'actions',
        header: () => <div className="m-auto px-1">Actions</div>,
        cell: ({ row }) => {
            const application = row.original;
            return (
                <div className="flex items-center gap-2 w-fit mx-auto">
                    <DialogForm
                        actionFn={updateApplication}
                        title={`Notes pour ${application.title} chez ${application.company}`}
                        description={
                            <>
                                Créé le {new Date(application.createdAt).toLocaleDateString('fr-FR')} <br />
                                Mis à jour le {new Date(application.updatedAt).toLocaleDateString('fr-FR')}
                            </>
                        }
                        textOpen={<NotebookPen />}
                        size={'xs_icon'}
                        textSubmit="Enregistrer"
                        variant="ghost"
                        tooltip="Notes"
                        textSuccess="Les notes ont été mises à jour."
                    >
                        <Textarea
                            name="notes"
                            placeholder="Aucune note pour cette candidature."
                            autoFocus
                            defaultValue={application.notes || ''}
                        />
                        <Input type="hidden" name="id" value={application.id} />
                    </DialogForm>
                    {application.link && (
                        <Button asChild size={'xs_icon'} tooltip="Voir la fiche de poste" variant="ghost">
                            <Link href={application.link}>
                                <span className="sr-only">Voir la fiche de poste</span>
                                <ExternalLink />
                            </Link>
                        </Button>
                    )}
                    <ConfirmDialog
                        fnAction={deleteApplication}
                        title="Supprimer la candidature"
                        description="Êtes-vous sûr de vouloir supprimer cette candidature ?"
                        id={application.id}
                        messageValidation="La candidature a bien été supprimée."
                        size={'xs_icon'}
                    />
                </div>
            );
        },
        enableHiding: false,
    },
];

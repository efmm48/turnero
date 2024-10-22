export type Language = 'en' | 'es';

export const translations = {
  en: {
    title: 'Client Queue Management',
    addNewClient: 'Add New Client',
    enterClientName: 'Enter client name',
    addClient: 'Add Client',
    currentQueue: 'Current Queue',
    resetQueue: 'Reset Queue',
    currentClient: 'Current Client',
    noClients: 'No clients in the queue',
    remove: 'Remove',
    joinedAt: 'Joined at',
    announcement: 'Next client: {name}. Please proceed to the counter.',
    recall: 'Recall',
  },
  es: {
    title: 'Gestión de Cola de Clientes',
    addNewClient: 'Agregar Nuevo Cliente',
    enterClientName: 'Ingrese el nombre del cliente',
    addClient: 'Agregar Cliente',
    currentQueue: 'Cola Actual',
    resetQueue: 'Reiniciar Cola',
    currentClient: 'Cliente Actual',
    noClients: 'No hay clientes en la cola',
    remove: 'Eliminar',
    joinedAt: 'Se unió a las',
    announcement: 'Siguiente cliente: {name}. Por favor, acérquese al mostrador.',
    recall: 'Volver a llamar',
  },
};
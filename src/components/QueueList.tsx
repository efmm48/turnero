import React from 'react';
import { UserMinus } from 'lucide-react';
import { translations, Language } from '../translations';

interface Client {
  id: number;
  name: string;
  joinedAt: Date;
}

interface QueueListProps {
  clients: Client[];
  onRemoveClient: (id: number) => void;
  currentClientId: number | undefined;
  language: Language;
}

const QueueList: React.FC<QueueListProps> = ({ clients, onRemoveClient, currentClientId, language }) => {
  const t = translations[language];

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      {clients.length === 0 ? (
        <p className="text-gray-500 text-center">{t.noClients}</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {clients.map((client, index) => (
            <li key={client.id} className={`py-4 flex justify-between items-center ${client.id === currentClientId ? 'bg-green-100' : ''}`}>
              <div>
                <span className="font-medium">{clients.length - index}. {client.name}</span>
                <p className="text-sm text-gray-500">
                  {t.joinedAt}: {client.joinedAt.toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={() => onRemoveClient(client.id)}
                className="flex items-center px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
              >
                <UserMinus className="mr-1" size={18} />
                {t.remove}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueueList;
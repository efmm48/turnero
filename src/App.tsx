import React, { useState, useEffect } from 'react';
import { Clock, RotateCcw, Globe, Volume2 } from 'lucide-react';
import QueueList from './components/QueueList';
import AddClientForm from './components/AddClientForm';
import { translations, Language } from './translations';

interface Client {
  id: number;
  name: string;
  joinedAt: Date;
}

function App() {
  const [clients, setClients] = useState<Client[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addClient = (name: string) => {
    const newClient = {
      id: Date.now(),
      name,
      joinedAt: new Date(),
    };
    setClients(prevClients => [newClient, ...prevClients]);
    callClient(newClient);
  };

  const removeClient = (id: number) => {
    setClients(prevClients => prevClients.filter(client => client.id !== id));
    if (currentClient && currentClient.id === id) {
      setCurrentClient(null);
      callNextClientInQueue();
    }
  };

  const resetQueue = () => {
    setClients([]);
    setCurrentClient(null);
  };

  const callClient = (client: Client) => {
    setCurrentClient(client);
    announceClient(client);
  };

  const callNextClientInQueue = () => {
    if (clients.length > 0) {
      const nextClient = clients[0];
      callClient(nextClient);
    }
  };

  const announceClient = (client: Client) => {
    const message = translations[language].announcement.replace('{name}', client.name);
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = language === 'en' ? 'en-US' : 'es-ES';
    
    window.speechSynthesis.cancel();
    
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 100);
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'es' : 'en');
  };

  const recallCurrentClient = () => {
    if (currentClient) {
      announceClient(currentClient);
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <header className="bg-indigo-600 text-white p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{t.title}</h1>
            <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-1 bg-indigo-500 rounded hover:bg-indigo-400 transition-colors"
            >
              <Globe className="mr-2" size={18} />
              {language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>
          <div className="flex items-center mt-2">
            <Clock className="mr-2" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
        </header>
        
        <main className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.addNewClient}</h2>
            <AddClientForm onAddClient={addClient} placeholder={t.enterClientName} buttonText={t.addClient} />
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{t.currentQueue}</h2>
              <button
                onClick={resetQueue}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                <RotateCcw className="mr-2" size={18} />
                {t.resetQueue}
              </button>
            </div>
            {currentClient && (
              <div className="mb-4 p-4 bg-yellow-100 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{t.currentClient}</h3>
                    <p>{currentClient.name}</p>
                  </div>
                  <button
                    onClick={recallCurrentClient}
                    className="flex items-center px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                  >
                    <Volume2 className="mr-2" size={18} />
                    {t.recall}
                  </button>
                </div>
              </div>
            )}
            <QueueList 
              clients={clients} 
              onRemoveClient={removeClient} 
              currentClientId={currentClient?.id}
              language={language}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
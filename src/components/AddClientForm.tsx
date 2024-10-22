import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

interface AddClientFormProps {
  onAddClient: (name: string) => void;
  placeholder: string;
  buttonText: string;
}

const AddClientForm: React.FC<AddClientFormProps> = ({ onAddClient, placeholder, buttonText }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddClient(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={placeholder}
        className="flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
      >
        <UserPlus className="mr-2" size={18} />
        {buttonText}
      </button>
    </form>
  );
};

export default AddClientForm;
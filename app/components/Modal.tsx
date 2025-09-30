// Modal component for confirmations and notifications
interface ModalProps {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  type?: 'confirm' | 'info';
}

export default function Modal({ message, onConfirm, onCancel, type = 'confirm' }: ModalProps) {
  return (
    // Full-screen overlay with blur effect
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Modal card with animation */}
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm modal-enter">
        {/* Message text */}
        <p className="text-center text-lg mb-6">{message}</p>
        
        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          {/* Cancel button (only for confirm type) */}
          {type === 'confirm' && onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus-visible"
            >
              Cancel
            </button>
          )}
          
          {/* Confirm/OK button */}
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white focus-visible ${
              type === 'confirm' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {type === 'confirm' ? 'Confirm' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
}

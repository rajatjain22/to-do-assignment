import type { ModalProps } from '../types/Task';

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose}>
        <div className="absolute inset-0 bg-transparent backdrop-blur-sm" />
      </div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white m-2 p-6 rounded-lg shadow-xl border border-gray-200 w-80 z-50" onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </>
  );
} 
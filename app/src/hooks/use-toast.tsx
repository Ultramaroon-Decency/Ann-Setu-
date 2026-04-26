import { useState, useCallback, useEffect, createContext, useContext, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ToastData {
  id: number;
  title: string;
  description?: string;
}

let toastId = 0;
let listeners: Array<(toasts: ToastData[]) => void> = [];
let toastQueue: ToastData[] = [];

function notify() {
  listeners.forEach((l) => l([...toastQueue]));
}

export function toast({ title, description }: { title: string; description?: string }) {
  const id = ++toastId;
  toastQueue.push({ id, title, description });
  notify();
  setTimeout(() => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    notify();
  }, 4000);
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    listeners.push(setToasts);
    return () => {
      listeners = listeners.filter((l) => l !== setToasts);
    };
  }, []);

  if (toasts.length === 0) return null;

  return ReactDOM.createPortal(
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className="toast-item">
          <h4>{t.title}</h4>
          {t.description && <p>{t.description}</p>}
        </div>
      ))}
    </div>,
    document.body
  );
}

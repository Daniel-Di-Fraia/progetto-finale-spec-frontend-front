import { createContext, useContext, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

const ConfirmContext = createContext(null);

function ConfirmModal({ open, title, message, confirmText, cancelText, onConfirm, onCancel }) {
  if (!open) return null;

  return createPortal(
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        {message && <p className="modal-text">{message}</p>}

        <div className="modal-actions">
          <button type="button" className="modal-btn ghost" onClick={onCancel}>
            {cancelText}
          </button>
          <button type="button" className="modal-btn danger" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function ConfirmProvider({ children }) {
  //stato UI della modale
  const [state, setState] = useState({
    open: false,
    title: "Conferma",
    message: "",
    confirmText: "Conferma",
    cancelText: "Annulla",
  });

  //tengo in ref la resolve della Promise (così non perde valore tra render)
  const resolverRef = useRef(null);

  //funzione globale: apre la modale e ritorna una Promise<boolean>
  const confirm = useCallback(({ title, message, confirmText, cancelText } = {}) => {
    setState({
      open: true,
      title: title ?? "Conferma",
      message: message ?? "",
      confirmText: confirmText ?? "Conferma",
      cancelText: cancelText ?? "Annulla",
    });

    return new Promise((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const handleClose = useCallback((result) => {
    setState((s) => ({ ...s, open: false }));
    if (resolverRef.current) {
      resolverRef.current(result);//true o false
      resolverRef.current = null;
    }
  }, []);

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      <ConfirmModal
        open={state.open}
        title={state.title}
        message={state.message}
        confirmText={state.confirmText}
        cancelText={state.cancelText}
        onConfirm={() => handleClose(true)}
        onCancel={() => handleClose(false)}
      />
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm deve essere usato dentro <ConfirmProvider>");
  return ctx;
}

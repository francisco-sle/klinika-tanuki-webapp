import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";

export const Banner = () => {
  const [isOpen, setIsOpen] = useState(true);
  if (!isOpen) return null;

  return (
    <div className="caution-banner w-full" role="status">
      <p>
        Página en construcción
        <span className="hidden sm:inline">
          {" "}
          · nuestra página aún está en desarrollo
        </span>
      </p>
      <button aria-label="Cerrar aviso" onClick={() => setIsOpen(false)}>
        <XMarkIcon className="size-5" />
      </button>
    </div>
  );
};

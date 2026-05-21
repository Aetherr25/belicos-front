import { useEffect, useRef } from "react";

interface ActiveToggleStaticProps {
  isOpen: boolean;
  onClose: () => void
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const ModalBase = ({
  isOpen,
  onClose,
  children,
  title,
  subtitle
}: ActiveToggleStaticProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);


  useEffect(() => {
    const dialogElement = dialogRef.current;

    isOpen ? dialogElement?.showModal() : dialogElement?.close();

  }, [isOpen])

  // Estilizar colores:

  const colorMap: Record<string, string> ={
    Detalle: "bg-gray-400",
    Crear: "bg-green-500",
    Actualizar: "bg-yellow-400",
    Eliminar: "bg-red-600"
  }

  const barColor = colorMap[title] ?? "bg-gray-400"


  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="w-full m-auto max-w sm:max-w-md p-6 bg-white rounded-2xl shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm">
        <div>
          <div
            className="flex gap-2 items-center">
              <div
                className={`w-1.5 h-9 ${barColor} rounded-full`}/>

              <h2 className="text-4xl font-medium">{title}</h2>
          </div>
          <p className="text-lg text-gray-700">{subtitle}</p>
          {children}
        </div>
    </dialog>
  )
}
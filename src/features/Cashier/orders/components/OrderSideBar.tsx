import { ShoppingCart, Trash2, ChevronUp, ChevronDown, Truck, Loader2 } from "lucide-react";
import type { CreateOrderItemDto, OrderPreviewDto } from "../types";
import type { Product } from "../../../Products/types";

interface OrderSidebarProps {
  preview: OrderPreviewDto | null;
  previewLoading: boolean;
  items: CreateOrderItemDto[];
  products: Product[];
  storageUrl: string;
  customerName: string;
  isDelivery: boolean;
  onCustomerNameChange: (v: string) => void;
  onDeliveryChange: (v: boolean) => void;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
  onConfirm: () => void;
}

export const OrderSidebar = ({
  preview, previewLoading, items, products, storageUrl,
  customerName, isDelivery,
  onCustomerNameChange, onDeliveryChange,
  onIncrease, onDecrease, onRemove, onConfirm,
}: OrderSidebarProps) => {

  // Enriquece los items con datos del producto para mostrar imagen/nombre
  const enrichedItems = items.map((item) => {
    const product = products.find((p) => p.productId === item.productId);
    const previewItem = preview?.items.find((p: OrderPreviewItemDto) => p.productId === item.productId);
    return {
      ...item,
      name: product?.name ?? "",
      image: product ? `${storageUrl}/${product.imageUrl}` : "",
      unitPrice: previewItem?.unitPrice ?? product?.price ?? 0,
      subtotal: previewItem?.subtotal ?? 0,
    };
  });

  return (
    <aside className="w-80 min-w-75 bg-white border-l border-gray-100 flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-bold text-gray-900">Nuevo Pedido</h2>
        </div>
        <div>
          <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase block mb-1">
            Nombre de Cliente
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => onCustomerNameChange(e.target.value)}
            placeholder="Ej. Juan Martínez"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition"
          />
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
        {enrichedItems.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-gray-300 gap-2">
            <ShoppingCart className="w-10 h-10" />
            <p className="text-sm">Sin productos</p>
          </div>
        )}

        {enrichedItems.map((item) => (
          <div key={item.productId} className="flex items-start gap-3 group">
            <div className="flex flex-col items-center gap-0.5 pt-1">
              <button onClick={() => onIncrease(item.productId)} className="text-gray-400 hover:text-red-500 transition">
                <ChevronUp className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold text-gray-800 leading-none">{item.quantity}</span>
              <button onClick={() => onDecrease(item.productId)} className="text-gray-400 hover:text-red-500 transition">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="text-sm font-semibold text-gray-800 truncate pr-1">{item.name}</p>
                <p className="text-sm font-bold text-gray-900 whitespace-nowrap">
                  ${item.subtotal.toFixed(2)}
                </p>
              </div>
              {item.unitPrice > 0 && (
                <p className="text-xs text-gray-400">${item.unitPrice.toFixed(2)} c/u</p>
              )}
            </div>

            <button onClick={() => onRemove(item.productId)} className="opacity-0 group-hover:opacity-100 transition text-gray-300 hover:text-red-500 pt-1 shrink-0">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-100 space-y-2">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isDelivery}
            onChange={(e) => onDeliveryChange(e.target.checked)}
            className="w-4 h-4 accent-red-500"
          />
          <span className="text-sm text-gray-600 flex items-center gap-1">
            <Truck className="w-4 h-4 text-gray-400" />
            Envío a domicilio
          </span>
        </label>

        <div className="space-y-1 pt-1">
          {previewLoading ? (
            <div className="flex justify-center py-2">
              <Loader2 className="w-5 h-5 animate-spin text-gray-300" />
            </div>
          ) : (
            <>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>${preview?.subtotal.toFixed(2) ?? "0.00"}</span>
              </div>
              {preview?.isDelivery && (
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Envío</span>
                  <span>${preview.deliveryCost.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-red-500">
                  ${preview?.total.toFixed(2) ?? "0.00"}
                </span>
              </div>
            </>
          )}
        </div>

        <button
          onClick={onConfirm}
          disabled={items.length === 0 || previewLoading}
          className="w-full bg-white border-2 border-gray-200 hover:border-red-400 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 font-semibold py-2.5 rounded-xl transition-all duration-150 text-sm mt-1"
        >
          Completar Pedido
        </button>
      </div>
    </aside>
  );
};
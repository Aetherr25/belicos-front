import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarCashier } from "../../../../components/NavbarCashier";
import { Plus, Eye, ArrowLeftRight, Printer, Clock } from "lucide-react";
import { useGetAllOrders } from "../hooks/useGetAllOrders";
import { useUpdateOrderStatus } from "../hooks/useUpdateOrderStatus";

type OrderStatus = "Pendiente" | "En cocina" | "Completado" | "Cancelado";
type FilterTab = "Todos" | OrderStatus;

const STATUS_CONFIG = {
    Pendiente: { label: "PENDIENTE", dotColor: "bg-yellow-400", badgeBg: "bg-yellow-100", badgeText: "text-yellow-700" },
    "En cocina": { label: "EN COCINA", dotColor: "bg-blue-400", badgeBg: "bg-blue-100", badgeText: "text-blue-700" },
    Completado: { label: "COMPLETADO", dotColor: "bg-green-500", badgeBg: "bg-green-100", badgeText: "text-green-700" },
    Cancelado: { label: "CANCELADO", dotColor: "bg-gray-400", badgeBg: "bg-gray-100", badgeText: "text-gray-600" },
};

const STATUSES = ["Pendiente", "En cocina", "Completado", "Cancelado"];
const FILTER_TABS: FilterTab[] = ["Todos", "Pendiente", "En cocina", "Completado", "Cancelado"];

export const GestionPedidos = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState("Todos");
    const [statusModalOrder, setStatusModalOrder] = useState<{ orderId: number; currentStatus: string } | null>(null);

    const { orders, isLoading, error, refetch } = useGetAllOrders();
    const { updateStatus, isUpdating } = useUpdateOrderStatus();

    const filteredOrders =
        activeFilter === "Todos"
            ? orders
            : orders.filter((o) => o.status === activeFilter);

    const handleStatusChange = async (status: string) => {
        if (!statusModalOrder) return;
        const ok = await updateStatus(statusModalOrder.orderId, status);
        if (ok) {
            setStatusModalOrder(null);
            refetch();
        }
    };

    return (
        <>
            <NavbarCashier GestionPedidos={true} />

            <div className="min-h-screen bg-gray-50 px-6 py-8 max-w-5xl mx-auto">

                <button
                    type="button"
                    onClick={() => navigate("/crear-pedido")}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 hover:cursor-pointer mb-6 shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    TOMAR PEDIDO
                </button>

                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Gestión de Pedidos
                </h1>

                <div className="flex gap-2 flex-wrap mb-6">
                    {FILTER_TABS.map((tab) => {
                        const config = tab !== "Todos" ? STATUS_CONFIG[tab as OrderStatus] : null;
                        const isActive = activeFilter === tab;
                        return (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveFilter(tab)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 hover:cursor-pointer ${isActive
                                        ? "bg-white border-gray-300 shadow-sm text-gray-900"
                                        : "bg-transparent border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {config && <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />}
                                {tab}
                            </button>
                        );
                    })}
                </div>

                {isLoading && (
                    <div className="text-center py-16 text-gray-400 text-lg">
                        Cargando pedidos...
                    </div>
                )}

                {error && !isLoading && (
                    <div className="text-center py-16 text-red-400 text-lg">
                        {error}
                    </div>
                )}

                {!isLoading && !error && (
                    <div className="flex flex-col gap-3">
                        {filteredOrders.length === 0 ? (
                            <div className="text-center py-16 text-gray-400 text-lg">
                                No hay pedidos en esta categoría.
                            </div>
                        ) : (
                            filteredOrders.map((order) => {
                                const status = (order.status ?? "Pendiente") as OrderStatus;
                                const config = STATUS_CONFIG[status] ?? STATUS_CONFIG["Pendiente"];

                                return (
                                    <div
                                        key={order.orderId}
                                        className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 flex items-center gap-4"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-gray-900 font-bold text-base">
                                                    #{order.orderId}
                                                </span>
                                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${config.badgeBg} ${config.badgeText}`}>
                                                    {config.label}
                                                </span>
                                            </div>
                                            <p className="text-gray-800 font-semibold text-sm">
                                                {order.clientName}
                                            </p>
                                            <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                                                <Clock className="w-3 h-3" />
                                                <span>
                                                    {new Date(order.createdAt).toLocaleTimeString("es-MX", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0 hidden sm:block">
                                            {order.items.map((item, idx) => (
                                                <p key={idx} className="text-sm text-gray-600">
                                                    {idx === 0 ? (
                                                        <span className="font-semibold text-gray-800">
                                                            {item.quantity}x {item.productName ?? `Producto #${item.productId}`}
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            {item.quantity}x {item.productName ?? `Producto #${item.productId}`}
                                                        </span>
                                                    )}
                                                </p>
                                            ))}
                                        </div>

                                        <div className="flex flex-col items-end gap-2 shrink-0">
                                            <span className="text-red-500 font-bold text-lg">
                                                ${order.total.toFixed(2)}
                                            </span>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <button
                                                    type="button"
                                                    className="hover:text-gray-700 transition-colors hover:cursor-pointer"
                                                    title="Ver detalle"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="hover:text-gray-700 transition-colors hover:cursor-pointer"
                                                    title="Cambiar estatus"
                                                    onClick={() => setStatusModalOrder({ orderId: order.orderId, currentStatus: order.status ?? "Pendiente" })}
                                                >
                                                    <ArrowLeftRight className="w-5 h-5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="hover:text-gray-700 transition-colors hover:cursor-pointer"
                                                    title="Imprimir"
                                                >
                                                    <Printer className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}

                {/* Modal cambiar estatus */}
                {statusModalOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">Cambiar Estatus</h2>
                            <p className="text-gray-500 text-sm mb-5">Orden #{statusModalOrder.orderId}</p>
                            <div className="flex flex-col gap-2">
                                {STATUSES.map((s) => {
                                    const config = STATUS_CONFIG[s as OrderStatus];
                                    const isCurrent = statusModalOrder.currentStatus === s;
                                    return (
                                        <button
                                            key={s}
                                            type="button"
                                            disabled={isCurrent || isUpdating}
                                            onClick={() => handleStatusChange(s)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all hover:cursor-pointer ${isCurrent
                                                    ? "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed"
                                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                                                }`}
                                        >
                                            <span className={`w-2.5 h-2.5 rounded-full ${config.dotColor}`} />
                                            {s}
                                            {isCurrent && <span className="ml-auto text-xs text-gray-400">actual</span>}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                type="button"
                                onClick={() => setStatusModalOrder(null)}
                                className="mt-4 w-full px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors hover:cursor-pointer"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
};
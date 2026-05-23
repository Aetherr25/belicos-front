import { useNavigate } from "react-router-dom";
import { NavbarCashier } from "../../../components/NavbarCashier";
import { useGetActiveSession } from "../hooks/useGetActiveSession";
import { ShoppingCart, CreditCard, Zap, Monitor } from "lucide-react";

const formatMXN = (value: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(value);

export const PanelCashier = () => {
    const navigate = useNavigate();
    const { session, isLoading } = useGetActiveSession();

    return (
        <>
            <NavbarCashier PanelCajero={true} />

            <div className="min-h-screen bg-gray-50 px-8 py-8 max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold text-gray-900">Resumen Operativo</h1>
                <p className="text-gray-400 text-sm mt-1 mb-8">Administración y control de punto de venta en tiempo real.</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">

                    {/* Estado de la Caja */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <Monitor className="w-5 h-5 text-gray-700" />
                            <h2 className="text-base font-bold text-gray-800">Estado de la Caja</h2>
                        </div>

                        {isLoading ? (
                            <p className="text-gray-400 text-sm">Cargando...</p>
                        ) : session ? (
                            <>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Estado</span>
                                    <span className="flex items-center gap-1.5 text-green-600 font-semibold text-sm">
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                        Abierta
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cajero</span>
                                    <span className="text-sm text-gray-700 font-medium">{session.cashierName}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Apertura</span>
                                    <span className="text-sm text-gray-700 font-medium">
                                        {new Date(session.openedAt).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Fondo Inicial</span>
                                    <span className="text-sm text-gray-700 font-medium">{formatMXN(session.openingAmount)}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => navigate("/caja")}
                                    className="mt-5 w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors hover:cursor-pointer"
                                >
                                    Finalizar Turno
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Estado</span>
                                    <span className="flex items-center gap-1.5 text-red-500 font-semibold text-sm">
                                        <span className="w-2 h-2 rounded-full bg-red-400" />
                                        Cerrada
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => navigate("/caja")}
                                    className="mt-5 w-full px-4 py-2.5 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium text-white transition-colors hover:cursor-pointer"
                                >
                                    Abrir Caja
                                </button>
                            </>
                        )}
                    </div>

                    {/* Ventas del Turno */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-red-500" />
                                <h2 className="text-base font-bold text-gray-800">Ventas del Turno</h2>
                            </div>
                            {session && (
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Acumulado</p>
                                    <p className="text-2xl font-bold text-red-500">{formatMXN(session.totalCalculated)}</p>
                                </div>
                            )}
                        </div>

                        {isLoading ? (
                            <p className="text-gray-400 text-sm">Cargando...</p>
                        ) : session ? (
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Pedidos</p>
                                    <p className="text-2xl font-bold text-gray-800">{session.totalOrders}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Ticket Promedio</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {session.totalOrders > 0
                                            ? formatMXN(session.totalCalculated / session.totalOrders)
                                            : "$0.00"}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm mt-4">Abre la caja para ver las ventas del turno.</p>
                        )}
                    </div>
                </div>

                {/* Accesos Rápidos */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <h2 className="text-base font-bold text-gray-800">Accesos Rápidos</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/crear-pedido")}
                            className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors hover:cursor-pointer text-left"
                        >
                            <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                                <ShoppingCart className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">Crear Nuevo Pedido</p>
                                <p className="text-xs text-gray-400 mt-0.5">Abrir nueva comanda para cliente.</p>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/gestion-pedidos")}
                            className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors hover:cursor-pointer text-left"
                        >
                            <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                                <CreditCard className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">Gestión de Pedidos</p>
                                <p className="text-xs text-gray-400 mt-0.5">Ver y administrar pedidos activos.</p>
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
};
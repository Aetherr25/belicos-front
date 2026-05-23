import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarCashier } from "../../../components/NavbarCashier";
import { useAuthStore } from "../../../store/useAuthStore";
import { cashRegisterApi, type CashRegisterSession } from "../api/cashRegisterApi";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(amount);

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });

export const CashRegistration = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [session, setSession] = useState<CashRegisterSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [openingAmount, setOpeningAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cashRegisterApi.getActive()
      .then(setSession)
      .catch(() => setSession(null))
      .finally(() => setLoading(false));
  }, []);

  const handleOpen = async () => {
    if (!openingAmount) { setError("Ingresa el monto inicial."); return; }
    if (!user) return;
    setSubmitting(true);
    setError(null);
    try {
      await cashRegisterApi.open(user.userId, Number(openingAmount));
      const data = await cashRegisterApi.getActive();
      setSession(data);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Error al abrir la caja.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = async () => {
    if (!confirm("¿Estás seguro que deseas cerrar la caja?")) return;
    setSubmitting(true);
    try {
      await cashRegisterApi.close();
      navigate("/panel-cajero");
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Error al cerrar la caja.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <NavbarCashier Caja={true} />
        <div className="flex items-center justify-center min-h-screen">
          <span className="text-gray-400">Cargando...</span>
        </div>
      </>
    );
  }

  if (!session) {
    return (
      <>
        <NavbarCashier Caja={true} />
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full max-w-md">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-icons text-[#E61919]">point_of_sale</span>
              <h1 className="text-xl font-bold text-[#1A1A1B]">Abrir Caja</h1>
            </div>
            <p className="text-sm text-gray-400 mb-6">Ingresa el monto inicial para comenzar el turno.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Monto inicial</label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-[#F8F9FA] focus-within:border-[#E61919] transition-colors">
                  <span className="text-gray-400 mr-2 text-sm">$</span>
                  <input
                    type="number"
                    value={openingAmount}
                    onChange={(e) => setOpeningAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 bg-transparent text-sm text-[#1A1A1B] outline-none placeholder:text-gray-300"
                  />
                </div>
              </div>
              {error && (
                <p className="text-xs text-[#E61919] bg-red-50 rounded-lg px-3 py-2">{error}</p>
              )}
              <button
                onClick={handleOpen}
                disabled={submitting}
                className="w-full bg-[#E61919] hover:bg-red-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                {submitting ? "Abriendo..." : "Abrir Caja"}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const efectivo = session.orders
    .filter(o => o.paymentMethod.toLowerCase() === "efectivo")
    .reduce((acc, o) => acc + o.total, 0);

  return (
    <>
      <NavbarCashier Caja={true} />
      <div className="min-h-screen bg-[#F8F9FA] px-6 py-8">
        <div className="max-w-5xl mx-auto space-y-6">

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1A1A1B]">Pedidos Diarios y Corte de Caja</h1>
              <p className="text-sm text-gray-400 mt-1">
                Reporte de cierre del día para el{" "}
                {new Date(session.openedAt).toLocaleDateString("es-MX", {
                  day: "numeric", month: "long", year: "numeric"
                })}
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={submitting}
              className="flex items-center gap-2 bg-[#E61919] hover:bg-red-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <span className="material-icons text-base">lock</span>
              {submitting ? "Cerrando..." : "Cerrar Caja"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-icons text-gray-400 text-lg">payments</span>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Ventas Totales</p>
              </div>
              <p className="text-2xl font-bold text-[#1A1A1B]">
                {formatCurrency(session.orders.reduce((acc, o) => acc + o.total, 0))}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-icons text-gray-400 text-lg">receipt_long</span>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Número de Pedidos</p>
              </div>
              <p className="text-2xl font-bold text-[#1A1A1B]">{session.orders.length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-icons text-gray-400 text-lg">attach_money</span>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Efectivo</p>
              </div>
              <p className="text-2xl font-bold text-[#1A1A1B]">{formatCurrency(efectivo)}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-[#1A1A1B]">Transacciones Recientes</h2>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">ID Pedido</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Hora</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Artículos</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Método de Pago</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Monto Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {session.orders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-300 text-sm">
                      No hay pedidos en esta sesión
                    </td>
                  </tr>
                )}
                {session.orders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-400">#{order.orderId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatTime(order.createdAt)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.itemCount} {order.itemCount === 1 ? "artículo" : "artículos"}
                    </td>
                    <td className="px-6 py-4">
                      {order.paymentMethod.toLowerCase() === "efectivo" ? (
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">
                          💵 Efectivo
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">
                          💳 Tarjeta
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#1A1A1B] text-right">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {session.orders.length > 0 && (
              <div className="px-6 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Mostrando {session.orders.length} de {session.orders.length} pedidos
                </p>
              </div>
            )}
          </div>

          {error && (
            <p className="text-sm text-[#E61919] bg-red-50 rounded-xl px-4 py-3">{error}</p>
          )}

        </div>
      </div>
    </>
  );
};
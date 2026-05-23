import { useState } from "react";
import { NavbarAdmin } from "../../../components/NavbarAdmin";
import { useGetSalesReport } from "../hooks/useGetSalesReport";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts";

const PERIOD_LABELS: Record<string, string> = {
    week: "Esta Semana",
    month: "Mes Pasado",
    quarter: "Trimestral",
};

const CATEGORY_COLORS = ["#ef4444", "#f97316", "#6b7280", "#3b82f6", "#22c55e", "#a855f7"];

const formatMXN = (value: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(value);

export const SalesReport = () => {
    const [period, setPeriod] = useState("week");
    const { report, isLoading, error } = useGetSalesReport(period);

    return (
        <>
            <NavbarAdmin ReporteVentas={true} />

            <div className="min-h-screen bg-gray-50 px-8 py-8 max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Reporte de ventas</h1>
                        <p className="text-gray-400 text-sm mt-1">Análisis detallado de rendimiento comercial</p>
                    </div>
                    <div className="flex gap-2">
                        {Object.entries(PERIOD_LABELS).map(([key, label]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setPeriod(key)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:cursor-pointer ${period === key
                                        ? "bg-red-500 text-white shadow-sm"
                                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {isLoading && (
                    <div className="text-center py-20 text-gray-400 text-lg">Cargando reporte...</div>
                )}

                {error && !isLoading && (
                    <div className="text-center py-20 text-red-400 text-lg">{error}</div>
                )}

                {!isLoading && !error && report && (
                    <>
                        {/* Tarjetas de métricas */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ventas Totales</p>
                                <p className="text-3xl font-bold text-gray-900">{formatMXN(report.totalSales)}</p>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Número de Pedidos</p>
                                <p className="text-3xl font-bold text-gray-900">{report.totalOrders.toLocaleString()}</p>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Promedio por Ticket</p>
                                <p className="text-3xl font-bold text-gray-900">{formatMXN(report.averageTicket)}</p>
                            </div>
                        </div>

                        {/* Gráficas */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">

                            {/* Gráfica de línea */}
                            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                                <h2 className="text-base font-bold text-gray-800 mb-6">Tendencia de Ventas Diarias</h2>
                                {report.dailySales.length === 0 ? (
                                    <div className="flex items-center justify-center h-48 text-gray-400 text-sm">Sin datos para este periodo</div>
                                ) : (
                                    <ResponsiveContainer width="100%" height={220}>
                                        <LineChart data={report.dailySales}>
                                            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                                            <Tooltip formatter={(value) => formatMXN(Number(value))} />
                                            <Line
                                                type="monotone"
                                                dataKey="total"
                                                stroke="#ef4444"
                                                strokeWidth={2.5}
                                                dot={{ fill: "#ef4444", r: 4 }}
                                                activeDot={{ r: 6 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                )}
                            </div>

                            {/* Donut chart categorías */}
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                                <h2 className="text-base font-bold text-gray-800 mb-4">Ventas por Categoría</h2>
                                {report.salesByCategory.length === 0 ? (
                                    <div className="flex items-center justify-center h-48 text-gray-400 text-sm">Sin datos</div>
                                ) : (
                                    <>
                                        <div className="flex justify-center">
                                            <PieChart width={160} height={160}>
                                                <Pie
                                                    data={report.salesByCategory}
                                                    cx={75}
                                                    cy={75}
                                                    innerRadius={50}
                                                    outerRadius={75}
                                                    dataKey="percentage"
                                                    nameKey="categoryName"
                                                >
                                                    {report.salesByCategory.map((_, index) => (
                                                        <Cell key={index} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </div>
                                        <div className="flex flex-col gap-2 mt-2">
                                            {report.salesByCategory.map((cat, index) => (
                                                <div key={index} className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className="w-2.5 h-2.5 rounded-full"
                                                            style={{ backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }}
                                                        />
                                                        <span className="text-gray-600">{cat.categoryName}</span>
                                                    </div>
                                                    <span className="font-semibold text-gray-800">{cat.percentage}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Top productos */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <h2 className="text-base font-bold text-gray-800 mb-6">Top Productos Vendidos</h2>
                            {report.topProducts.length === 0 ? (
                                <div className="text-center py-10 text-gray-400 text-sm">Sin datos para este periodo</div>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Producto</th>
                                            <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Categoría</th>
                                            <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Cant. Vendida</th>
                                            <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Ingresos</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {report.topProducts.map((product, index) => (
                                            <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 text-sm font-semibold text-gray-800">{product.productName}</td>
                                                <td className="py-4 text-sm text-gray-500">{product.categoryName}</td>
                                                <td className="py-4 text-sm text-gray-700">{product.quantitySold}</td>
                                                <td className="py-4 text-sm font-semibold text-gray-800">{formatMXN(product.revenue)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
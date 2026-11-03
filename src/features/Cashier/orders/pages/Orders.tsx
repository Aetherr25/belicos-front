import { useState, useEffect } from "react";
import { NavbarCashier } from "../../../../components/NavbarCashier";
import { useGetAllActivesCategories } from "../../../Categories/hooks/useGetAllActivesCategories";
import { useGetAllProducts } from "../../../Products/hooks/useGetAllProducts";
import { CategoryFilterButton } from "../components/CategoryFilterButton";
import { ProductCard } from "../components/ProductCard";
import { useOrderPreview } from "../hooks/useOrderHook";
import type { CreateOrderItemDto } from "../types";
import { OrderSidebar } from "../components/OrderSideBar";

const STORAGE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5150/api").replace("/api", "");

export const Orders = () => {
  const { categories } = useGetAllActivesCategories();
  const { products } = useGetAllProducts();
  const { preview, loading, fetchPreview, confirmOrder } = useOrderPreview();

  const [items, setItems] = useState<CreateOrderItemDto[]>([]);
  const [clientName, setClientName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Efectivo"); 
  const [isDelivery, setIsDelivery] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryId === selectedCategory)
    : products;

  // Re-fetch preview cuando cambian items o isDelivery
  useEffect(() => {
    fetchPreview({ clientName, paymentMethod, isDelivery, items });
  }, [items, isDelivery]);

  const handleAdd = (productId: number) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.productId === productId);
      if (exists) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const handleIncrease = (productId: number) =>
    setItems((prev) =>
      prev.map((i) => i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i)
    );

  const handleDecrease = (productId: number) =>
    setItems((prev) =>
      prev
        .map((i) => i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i)
        .filter((i) => i.quantity > 0)
    );

  const handleRemove = (productId: number) =>
    setItems((prev) => prev.filter((i) => i.productId !== productId));

  const handleConfirm = async () => {
    const ok = await confirmOrder({ clientName, paymentMethod, isDelivery, items });
    if (ok) {
      setItems([]);
      setClientName("");
      setPaymentMethod("Cash");
      setIsDelivery(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <NavbarCashier CrearPedido={true} />

      <div className="flex flex-1 overflow-hidden">
        {/* Products */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex gap-3 bg-white shadow-sm py-3 px-6 border-b border-gray-100">
            <CategoryFilterButton
              label="Todo"
              isSelected={selectedCategory === null}
              onClick={() => setSelectedCategory(null)}
            />
            {categories.map((category) => (
              <CategoryFilterButton
                key={category.categoryId}
                label={category.name}
                isSelected={selectedCategory === category.categoryId}
                onClick={() => setSelectedCategory(category.categoryId)}
              />
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <div className="flex flex-wrap gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.productId}
                  image={`${STORAGE_URL}/${product.imageUrl}`}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  stock={product.stock}
                  onAdd={() => handleAdd(product.productId)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <OrderSidebar
          preview={preview}
          previewLoading={loading}
          items={items}
          products={products}
          storageUrl={STORAGE_URL}
          customerName={clientName}
          isDelivery={isDelivery}
          onCustomerNameChange={setClientName}
          onDeliveryChange={setIsDelivery}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
};
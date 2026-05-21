
interface ProductCardProps {
  image?: string,
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const ProductCard = ({
  image,
  name,
  description,
  price,
  stock
} : ProductCardProps) => {
  return (
    <div
      className=""
    >
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{price}</p>
      <p>{stock}</p>

    </div>
  )
}

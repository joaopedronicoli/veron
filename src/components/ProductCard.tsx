interface ProductCardProps {
  name: string;
  brand: string;
  price: string;
  image: string;
}

export default function ProductCard({ name, brand, price, image }: ProductCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative bg-white aspect-square mb-4 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      <div className="text-center space-y-1">
        <p className="text-xs tracking-widest text-gray-500 uppercase">{brand}</p>
        <h3 className="font-serif text-lg text-black">{name}</h3>
        <p className="text-gold font-semibold tracking-wide">{price}</p>
      </div>
    </div>
  );
}

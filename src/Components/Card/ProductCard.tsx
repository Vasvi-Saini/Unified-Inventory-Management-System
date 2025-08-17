import { Product } from "../../../generated/prisma";
import { useUserContext } from "../contexts/UserContext";
import Removeprod from "../RemoveProd";
import Updateproduct from "../UpdateProduct";

export default function ProductCard({ product }: { product: Product }) {
  const { user } = useUserContext();
  const categoryColors: Record<string, string> = {
    electronics: "bg-purple-100 text-purple-700",
    beauty: "bg-pink-100 text-pink-700",
    food: "bg-yellow-100 text-yellow-700",
    accessories: "bg-indigo-100 text-indigo-700",
    clothing: "bg-blue-100 text-blue-700",
    furniture: "bg-green-100 text-green-700",
    decor: "bg-orange-100 text-orange-700",
    others: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="rounded-lg shadow-lg p-6 relative">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold ">{product.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            NEW
          </span>
        </div>

        <p className="light:text-gray-600 text-sm">{product.description}</p>

        <div className="text-xl font-bold light:text-gray-900">
          ${product.price}
        </div>

        <div className="flex justify-between text-sm">
          <span
            className={`px-3 py-1 rounded ${
              categoryColors[product.category] || "bg-gray-100 text-gray-700"
            }`}
          >
            {product.category}
          </span>
          
          {user?.role == "manager" ? (
            <div className="flex gap-2">
              <span>
                <Updateproduct prod={product} />
              </span>
              <span>
                <Removeprod id={product.id} />
              </span>
            </div>
          ) : (
            <span className="light:text-gray-500">{product.stock} left</span>
          )}
        </div>
      </div>
    </div>
  );
}

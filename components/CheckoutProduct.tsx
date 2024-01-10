import Image from "next/image";
import React from "react";
import { StarIcon } from "@heroicons/react/16/solid";
import { StarIcon as StarOutLine } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/slices/cartSlice";

const CheckoutProduct = ({ product }: any) => {
  const roundedRating = Math.round(product.rating.rate);

  let indianLocale = Intl.NumberFormat("en-IN"); // format the price

  const newPrice = indianLocale.format(product.price * 82); // convert usd to inr
  const dispatch = useDispatch();
  const removeItem = () => {
    const id = product.id;

    dispatch(removeFromCart({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image
        src={product.image}
        height={200}
        width={200}
        objectFit="contain"
        alt={product.title}
      />
      {/* Mid Section */}
      <div className="col-span-3 mx-5">
        <p>{product.title}</p>
        <div className="flex text-yellow-500">
          {Array(5)
            .fill("-")
            .map((_, i) => {
              return i <= roundedRating ? (
                <StarIcon key={i} className="h-4" />
              ) : (
                <StarOutLine key={i} className="h-4" />
              );
            })}
        </div>
        <p className="text-xs my-2 line-clamp-3 md:text-sm">
          {product.description}
        </p>
        <p>₹ {newPrice}</p>
        {product.hasPrime && (
          <div className="flex items-center space-x-2 mt-2">
            <img
              src="https://banner2.cleanpng.com/20180630/buy/kisspng-amazon-com-amazon-prime-amazon-video-retail-prime-amazon-prime-5b376c3bdf3100.0051578015303588439142.jpg"
              alt="amazon prime logo"
              className="w-12"
              loading="lazy"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      {/* Right */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button mt-auto">Save for later</button>
        <button className="button mt-auto" onClick={removeItem}>
          Remove from cart
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;

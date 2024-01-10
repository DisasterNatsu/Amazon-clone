"use client";

import { Products } from "@/typings";
import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/16/solid";
import { StarIcon as StarOutLine } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slices/cartSlice";

const Product = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}: Products) => {
  const dispatch = useDispatch();

  const roundedRating = Math.round(rating.rate); // Round the rating from the api

  const [hasPrime] = useState(Math.random() < 0.5); // randomize having prime

  let indianLocale = Intl.NumberFormat("en-IN"); // format the price

  const newPrice = indianLocale.format(price * 82); // convert usd to inr

  const addItemtoCart = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    };

    // send product as an action to global store
    dispatch(addToCart(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 ">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400 z-50">
        {category}
      </p>
      <img src={image} className="w-[220px] h-[250px] mx-auto" alt={title} />
      <h4 className="my-3">{title}</h4>
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
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <p>₹ {newPrice}</p>
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            src="https://banner2.cleanpng.com/20180630/buy/kisspng-amazon-com-amazon-prime-amazon-video-retail-prime-amazon-prime-5b376c3bdf3100.0051578015303588439142.jpg"
            alt="amazon prime logo"
            className="w-12"
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button onClick={addItemtoCart} className="mt-auto button">
        Add to Cart
      </button>
    </div>
  );
};

export default Product;

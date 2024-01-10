import { Products } from "@/typings";
import Product from "./Product";

const ProductFeed = async () => {
  const request = await fetch("https://fakestoreapi.com/products");

  const products = await request.json();

  return (
    <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products
        .slice(0, 4)
        .map(
          ({
            id,
            title,
            price,
            description,
            category,
            image,
            rating,
          }: Products) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              image={image}
              category={category}
              rating={rating}
            />
          )
        )}

      <img
        className="md:col-span-4 mx-auto"
        src="https://links.papareact.com/dyz"
        alt="advert"
      />

      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(
            ({
              id,
              title,
              price,
              description,
              category,
              image,
              rating,
            }: Products) => (
              <Product
                key={id}
                id={id}
                title={title}
                price={price}
                description={description}
                image={image}
                category={category}
                rating={rating}
              />
            )
          )}
      </div>
      {products
        .slice(5, products.length)
        .map(
          ({
            id,
            title,
            price,
            description,
            category,
            image,
            rating,
          }: Products) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              image={image}
              category={category}
              rating={rating}
            />
          )
        )}
    </div>
  );
};

export default ProductFeed;

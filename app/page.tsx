import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import ProductFeed from "@/components/ProductFeed";

export default function Home() {
  return (
    <main className="bg-gray-100">
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed />
      </div>
    </main>
  );
}

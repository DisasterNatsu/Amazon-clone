import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import ProductFeed from "@/components/ProductFeed";
import Head from "next/head";

export default function Home() {
  return (
    <main className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed />
      </div>
    </main>
  );
}

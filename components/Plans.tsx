import { CheckIcon } from "@heroicons/react/outline";
import { Product } from "@stripe/firestore-stripe-payments";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const plansDescription = [
  "Watch all you want. Ad-free.",
  "Recommendations just for you.",
  "Change or cancel your plan anytime.",
];

interface IProps {
  products: Product[];
}

function Plans({ products }: IProps) {
  console.log(products);
  const { logout, user } = useAuth();
  const [isBillingLoading, setBillingLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2]);

  const subscribeToPlan = () => {
    if (!user) return;

    setBillingLoading(true);
  };

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="border-b border-white/10 bg-[#141414]">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            alt="Netflix"
            width={150}
            height={90}
            className="cursor-pointer object-contain"
          />
        </Link>
        <button className="text-lg font-medium hover:underline" onClick={logout}>
          Sign Out
        </button>
      </header>

      <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">Choose the plan that's right for you</h1>
        <ul>
          {plansDescription.map((planDescription) => (
            <li className="flex items-center gap-x-2 text-lg">
              <CheckIcon className="h-7 w-7 text-[#E50914]" /> {planDescription}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center justify-end self-end md:w-3/5">
            {products.map((product) => (
              <div
                className={`planBox ${selectedPlan?.id === product.id ? "opacity-100" : "opacity-60"}`}
                key={product.id}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Plans;

"use client";

// pages/admin/dashboard_admin/[slug]/page.js
import { useRouter } from "next/navigation";

const StorePage = ({ params }) => {
  const { slug } = params;

  console.log("Slug:", slug);

  return (
    <div>
      <h1 className="text-2xl">
        Showing the store page for the name <strong>{slug}</strong>
      </h1>
    </div>
  );
};

export default StorePage;

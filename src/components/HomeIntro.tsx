import React from "react";
import { FaBicycle, FaLeaf, FaWifi, FaUtensils, FaMapMarkerAlt, FaCar } from "react-icons/fa";

export default function HomeIntro() {
  return (
    <section className="bg-white">
      {/* Hero Section */}
      <div
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero1.webp')" }}
      >
        <div className="bg-black/50 p-6 rounded-lg text-center text-white max-w-2xl">
          <h1 className="text-4xl font-bold">
            Experience Authentic Sri Lankan Hospitality
          </h1>
          <p className="mt-4 text-lg">
            Stay in comfort, explore heritage sites, and enjoy home-cooked Sri
            Lankan meals — all in the heart of Anuradhapura.
          </p>
          <a
            href="https://www.booking.com/Share-KzsPpdF"
            className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
          >
            Book Your Stay
          </a>
        </div>
      </div>

      {/* Intro Text */}
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-semibold">Welcome to Anuradhapura Homestay</h2>
        <p className="mt-4 text-gray-600">
          Your peaceful retreat just minutes from the UNESCO-listed Sacred City.
          Enjoy a blend of tradition, comfort, and warm Sri Lankan hospitality.
        </p>
      </div>

      {/* USPs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pb-16">
        <USP icon={<FaMapMarkerAlt />} title="Close to Heritage Sites" text="Only 5 minutes from the Sacred City & temples." />
        <USP icon={<FaUtensils />} title="Authentic Meals" text="Enjoy traditional home-cooked Sri Lankan dishes." />
        <USP icon={<FaBicycle />} title="Free Bicycles" text="Explore ancient ruins at your own pace." />
        <USP icon={<FaLeaf />} title="Peaceful Garden" text="Relax under the shade after a day of sightseeing." />
        <USP icon={<FaWifi />} title="Free Wi-Fi" text="Stay connected while you travel." />
        <USP icon={<FaCar />} title="Pickup Service" text="We can arrange station or airport transfers." />
      </div>
    </section>
  );
}

function USP({ icon, title, text }: { icon: JSX.Element; title: string; text: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto text-yellow-500 text-4xl">{icon}</div>
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="text-gray-500">{text}</p>
    </div>
  );
}

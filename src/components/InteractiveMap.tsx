import React, { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Star, Clock, Phone, MapPin } from 'lucide-react';
type Tooltip = {
  x: number;
  y: number;
  text: string;
} | null;

type Location = {
  id: number;
  name: string;
  type: string;
  coords: { x: number; y: number };
  rating: number;
  description: string;
  hours: string;
  phone: string;
};

const InteractiveMap = () => {
  const [tooltip, setTooltip] = useState<Tooltip>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const navigate = useNavigate();

  const locations: Location[] = [
    {
      id: 1,
      name: 'Green Chilli Restaurant',
      type: 'restaurant',
      coords: { x: 300, y: 250 }, // Adjust these coordinates to place on your SVG map
      rating: 4.8,
      description: 'Authentic Sri Lankan cuisine',
      hours: '11:00 AM - 10:00 PM',
      phone: '+94 70 123 4567'
    },
    {
      id: 2,
      name: 'Chipmunk Homestay',
      type: 'accommodation',
      coords: { x: 300, y: 280 }, // Adjust these coordinates
      rating: 4.9,
      description: 'Traditional family homestay',
      hours: '24/7 Check-in',
      phone: '+94 70 123 4568'
    },
    {
      id: 3,
      name: 'Wilpattu Safari Pickup',
      type: 'tour',
      coords: { x: 120, y: 200 }, // Adjust these coordinates
      rating: 4.8,
      description: 'Wildlife safari tours',
      hours: '5:00 AM - 6:00 PM',
      phone: '+94 70 123 4570'
    }
  ];

const galleryImages = [
    {
      src: '/images/gallery/G1.png',
      alt: 'Traditional Sri Lankan temple architecture',
      title: 'Ancient Temples'
    },
    {
      src: '/images/gallery/G11.png',
      alt: 'Beautiful Sri Lankan landscape',
      title: 'Natural Beauty'
    },
    {
      src: '/images/gallery/G12.png',
      alt: 'Wildlife safari experience',
      title: 'Wildlife Adventures'
    },
    {
      src: '/images/gallery/G10.png',
      alt: 'Traditional Sri Lankan cuisine',
      title: 'Local Cuisine'
    },
    {
      src: '/images/gallery/G13.png',
      alt: 'Tropical forest scenery',
      title: 'Tropical Paradise'
    },
    {
      src: '/images/gallery/G14.png',
      alt: 'Comfortable homestay accommodation',
      title: 'Cozy Stays'
    }
  ];



  const getLocationColor = (type: string) => {
  switch (type) {
    case 'restaurant': return 'text-orange-600';
    case 'accommodation': return 'text-blue-600'; 
    case 'tour': return 'text-emerald-600';
    default: return 'text-gray-600';
  }
};

  const handleTooltip = (e: React.MouseEvent, text: string) => {
    const svg = (e.target as SVGElement).ownerSVGElement;
    const bounds = svg?.getBoundingClientRect();

    if (bounds) {
      setTooltip({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
        text,
      });
    }
  }

  const hideTooltip = () => setTooltip(null);

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region === selectedRegion ? null : region);
  };

  const handleLocationClick = (id: number) => {
    setSelectedLocation(id === selectedLocation ? null : id);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Explore <span className="text-emerald-600">Anuradhapura</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative w-full h-[600px] bg-white rounded-xl shadow overflow-hidden">
              <svg
                viewBox="0 0 600 600"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <desc>Developed by : Copyright@Sukitha Bandara</desc>
            {/* Horowupotana Region */}
            <path
              d="M438.28,408.26C432.44,409.74,397.4,400.96999999999997,397.4,400.96999999999997S409.08,379.04999999999995,413.47999999999996,365.91999999999996S391.59,357.15999999999997,384.27,352.78999999999996S384.27,342.56999999999994,384.27,342.56999999999994C397.4,338.19999999999993,403.27,322.1599999999999,403.27,322.1599999999999L404.72999999999996,262.2999999999999S401.79999999999995,234.5499999999999,417.89,217.0399999999999S469,177.61,469,165.94S474.82,144.04,480.67,136.74S527.35,100.26000000000002,527.35,100.26000000000002S535.5400000000001,157.07000000000002,539.49,173.91000000000003S579.9300000000001,222.91000000000003,571.16,249.14000000000004S531.77,297.31000000000006,544.9,313.37000000000006C546.4499999999999,315.2800000000001,548.31,317.58000000000004,550.35,320.07000000000005C547.82,324.8,534.77,349,523,354.25C509.85,360.12,501.11,361.55,490.88,364.46C472.18,369.79999999999995,464.88,386.34999999999997,459.09,394.2C458.89,392.96999999999997,458.77,392.2,458.77,392.2L463.12,387.83C454.33,395.13,444.13,406.8,438.28,408.26Z"
              fill="#d1e0e0"
                  stroke="#ffffff"
                  strokeOpacity="0.6"
                  strokeWidth="1"
                  className={`transition-colors duration-200 cursor-pointer hover:fill-emerald-400 ${
                    selectedRegion === "Horowupotana" ? 'fill-emerald-500' : ''
                  }`}
                  onClick={() => handleRegionClick("Horowupotana")}
                  onMouseEnter={(e) => handleTooltip(e, "Horowupotana")}
                  onMouseLeave={hideTooltip}
                />

            {/* Mihintale Region */}
            <path
              d="M290.84,424.35C286.46999999999997,428.72,251.45,443.35,249.95999999999998,431.63C248.87999999999997,422.63,248.61999999999998,410.02,248.57,404.81A101.64,101.64,0,0,0,264.57,396.58L285,387.82S309.83,364.46,311.29,360.12S304,301.7,321.5,304.61S371.15999999999997,346.96000000000004,384.29,342.61C384.29,342.61,376.99,348.46000000000004,384.29,352.83000000000004S417.88,352.83000000000004,413.49,365.96000000000004S397.42,401,397.42,401S384.29,414.13,388.64000000000004,425.79S406.14000000000004,460.84000000000003,398.86000000000007,465.21000000000004S374.06000000000006,468.14000000000004,374.06000000000006,468.14000000000004S349.22,430.18,339,438.92S319.91,481.56,319.91,481.56L319.91,481.66C303.66,476.09000000000003,285.40000000000003,469.92,287.91,462.26000000000005C292.29,449.13000000000005,301.04,441.83000000000004,302.49,436.00000000000006S295.21,420,290.84,424.35Z"
               fill="#d1e0e0"
                  stroke="#ffffff"
                  strokeOpacity="0.6"
                  strokeWidth="1"
                  className={`transition-colors duration-200 cursor-pointer hover:fill-emerald-400 ${
                    selectedRegion === "Mihintale" ? 'fill-emerald-500' : ''
                  }`}
                  onClick={() => handleRegionClick("Mihintale")}
                  onMouseEnter={(e) => handleTooltip(e, "Mihintale")}
                  onMouseLeave={hideTooltip}
                />

             {/* Medawachchiya Region */}
            <path
              d="M235.36,195.13C239.75,190.75,267.5,133.82,280.61,133.82S323,138.19,323,138.19S412,87.1,398.88,72.50999999999999S359.49,33.08999999999999,374.1,31.62999999999999S403.27000000000004,41.829999999999984,414.98,38.91999999999999C424.87,36.469999999999985,460.03000000000003,10.919999999999987,475.78000000000003,0.4999999999999858C476.98,3.1099999999999857,479.59000000000003,7.749999999999986,485.04,14.109999999999985C493.78000000000003,24.329999999999984,533.2,40.36999999999999,543.4,46.249999999999986S527.3299999999999,100.24999999999999,527.3299999999999,100.24999999999999S486.4699999999999,129.42,480.63999999999993,136.73S468.9599999999999,154.26,468.9599999999999,165.92999999999998S433.9099999999999,199.47999999999996,417.8699999999999,217.02999999999997S404.6899999999999,262.28,404.6899999999999,262.28S395.9299999999999,263.7,379.8899999999999,268.11999999999995S368.21999999999986,268.11999999999995,352.1399999999999,262.28S331.70999999999987,269.58,327.33999999999986,273.95S317.1399999999999,273.95,309.83999999999986,272.51S295.21999999999986,253.51,289.3899999999999,247.67S248.5,221.42,244.08,220C240.18,218.69,231.52,203.26,229.83,200.12A41.9,41.9,0,0,0,235.36,195.13Z"
               fill="#d1e0e0"
                  stroke="#ffffff"
                  strokeOpacity="0.6"
                  strokeWidth="1"
                  className={`transition-colors duration-200 cursor-pointer hover:fill-emerald-400 ${
                    selectedRegion === "Medawachchiya" ? 'fill-emerald-500' : ''
                  }`}
                  onClick={() => handleRegionClick("Medawachchiya")}
                  onMouseEnter={(e) => handleTooltip(e, "Medawachchiya")}
                  onMouseLeave={hideTooltip}
                />

             {/* Kekirawa Region */}
            <path
              d="M301,599.5S293.84,593.75,285.88,588.68L286.40999999999997,587.81S296.63,552.81,290.77,538.1899999999999L288.49,535.7299999999999C291.17,535.7299999999999,293.07,534.81,293.68,532.3699999999999C295.14,526.4899999999999,298.06,511.89999999999986,309.78000000000003,507.5299999999999S346.25,501.68999999999994,343.33000000000004,492.9299999999999C342.11,489.2799999999999,331.49000000000007,485.6399999999999,319.83000000000004,481.6599999999999L319.83000000000004,481.5599999999999S328.70000000000005,447.6799999999999,338.92,438.9199999999999S374,468.11,374,468.11S391.49,469.57,398.8,465.18S392.96000000000004,437.48,388.58,425.76S397.4,401,397.4,401S432.4,409.77,438.28,408.29S454.33,395.16,463.08,387.85L458.71999999999997,392.24S458.84,393,459.04999999999995,394.24C459.74999999999994,399.02,461.34,410.98,460.18999999999994,415.6C458.72999999999996,421.43,435.38999999999993,487.14000000000004,441.18999999999994,500.27000000000004C441.18999999999994,500.27000000000004,404.67999999999995,520.7,398.85999999999996,525.07S394.49999999999994,551.36,382.79999999999995,570.32S301,599.5,301,599.5Z"
               fill="#d1e0e0"
                  stroke="#ffffff"
                  strokeOpacity="0.6"
                  strokeWidth="1"
                  className={`transition-colors duration-200 cursor-pointer hover:fill-emerald-400 ${
                    selectedRegion === "Kekirawa" ? 'fill-emerald-500' : ''
                  }`}
                  onClick={() => handleRegionClick("Kekirawa")}
                  onMouseEnter={(e) => handleTooltip(e, "Kekirawa")}
                  onMouseLeave={hideTooltip}
                />

            {/* Anuradhapura-East Region */}
            <path
              d="M247.69,405.15C243.07999999999998,406.85999999999996,238.48,407.84999999999997,235.35999999999999,406.79999999999995C226.57999999999998,403.87999999999994,239.73,381.99999999999994,241.19,376.15999999999997C242.19,372.34,240.60999999999999,361.01,239.82999999999998,351.15999999999997V351.02C239.44,345.89,239.23999999999998,341.14,239.76,338.15999999999997C241.2,329.4,280.62,319.15999999999997,285,311.86999999999995S271.87,306.0199999999999,267.5,298.73999999999995S309.85,272.47999999999996,309.85,272.47999999999996C317.13,273.93999999999994,322.98,278.30999999999995,327.35,273.93999999999994S336.11,256.38999999999993,352.15000000000003,262.25999999999993S363.82000000000005,272.47999999999996,379.90000000000003,268.0899999999999S404.70000000000005,262.25999999999993,404.70000000000005,262.25999999999993L403.25000000000006,322.0999999999999S397.40000000000003,338.1599999999999,384.25000000000006,342.5299999999999S339.00000000000006,307.4799999999999,321.4800000000001,304.5299999999999S312.7300000000001,355.6199999999999,311.2700000000001,360.0299999999999S285,387.82,285,387.82L264.59,396.58A102.17,102.17,0,0,1,248.58999999999997,404.81C248.26,404.9,248,405,247.69,405.15Z"
               fill="#d1e0e0"
                  stroke="#ffffff"
                  strokeOpacity="0.6"
                  strokeWidth="1"
                  className={`transition-colors duration-200 cursor-pointer hover:fill-emerald-400 ${
                    selectedRegion === "Anuradhapura-East" ? 'fill-emerald-500' : ''
                  }`}
                  onClick={() => handleRegionClick("Anuradhapura-East")}
                  onMouseEnter={(e) => handleTooltip(e, "Anuradhapura-East")}
                  onMouseLeave={hideTooltip}
                />

             {/* Kalawewa Region */}
            <path
              d="M181.35,395.13C185.73999999999998,396.58,191.57,403.88,200.35,402.43S219.35,398.04,217.85,390.75S191.56,371.75,194.47,363.01S207.63,349.88,207.63,349.88L238.26,351.32L239.82,351.19C240.6,361,242.15,372.34,241.18,376.19C239.74,382.04,226.61,403.92,235.35,406.84C238.46,407.89,243.07,406.9,247.68,405.16999999999996C247.99,405.06999999999994,248.25,404.93999999999994,248.55,404.83C248.55,410.03999999999996,248.87,422.61,249.93,431.65999999999997C251.42000000000002,443.33,286.46000000000004,428.73999999999995,290.83,424.36999999999995S304,430.16,302.51,436S292.3,449.13,287.93,462.26C285.37,469.93,303.63,476.08,319.93,481.67C331.6,485.67,342.21000000000004,489.29,343.44,492.94C346.35,501.7,321.55,503.15,309.88,507.52S295.26,526.52,293.8,532.36C293.17,534.8000000000001,291.26,535.74,288.6,535.74C284.95000000000005,535.74,279.88,534.04,274.84000000000003,532.36C266.08000000000004,529.45,269.00000000000006,492.94,264.63000000000005,482.72S158,428.7,150.73,424.33S108.4,417,108.4,417L107.52000000000001,417.1C106.04,405.33000000000004,103.52000000000001,394.92,99.62,393.62C97.92,393.05,94.78,392.17,90.77000000000001,391.06L90.87,390.71S114.21000000000001,370.24,120.04,374.65S152.18,399.45,162.39000000000001,397.98999999999995S177,393.67,181.35,395.13Z"
               fill="#d1e0e0"
                  stroke="#ffffff"
                  strokeOpacity="0.6"
                  strokeWidth="1"
                  className={`transition-colors duration-200 cursor-pointer hover:fill-emerald-400 ${
                    selectedRegion === "Kalawewa" ? 'fill-emerald-500' : ''
                  }`}
                  onClick={() => handleRegionClick("Kalawewa")}
                  onMouseEnter={(e) => handleTooltip(e, "Kalawewa")}
                  onMouseLeave={hideTooltip}
                />

             {/* Anuradhapura-west Region */}
            <path
              d="M172.6,130.91C179.88,141.12,206.18,183.45999999999998,206.18,183.45999999999998S207.64000000000001,208.28999999999996,217.86,205.34999999999997C223.70000000000002,203.67999999999998,227.15,201.99999999999997,229.86,200.06999999999996C231.56,203.20999999999995,240.21,218.63999999999996,244.13000000000002,219.96999999999997C248.53000000000003,221.41999999999996,283.57000000000005,241.85999999999996,289.39000000000004,247.67999999999998S302.52000000000004,271.06,309.84000000000003,272.52C309.84000000000003,272.52,263.13000000000005,291.52,267.51000000000005,298.78S289.39000000000004,304.60999999999996,285.01000000000005,311.90999999999997S241.20000000000005,329.43999999999994,239.76000000000005,338.2C239.25000000000006,341.2,239.45000000000005,345.93,239.84000000000006,351.06V351.2L238.28000000000006,351.33L207.64000000000004,349.88S197.40000000000003,354.25,194.47000000000006,363.01S216.39000000000004,383.46999999999997,217.85000000000005,390.75S209.11000000000004,400.97,200.35000000000005,402.43S185.75000000000006,396.6,181.35000000000005,395.14S172.59000000000006,396.59999999999997,162.35000000000005,398.06S125.82000000000005,379.06,120.01000000000005,374.71S90.84000000000005,390.77,90.84000000000005,390.77L90.72000000000004,391.13C74,386.51,42.69,378.22,42.69,374.71L42.69,374.71C42,372.96,19.509999999999998,317.60999999999996,29.559999999999995,307.57C39.809999999999995,297.34999999999997,76.27,241.89,74.81,234.57S61.67,208.31,61.67,208.31S76.26,186.39,71.88,176.19S58.74999999999999,133.84,68.97,139.69S98.14,163,115.65,154.29C129.4,147.35,152.32,130.51999999999998,164.95,128.66C168.38,128.16,171,128.74,172.6,130.91Z"
               fill="#d1e0e0"
                  stroke="#ffffff"
                  strokeOpacity="0.6"
                  strokeWidth="1"
                  className={`transition-colors duration-200 cursor-pointer hover:fill-emerald-400 ${
                    selectedRegion === "Anuradhapura-west" ? 'fill-emerald-500' : ''
                  }`}
                  onClick={() => handleRegionClick("Anuradhapura-west")}
                  onMouseEnter={(e) => handleTooltip(e, "Anuradhapura-west")}
                  onMouseLeave={hideTooltip}
                />

               {/* Location markers - updated version */}
                      {locations.map((location) => (
                        <g
                          key={location.id}
                          onClick={() => handleLocationClick(location.id)}
                          className="cursor-pointer group"
                          transform={`translate(${location.coords.x}, ${location.coords.y})`}
                        >
                          {/* Pulse animation - fixed implementation */}
                          <circle
                            cx="9"
                            cy="14"
                            r="15"
                            className={`${getLocationColor(location.type)} opacity-40 animate-ping`}
                          />

                          {/* Realistic map pin/marker */}
                          <g className="transform translate(-15, -30) scale(1.2)">
                            {/* Pin shadow */}
                            <circle
                              cx="15"
                              cy="28"
                              r="7"
                              className="opacity-20"
                              fill="#000"
                            />
                      {/* Pin body */}
                      <path
                        d="M15 3C10.03 3 6 7.03 6 12c0 7 9 17 9 17s9-10 9-17c0-4.97-4.03-9-9-9z"
                        className={`${getLocationColor(location.type)} drop-shadow-md`}
                        fill="currentColor"
                      />
                      {/* White pin head */}
                      <circle
                        cx="15"
                        cy="12"
                        r="4"
                        className="fill-white"
                      />
                      {/* Custom SVG icon */}
                      {location.type === 'restaurant' && (
                        <svg x="11" y="8" width="8" height="8" viewBox="0 0 24 24" className="fill-current text-white">
                          <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-7 7H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4z"/>
                        </svg>
                      )}
                      {location.type === 'accommodation' && (
                        <svg x="11" y="8" width="8" height="8" viewBox="0 0 24 24" className="fill-current text-white">
                          <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                        </svg>
                      )}
                      {location.type === 'tour' && (
                        <svg x="11" y="8" width="8" height="8" viewBox="0 0 24 24" className="fill-current text-white">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      )}
                    </g>
                  </g>
                ))}
          </svg>

           {/* Region tooltip */}
              {tooltip && (
                <div
                  className="absolute bg-white text-sm px-2 py-1 rounded shadow-md z-50 pointer-events-none"
                  style={{
                    top: tooltip.y + 10,
                    left: tooltip.x + 10,
                  }}
                >
                  {tooltip.text}
                </div>
              )}

               {/* Smaller location info tooltip */}
          {selectedLocation && (
            <div
              className="absolute bg-white rounded-md shadow-md p-2 max-w-xs z-50 text-xs"
              style={{
                left: `${locations.find(l => l.id === selectedLocation)?.coords.x}px`,
                top: `${locations.find(l => l.id === selectedLocation)?.coords.y - 80}px`,
                transform: 'translateX(-50%)',
                width: '160px' // Fixed smaller width
              }}
            >
              {(() => {
                const location = locations.find(l => l.id === selectedLocation);
                return (
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-800 truncate">{location?.name}</h4>
                    <p className="text-gray-600 truncate">{location?.description}</p>
                    
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{location?.rating}/5</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span className="truncate">{location?.hours}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Phone className="w-3 h-3" />
                      <span className="truncate">{location?.phone}</span>
                    </div>

                    <button className="mt-1 w-full bg-emerald-500 text-white py-1 rounded text-xs font-medium hover:bg-emerald-600 transition-colors">
                      Directions
                    </button>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

            {/* Image Gallery Section */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Experience Gallery</h3>
                  <p className="text-sm text-gray-600">Discover the beauty of Anuradhapura</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/gallery')}
                  className="hover-scale"
                >
                  View All Gallery
                </Button>
              </div>
              
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {galleryImages.map((image, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3">
                      <div className="relative group cursor-pointer">
                        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={`${image.src}?w=400&h=300&fit=crop`}
                            alt={image.alt}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end p-3">
                            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="text-sm font-medium">{image.title}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          </div>

          {/* Sidebar - takes 1/3 of width on large screens */}
          <div className="space-y-6">
            {/* Region Information */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Regions of Anuradhapura</h3>
              <div className="space-y-3">
                {["Horowupotana", "Mihintale", "Medawachchiya", "Kekirawa", "Anuradhapura-East", "Kalawewa", "Anuradhapura-west"].map(region => (
                  <button
                    key={region}
                    onClick={() => handleRegionClick(region)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedRegion === region
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            {/* Google Maps Integration */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h4 className="font-bold text-gray-800 mb-3">Explore on Google Maps</h4>
              <p className="text-gray-600 text-sm mb-4">
                Get detailed directions and explore more locations in Anuradhapura.
              </p>
              <a
                href="https://maps.app.goo.gl/FRjAVZfC6hrLVcnv6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      </section>
    
  );
};

export default InteractiveMap;

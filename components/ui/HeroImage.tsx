
export default function HeroBanner() {

  return (
    <div className="relative w-full h-100 md:h-125 overflow-hidden bg-gray-100 select-none">
      <div
        className="w-full h-full  bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url("/mainbg.png")` }}
      />



      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-3">
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t  from-gray-100 to-transparent  pointer-events-none" />
    </div>
  );
}

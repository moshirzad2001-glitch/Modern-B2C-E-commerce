import { Store } from "lucide-react"; // Imports a perfectly clean structural icon
import Link from "next/link";

export function BrandLogo() {
  return (
    <div>
      <Link href="/"  className="inline-flex items-center gap-2 group cursor-pointer select-none">
        <div className="h-7.5 bg-olive-500 w-8   text-white flex items-center justify-center rounded-sm transition-all duration-300 group-hover:bg-[#625f20]">
          <Store className="w-4 h-4 xl:h-5 xl:w-5 stroke-[1.5]" />
        </div>

        {/* THE LOGO TEXT: Pristine monospaced typography */}
        <span className="font-mono text-sm lg:text-[16px] xl:text-lg hidden sm:inline font-semibold text-slate-500 tracking-[0.2em] uppercase transition-colors duration-200">
          SYS<span className="text-slate-300">.OBJ</span>
        </span>
      </Link>
    </div>
  );
}

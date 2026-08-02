import { Store } from "lucide-react"; // Imports a perfectly clean structural icon
import Image from "next/image";
import Link from "next/link";

export function BrandLogo() {
  return (
    <div>
      <Link href="/"  className="inline-flex items-center gap-2 group cursor-pointer select-none">
        <Image src="/icon.png" alt="Logo" width={40} height={40} />

        {/* THE LOGO TEXT: Pristine monospaced typography */}
        <span className="font-mono text-sm lg:text-[16px] xl:text-lg hidden sm:inline font-semibold text-slate-500 tracking-[0.2em] uppercase transition-colors duration-200">
          SYS<span className="text-slate-300">.OBJ</span>
        </span>
      </Link>
    </div>
  );
}

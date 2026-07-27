import { dataforhomepage } from "@/components/ui/homepagedata";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";


const page = () => {
  return (
    <div className="flex flex-col  w-full gap-4  z-10 bg-slate-200 min-h-screen ">
      <div className="absolute h-screen mt-[0.4%] inset-0 -z-10 ">
        <Image
          src="/mainbg.png"
          alt="hero Images"
          fill
          priority
          className=" pt-15 h-full object-cover sm:object-top w-full"
        ></Image>
         
      </div>
      <div className="flex w-full relative min-h-[90vh] flex-col  pt-[40vh]">
            <div className="grid grid-cols-1 lg:grid-cols-3 place-content-end place-items-center md:min-h-full w-full  pb-3 px-3 gap-4">
      {dataforhomepage.map((item, index: number) => (
        <Card
          key={index}
          className=" w-[95%]  max-h-[65vh] grid grid-rows-[10%_90%] gap-3 rounded-sm"
        >
          <CardHeader className="flex items-center text-lg lg:text-xl  font-semibold p-3">
            {item?.title}
          </CardHeader>
          <CardContent className="grid grid-cols-2 place-items-center gap-2 overflow-hidden">
            {item.links.map((link, index: number) => (
              <div
                key={index}
                className="w-full overflow-hidden items-center h-full"
              >
                <Link
                  href={`/search?category=${link.link}`}
                  className="w-full h-full flex flex-col gap-1 items-start justify-center  lg:gap-1"
                >
                  <Image
                    src={`/${link.image}`}
                    alt={`${link.link}`}
                    width={250}
                    height={100}
                  
                    fetchPriority="high"
                    className="object-cover! w-full overflow-hidden lg:h-[90%] rounded-sm"
                  />
                  <span className="capitalize text-sm lg:text-[16px] xl:text-lg">
                    {link.link}
                  </span>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
      </div>
    </div>
  );
};

export default page;

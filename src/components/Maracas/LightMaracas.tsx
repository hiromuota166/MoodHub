import Image from "next/image";

const LightMaracas = () => {
  return (
    <div className="flex justify-center items-center h-[70vh]">
        <Image
          src={"/music_maracas.webp"}
          alt="マラカスの画像"
          width={400}
          height={382}
          loading="eager"
          className="w-64"
        />
    </div>
  );
};

export default LightMaracas;

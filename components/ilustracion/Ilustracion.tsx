export default function Ilustracion() {
  return (
    <section className="w-full py-2">
      <div className="relative max-w-[1920px] mx-auto h-auto md:h-[620px] bg-none md:bg-[url('/img/bg-duck.png')] bg-center bg-no-repeat bg-cover">
        <div className="
          relative
          md:absolute 
          inset-0 
          flex flex-col items-center justify-center
          
          md:block
        ">
          <img className="w-56 h-full object-contain block md:hidden" src="/img/ducki.png" alt="duck" />

          <div className="
            w-full
            md:w-80
            px-5
            text-center md:text-left
            
            md:absolute
            md:top-1/2
            md:left-[55%]
            md:-translate-y-1/2
            
            lg:left-[58%]
            xl:left-[52%]
          ">
            
            <p className="text-sm leading-tight text-tipoclara">
              
              <span className="text-3xl text-tipo art leading-none block">
                <span className="text-5xl sm:text-6xl block">
                  Tu marca,
                </span>
                con personalidad propia
              </span>

              <span className="block mt-5">
                Diseño ilustraciones exclusivas que refuerzan la identidad y presencia de tu marca, a través de personajes únicos pensados para diferenciarte y potenciar tu comunicación visual.
              </span>

            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
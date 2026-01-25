import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative bg-black text-white h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />

      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
        }}
      />

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <h2 className="font-serif text-6xl md:text-7xl font-light mb-6 leading-tight">
          Descubra a sua{' '}
          <span className="text-gold font-normal">Essência</span>
          <br />
          Inesquecível
        </h2>

        <p className="text-gray-300 text-lg mb-10 font-light tracking-wide">
          Perfumes de luxo que contam histórias únicas
        </p>

        <Link
          to="/perfumes"
          className="inline-block bg-gold hover:bg-gold-light text-black font-semibold px-12 py-4 tracking-wider transition-all duration-300 transform hover:scale-105"
        >
          EXPLORAR COLEÇÃO
        </Link>
      </div>
    </section>
  );
}

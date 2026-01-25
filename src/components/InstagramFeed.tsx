import { Instagram } from 'lucide-react';

const images = [
  'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/8327379/pexels-photo-8327379.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/7319290/pexels-photo-7319290.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/8327331/pexels-photo-8327331.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600',
];

export default function InstagramFeed() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Instagram className="w-6 h-6 text-black" />
            <h2 className="font-serif text-4xl text-black">Siga-nos</h2>
          </div>
          <p className="text-gray-600 tracking-wider">@veron.essence</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <a
              key={index}
              href="https://instagram.com/veron.essence"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square overflow-hidden group cursor-pointer"
            >
              <img
                src={image}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

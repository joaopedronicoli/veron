import { Shield, Package, Truck } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Autenticidade Garantida',
    description: 'Produtos originais direto das melhores marcas',
  },
  {
    icon: Package,
    title: 'Embalagem Premium',
    description: 'Cada pedido é uma experiência de luxo',
  },
  {
    icon: Truck,
    title: 'Entrega Rápida',
    description: 'Envio expresso para todo o Brasil',
  },
];

export default function Differentials() {
  return (
    <section className="py-20 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border border-gold/30 rounded-full">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-2xl mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm tracking-wide leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

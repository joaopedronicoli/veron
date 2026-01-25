import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-3xl mb-2">VERON</h3>
            <p className="font-serif text-xs tracking-[0.3em] text-gray-400 mb-4">essence</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Perfumes de luxo que expressam sua identidade única.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm tracking-wider mb-4 text-gold">NAVEGAÇÃO</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Feminino</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Masculino</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kits & Presentes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm tracking-wider mb-4 text-gold">ATENDIMENTO</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Entrega</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm tracking-wider mb-4 text-gold">CONTATO</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contato@veronessence.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(11) 9999-9999</span>
              </li>
            </ul>

            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/veron.essence"
                className="hover:text-gold transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-gold transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 Veron Essence. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

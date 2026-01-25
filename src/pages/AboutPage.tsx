export default function AboutPage() {
  return (
    <section className="py-20 px-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-6xl text-black mb-6">Nossa História</h1>
          <div className="w-24 h-px bg-gold mx-auto"></div>
        </div>

        <div className="space-y-12 text-gray-700 leading-relaxed">
          <div>
            <h2 className="font-serif text-3xl text-black mb-6">A Essência de Veron</h2>
            <p className="text-lg mb-4">
              Fundada com a missão de democratizar o acesso aos perfumes mais exclusivos do mundo,
              a <span className="font-serif text-gold">Veron Essence</span> nasceu da paixão por
              fragrâncias que contam histórias.
            </p>
            <p className="text-lg">
              Cada perfume em nossa coleção é cuidadosamente selecionado por especialistas que
              entendem que uma fragrância não é apenas um acessório, mas uma extensão da sua
              personalidade e identidade.
            </p>
          </div>

          <div className="border-l-2 border-gold pl-8">
            <p className="font-serif text-2xl text-black italic mb-4">
              "Um perfume é invisível, mas inesquecível. É a marca final de estilo e sofisticação."
            </p>
          </div>

          <div>
            <h2 className="font-serif text-3xl text-black mb-6">Nosso Compromisso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-xl mb-3 text-gold">Autenticidade</h3>
                <p>
                  Trabalhamos exclusivamente com fornecedores autorizados e garantimos a
                  autenticidade de cada fragrância. Todos os nossos produtos são 100% originais.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-3 text-gold">Exclusividade</h3>
                <p>
                  Nossa curadoria seleciona perfumes de nicho e edições limitadas das maiores
                  casas de perfumaria do mundo, trazendo exclusividade para você.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-3 text-gold">Experiência Premium</h3>
                <p>
                  Cada pedido é uma experiência de luxo, desde a embalagem premium até o
                  atendimento personalizado que oferecemos aos nossos clientes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-3 text-gold">Sustentabilidade</h3>
                <p>
                  Comprometidos com práticas sustentáveis, utilizamos embalagens recicláveis
                  e apoiamos marcas que respeitam o meio ambiente.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black text-white p-12 text-center">
            <h2 className="font-serif text-4xl mb-6">A Arte da Perfumaria</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Acreditamos que escolher um perfume é uma jornada pessoal e única. Nossa equipe
              está sempre disponível para ajudá-lo a descobrir a fragrância perfeita que
              complementa sua essência.
            </p>
          </div>

          <div className="text-center pt-8">
            <p className="text-gray-600 italic">
              Veron Essence - Onde cada fragrância conta uma história única
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

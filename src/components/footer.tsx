import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import LogoApae from "../../public/logo-apae.jpg";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/apaebrasiloficial", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/apaebrasiloficial", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/apaebrasiloficial", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com/company/apae-brasil", label: "LinkedIn" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Palestras", href: "/palestras" },
  { label: "Inscricao", href: "/inscricao" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center">
                <img src={LogoApae} className="size-12 object-cover rounded-full p-1" alt="logo apae" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-background/60">Congresso Nacional 2026</span>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              O maior evento de inclusão social do Brasil. Transformando vidas por meio da educação, da saúde e da cidadania.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-background/10 hover:bg-secondary rounded-full flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 group-hover:text-secondary-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Links Rapidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-background/70 hover:text-secondary transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm text-background/70">E-mail</div>
                  <a href="mailto:contato@nebus.com.br" className="text-sm hover:text-secondary transition-colors">
                    fenapaes@apaebrasil.org.br
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm text-background/70">Telefone</div>
                  <a href="tel:+556133211234" className="text-sm hover:text-secondary transition-colors">
                    (61)3224-9922
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm text-background/70">Endereco</div>
                  <span className="text-sm">
                    SDS Venâncio IV - Cobertura - CEP: 70393-903
                    <br />
                    Brasília - Distrito Federal
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Local do Evento</h3>
            <div className="bg-background/5 rounded-xl p-5 border border-background/10">
              <div className="font-medium mb-2">Centro de Convencoes Ulysses Guimaraes</div>
              <p className="text-sm text-background/70 mb-4">
                Setor de Divulgacao Cultural
                <br />
                Brasilia - DF
              </p>
              <div className="text-sm">
                <span className="text-background/60">Data:</span>
                <br />
                <span className="font-medium">15 a 18 de Agosto, 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-background/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/60 text-center">2026 Federacao Nacional das APAEs. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

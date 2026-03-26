/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Truck, 
  Wallet, 
  GraduationCap, 
  FileText, 
  Users, 
  Clock, 
  MapPin, 
  ChevronDown, 
  Star, 
  Send,
  Phone,
  Mail,
  Info,
  Calendar,
  User
} from 'lucide-react';

// --- Types ---

interface FAQItem {
  question: string;
  answer: string;
}

interface Testimonial {
  name: string;
  text: string;
}

// --- Data ---

const VORTEILE = [
  {
    title: "Sicheres Einkommen",
    description: "Sie bekommen pünktlich Ihr festes Gehalt. Das gibt Ihnen und Ihrer Familie finanzielle Sicherheit.",
    icon: Wallet
  },
  {
    title: "Moderne Fahrzeuge",
    description: "Sie fahren neue und sichere Lieferwagen. So macht die Arbeit Spaß und ist komfortabel.",
    icon: Truck
  },
  {
    title: "Bezahlte Einarbeitung",
    description: "Sie brauchen keine Erfahrung für diesen Lieferfahrer Job. Wir zeigen Ihnen alles in Ruhe.",
    icon: GraduationCap
  },
  {
    title: "Unbefristeter Vertrag möglich",
    description: "Wir suchen Kollegen für eine lange Zusammenarbeit. Sie bekommen eine stabile Perspektive.",
    icon: FileText
  },
  {
    title: "Selbstständige Arbeit",
    description: "Sie sind auf Ihrer Route Ihr eigener Chef. Sie arbeiten frei, unabhängig und hören Ihre eigene Musik.",
    icon: User
  },
  {
    title: "Tolles Team",
    description: "Wir helfen uns gegenseitig. Bei Fragen oder Problemen ist immer ein Kollege für Sie da.",
    icon: Users
  }
];

const ABLAUF = [
  { step: 1, title: "Formular ausfüllen", text: "Beantworten Sie ein paar kurze Fragen online. Das dauert nur 2 Minuten. Kein Anschreiben nötig!" },
  { step: 2, title: "Telefonisches Gespräch", text: "Wir rufen Sie an, um offene Fragen zu klären. Ganz entspannt und freundlich." },
  { step: 3, title: "Kurzes Kennenlernen", text: "Wir treffen uns auf einen Kaffee im Büro. Sie lernen uns kennen." },
  { step: 4, title: "Arbeitsbeginn", text: "Sie unterschreiben Ihren Vertrag und starten Ihre bezahlte Schulung!" }
];

const TESTIMONIALS: Testimonial[] = [
  { name: "Ali M.", text: "\"Ich arbeite seit einem Jahr hier. Das Team ist super nett und das Geld kommt immer pünktlich. Die Einarbeitung war sehr einfach.\"" },
  { name: "Thomas K.", text: "\"Früher hatte ich viel Stress. Jetzt bin ich oft für mich allein unterwegs, das mag ich. Das Auto ist modern und fährt sich super.\"" },
  { name: "Maria S.", text: "\"Ich bin Quereinsteigerin und hatte erst Angst. Aber die Kollegen haben mir alles genau gezeigt. Es ist ein wirklich sicherer Job.\"" }
];

const FAQS: FAQItem[] = [
  { question: "Brauche ich Erfahrung?", answer: "Nein. Wir bringen Ihnen in einer bezahlten Schulung alles bei, was Sie wissen müssen." },
  { question: "Bekomme ich eine Schulung?", answer: "Ja. Bevor Sie alleine fahren, gibt es ein komplettes Training mit erfahrenen Kollegen." },
  { question: "Wie viele Stunden pro Woche arbeite ich?", answer: "In Vollzeit arbeiten Sie meistens 40 Stunden in einer 5-Tage-Woche." },
  { question: "Kann ich auch in Teilzeit arbeiten?", answer: "Ja, wir bieten auch Teilzeit- und Minijob-Modelle an. Sagen Sie uns einfach, was Sie suchen." },
  { question: "Wann kann ich anfangen?", answer: "Ein sofortiger Start ist oft möglich. Wir richten uns gerne nach Ihnen." },
  { question: "Brauche ich ein eigenes Auto für die Arbeit?", answer: "Nein. Wir stellen Ihnen einen modernen Lieferwagen für die Arbeit zur Verfügung." },
  { question: "Ist der Job körperlich schwer?", answer: "Sie bewegen sich viel und tragen Pakete. Eine normale körperliche Fitness reicht dafür völlig aus." },
  { question: "Wie schnell bekomme ich eine Antwort auf meine Bewerbung?", answer: "Sehr schnell! Wir rufen Sie innerhalb von 24 Stunden an." },
  { question: "Ist der Job langfristig?", answer: "Ja. Wir suchen zuverlässige Kollegen, die lange bei uns bleiben möchten." },
  { question: "Gibt es feste Routen?", answer: "Ja, das System plant die besten Routen für Sie. Sie kennen Ihr Gebiet nach kurzer Zeit sehr gut." }
];

// --- Components ---

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hexagon Background */}
    <path 
      d="M50 5L89.5 27.5V72.5L50 95L10.5 72.5V27.5L50 5Z" 
      stroke="currentColor" 
      strokeWidth="4" 
      className="text-logo-grey opacity-30"
    />
    <path 
      d="M50 12L83.5 31.5V68.5L50 88L16.5 68.5V31.5L50 12Z" 
      stroke="currentColor" 
      strokeWidth="6" 
      className="text-logo-blue"
    />
    
    {/* Route Path */}
    <path 
      d="M30 65C30 65 40 65 50 50C60 35 70 35 70 35" 
      stroke="currentColor" 
      strokeWidth="5" 
      strokeLinecap="round"
      className="text-slate-800"
    />
    
    {/* Pins */}
    <g className="text-logo-blue">
      <circle cx="30" cy="65" r="8" fill="white" stroke="currentColor" strokeWidth="3" />
      <path d="M27 65H33M30 62V68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
    
    <g className="text-logo-blue">
      <circle cx="70" cy="35" r="8" fill="white" stroke="currentColor" strokeWidth="3" />
      <rect x="67" y="32" width="6" height="6" fill="currentColor" rx="1" />
    </g>
  </svg>
);

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
    {subtitle && <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const FAQAccordion = ({ item }: { item: FAQItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left hover:text-primary transition-colors focus:outline-none"
      >
        <span className="font-semibold text-lg">{item.question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-600 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const scrollToForm = () => {
    document.getElementById('bewerbung')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="w-12 h-12" />
            <div className="flex flex-col leading-none">
              <span className="font-black text-xl tracking-tighter text-slate-900 uppercase">Riemeyer</span>
              <span className="font-bold text-sm tracking-[0.2em] text-primary uppercase">Logistik</span>
            </div>
          </div>
          <button 
            onClick={scrollToForm}
            className="hidden md:block bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Jetzt bewerben
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=2000" 
            alt="Logistik Hintergrund" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>

        <div className="section-padding relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-bold text-sm mb-6 border border-accent/20">
                <CheckCircle2 className="w-4 h-4" />
                Offizieller Amazon Delivery Service Partner
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
                Sicherer Job. <br />
                <span className="text-primary">Gutes Gehalt.</span> <br />
                Werden Sie Amazon Fahrer!
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                Starten Sie Ihre neue Karriere bei Riemeyer Logistik – Ihrem verlässlichen Amazon Partner. 
                Ein fester Arbeitsplatz wartet auf Sie. Ein sofortiger Start ist möglich!
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button 
                  onClick={scrollToForm}
                  className="bg-primary text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-xl shadow-primary/30"
                >
                  Jetzt in 2 Minuten bewerben
                </button>
                <div className="text-sm text-slate-500 font-medium">
                  <p>Keine Erfahrung nötig.</p>
                  <p>Wir melden uns innerhalb von 24 Stunden.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* 2. VORTEILE */}
      <section className="bg-white">
        <div className="section-padding">
          <SectionHeading title="Ihre Vorteile bei uns" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VORTEILE.map((vorteil, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                  <vorteil.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{vorteil.title}</h3>
                <p className="text-slate-600 leading-relaxed">{vorteil.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. JOBBESCHREIBUNG & 4. ANFORDERUNGEN */}
      <section className="bg-slate-900 text-white overflow-hidden">
        <div className="section-padding grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Ihr Alltag als Kurierfahrer</h2>
            <div className="space-y-8">
              {[
                { title: "Morgens", text: "Sie laden Ihr Fahrzeug im Depot. Die Pakete sind für Sie schon vorsortiert.", icon: Clock },
                { title: "Die Fahrt", text: "Sie fahren Ihre Route. Eine moderne Navigations-App auf dem Smartphone leitet Sie genau zum Ziel.", icon: MapPin },
                { title: "Die Lieferung", text: "Sie übergeben die Pakete an freundliche Kunden.", icon: CheckCircle2 },
                { title: "Bewegung", text: "Sie bewegen sich viel an der frischen Luft. Das hält fit und gesund.", icon: User },
                { title: "Feierabend", text: "Nach der Tour bringen Sie das Auto zurück ins Depot. Der Arbeitstag ist geschafft!", icon: Calendar }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-slate-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold mb-8">Das bringen Sie mit</h2>
            <p className="text-slate-400 mb-8">Um bei uns als Amazon Fahrer Job zu starten, brauchen Sie keinen Universitätsabschluss. Das Wichtigste für uns ist:</p>
            <ul className="space-y-6">
              {[
                "Führerschein der Klasse B (PKW).",
                "Zuverlässigkeit und Pünktlichkeit.",
                "Grundkenntnisse in Deutsch (Level B1).",
                "Körperliche Fitness für den Arbeitsalltag.",
                "Ein freundlicher Umgang mit Menschen."
              ].map((req, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                  <span className="text-lg">{req}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 5. WARUM RIEMEYER LOGISTIK */}
      <section className="bg-white">
        <div className="section-padding text-center max-w-4xl">
          <SectionHeading title="Warum Riemeyer Logistik Ihr bester Arbeitgeber ist" />
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            Wir wissen: Unsere Fahrer sind unser wichtigster Erfolg. Als offizieller Amazon Partner bieten wir Ihnen nicht nur einen Job, sondern Stabilität. 
            Bei uns gibt es klare Regeln und eine faire Bezahlung. Wir sprechen immer mit Respekt miteinander. 
            Ihre Schichten sind gut geplant, damit Sie Zeit für Ihr Privatleben haben. 
            Wenn Sie einen langfristigen Zusteller Job suchen, sind Sie in unserem Team genau richtig. Wir lassen Sie nicht allein!
          </p>
          <div className="flex justify-center gap-4">
            <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 font-semibold text-primary">Faire Bezahlung</div>
            <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 font-semibold text-primary">Respektvoller Umgang</div>
            <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 font-semibold text-primary">Planbare Schichten</div>
          </div>
        </div>
      </section>

      {/* 6. ABLAUF */}
      <section className="bg-slate-50">
        <div className="section-padding">
          <SectionHeading title="In 4 einfachen Schritten zum neuen Job" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ABLAUF.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.text}</p>
                </div>
                {idx < ABLAUF.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-slate-300 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GEHALT & BEDINGUNGEN */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="bg-primary rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Das bieten wir Ihnen</h2>
                <p className="text-white/80 text-lg mb-10">Wir spielen mit offenen Karten. Das können Sie von Ihrer Kurierfahrer Stelle erwarten:</p>
                <div className="space-y-6">
                  {[
                    { label: "Gehalt", value: "Fester, fairer Stundenlohn (15,70 € brutto) plus mögliche Boni." },
                    { label: "Arbeitszeit", value: "5-Tage-Woche (Vollzeit, ca. 40 Stunden). Teilzeit und Minijob sind ebenfalls möglich." },
                    { label: "Urlaub", value: "24 bis 28 Tage bezahlter Urlaub im Jahr." },
                    { label: "Bonus", value: "Mögliche steuerfreie Zuschläge bei guter Leistung." },
                    { label: "Vertrag", value: "Start mit einem befristeten Vertrag. Bei guter Arbeit Übernahme in einen unbefristeten Vertrag." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-accent block mb-1">{item.label}</span>
                        <span className="text-white/90">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="text-center mb-8">
                  <div className="text-accent font-bold text-lg mb-2 uppercase tracking-wider">Top Angebot</div>
                  <div className="text-5xl font-bold">~ 2.700 €</div>
                  <div className="text-white/60 mt-2">Brutto / Monat (Vollzeit)</div>
                </div>
                <button 
                  onClick={scrollToForm}
                  className="w-full bg-white text-primary py-4 rounded-2xl font-bold text-lg hover:bg-accent hover:text-white transition-all shadow-xl"
                >
                  Jetzt bewerben
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="bg-slate-50">
        <div className="section-padding">
          <SectionHeading title="Das sagen unsere Fahrer" />
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}
                </div>
                <p className="text-slate-600 italic mb-8 flex-grow">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                    {t.name[0]}
                  </div>
                  <span className="font-bold text-slate-900">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="bg-white">
        <div className="section-padding max-w-4xl">
          <SectionHeading title="Häufige Fragen (FAQ)" />
          <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100">
            {FAQS.map((faq, idx) => (
              <FAQAccordion key={idx} item={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. BEWERBUNGSFORMULAR */}
      <section id="bewerbung" className="bg-slate-900 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Vielen Dank!</h2>
                <p className="text-slate-600 text-lg mb-8">
                  Ihre Bewerbung ist bei uns eingegangen. <br />
                  Wir rufen Sie innerhalb der nächsten 24 Stunden an.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="text-primary font-semibold hover:underline"
                >
                  Noch eine Bewerbung senden
                </button>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Starten Sie jetzt Ihre Bewerbung</h2>
                  <p className="text-lg text-slate-600">Füllen Sie einfach das kurze Formular aus. Es dauert nur 2 Minuten!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Vorname *</label>
                      <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Max" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Nachname *</label>
                      <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Mustermann" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Telefonnummer *</label>
                      <input required type="tel" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="0123 456789" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">E-Mail-Adresse *</label>
                      <input required type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="max@beispiel.de" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Stadt / Wohnort *</label>
                    <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Berlin" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Führerschein Klasse B? *</label>
                      <select required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                        <option value="">Bitte wählen...</option>
                        <option value="ja">Ja</option>
                        <option value="nein">Nein</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Arbeitsmodell</label>
                      <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                        <option value="vollzeit">Vollzeit</option>
                        <option value="teilzeit">Teilzeit</option>
                        <option value="minijob">Minijob</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Wann können Sie anfangen?</label>
                    <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Ab sofort / Datum" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Ihre Nachricht an uns (Optional)</label>
                    <textarea rows={3} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Möchten Sie uns noch etwas sagen?"></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3"
                  >
                    <Send className="w-6 h-6" />
                    Schnell bewerben
                  </button>
                  
                  <p className="text-center text-sm text-slate-500">
                    Wir melden uns innerhalb von 24 Stunden. Ihre Daten sind bei uns sicher.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="bg-white py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Bereit für Ihren neuen Job?</h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Warten Sie nicht länger. Ein sicherer Job, ein nettes Team und ein gutes Gehalt warten auf Sie. 
            Der Prozess ist ganz leicht. Wir freuen uns auf Sie!
          </p>
          <button 
            onClick={scrollToForm}
            className="bg-primary text-white px-10 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-2xl shadow-primary/40"
          >
            Jetzt bewerben
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="section-padding flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <div className="flex flex-col leading-none">
              <span className="font-black text-lg tracking-tighter text-slate-900 uppercase">Riemeyer</span>
              <span className="font-bold text-xs tracking-[0.2em] text-primary uppercase">Logistik</span>
            </div>
          </div>
          <div className="flex gap-8 text-slate-500 text-sm font-medium">
            <a href="#" className="hover:text-primary transition-colors">Impressum</a>
            <a href="#" className="hover:text-primary transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-primary transition-colors">Kontakt</a>
          </div>
          <p className="text-slate-400 text-sm">© 2026 Riemeyer Logistik. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}

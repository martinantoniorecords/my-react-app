// App.tsx
import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import Promo from './promo'; // Assuming you have a Promo.js or Promo.tsx

// Initialize Supabase client
const supabase = createClient(
  'https://sneynasuzdckcnimehdd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZXluYXN1emRja2NuaW1laGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NjIxMzksImV4cCI6MjA2MTIzODEzOX0.4JZ_zHLCV2fJs872P5PB-9h0ZGFgLsXdksIajkrPrKU'
);

// Contact Form Page
function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const message = formData.get('message')?.toString() || '';

    const { error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, message }]);

    if (error) {
      console.error(error);
      setStatus('error');
    } else {
      setStatus('sent');
      form.reset();
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto', padding: '1rem' }}>
      <h2>Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" required className="w-full p-2 border rounded" />
        <input name="email" type="email" placeholder="Email" required className="w-full p-2 border rounded" />
        <textarea name="message" placeholder="Message" required className="w-full p-2 border rounded" />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'sent' && <p className="text-green-500">Message sent! 🚀</p>}
        {status === 'error' && <p className="text-red-500">Error sending message. Try again.</p>}
      </form>
    </div>
  );
}

// Payment page component
function PaymentPage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Payment Page</h2>
      <p>Make your payment here.</p>
    </div>
  );
}

// Main App Component
export default function App() {
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://www.paypal.com/sdk/js?client-id=BAAVYiC-srs0QQ7eQzFSPWsDfdJxKxthYO920jVotBhncf-yHaoRwrA_AOdHpsvzPCvCzWsQxa6UzGm5gA&components=hosted-buttons&disable-funding=venmo&currency=EUR';
    script.async = true;
    script.onload = () => {
      if ((window as any).paypal) {
        (window as any).paypal.HostedButtons({ hostedButtonId: 'LK4XLSFGRWDG2' })
          .render('#paypal-container');
      }
    };
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <Router>
      <div style={container}>
        <div style={missionSection}>
          <h2>Our Mission</h2>
          <p>We design AI-powered solutions that help businesses automate processes, optimize workflows, and deliver smarter outcomes.</p>
        </div>

        {services.map(([emoji, hueA, hueB, service, description], i) => (
          <Card key={i} i={i} emoji={emoji} hueA={hueA} hueB={hueB} service={service} description={description} />
        ))}

        <button onClick={() => setShowPayment(true)} style={showPaymentButtonStyle}>
          Show Payment Page
        </button>
        {showPayment && (
          <div style={paymentPageContainerStyle}>
            <Link to="/payment">Go to Payment Page</Link>
          </div>
        )}

        <Routes>
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/Promo" element={<Promo />} />
        </Routes>

        <div id="paypal-container" style={{ marginTop: 80, textAlign: 'center' }} />

        <div style={{ textAlign: 'center', marginTop: 120 }}>
          <a href="mailto:info@martitony.com" style={{ margin: '0 1rem', color: '#0070f3' }}>Contact</a>
        </div>
      </div>
    </Router>
  );
}

// Card Component & Helpers
interface CardProps {
  emoji: string;
  hueA: number;
  hueB: number;
  i: number;
  service: string;
  description: string | React.JSX.Element;
}

function Card({ emoji, hueA, hueB, i, service, description }: CardProps) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;
  return (
    <motion.div className={`card-container-${i}`} style={cardContainer} initial="offscreen" whileInView="onscreen" viewport={{ amount: 0.8 }}>
      <div style={{ ...splash, background }} />
      <motion.div style={card} variants={cardVariants} className="card">
        <div style={emojiStyle}>{emoji}</div>
        <div style={textStyle}>
          <h3>{service}</h3>
          <p>{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const cardVariants: Variants = {
  offscreen: { y: 300 },
  onscreen: { y: 50, rotate: -10, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
};

const hue = (h: number) => `hsl(${h},100%,50%)`;
const container = { margin: "100px auto", maxWidth: 500, paddingBottom: 150, width: "100%" } as const;
const missionSection = { textAlign: "center", marginBottom: 40, padding: "0 20px", color: "#333" } as const;
const cardContainer = { overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", paddingTop: 20, marginBottom: -120 } as const;
const splash = { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")` } as const;
const card = { fontSize: 164, width: 300, height: 430, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, background: "#f5f5f5", boxShadow: "0 0 1px hsl(0deg0%0%/0.075),0 0 2px hsl(0deg0%0%/0.075),0 0 4px hsl(0deg0%0%/0.075),0 0 8px hsl(0deg0%0%/0.075),0 0 16px hsl(0deg0%0%/0.075)", transformOrigin: "10% 60%" } as const;
const emojiStyle = { fontSize: "100px", marginBottom: "20px" } as const;
const textStyle = { textAlign: "center", color: "#333", fontSize: "14px", fontWeight: "bold" } as const;
const showPaymentButtonStyle = { padding: "10px 20px", marginTop: "20px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" } as const;
const paymentPageContainerStyle = { marginTop: "100px", display: "flex", justifyContent: "center" } as const;

// Updated services array
const services: [string, number, number, string, string | React.JSX.Element][] = [
  [
    "🍅",
    340,
    10,
    "Book a Demo",
    <a href="mailto:info@martitony.com">
      <button style={{ background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer' }}>
        Book a Demo
      </button>
    </a>
  ],
  ["🍊", 20, 40, "Web Design", "We create modern, user-friendly websites optimized for engagement and conversions."],
  ["🎬", 60, 90, "Video Production", "High-quality video content to bring your AI solutions to life."],
  ["🍋", 60, 90, "Digital Marketing", "Targeted online campaigns that convert leads into customers."],
  ["🎶", 100, 200, "Print Marketing", "Creative print assets like brochures, posters, and flyers to make a lasting impression."],
  ["🍇", 290, 320, "Branding & Merch", "Designing unique branding and merchandise for tech and AI projects."],
  ["🍐", 80, 120, "Event Planning", "Organizing conferences, workshops, and product launch events."],
];
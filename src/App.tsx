// App.tsx
import React, { useState } from "react";
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

// AI Solutions Project Page
function AIProjectsPage() {
  return (
    <div>
      <h2>AI Solutions</h2>
      <h1>Empower Your Business with Intelligent Automation</h1>

      <p>🎯 <strong>What we offer:</strong></p>
      <p>
        We build AI agents, automate complex workflows, and integrate smart solutions into your business ecosystem.
        From data verification to process orchestration, we provide scalable, reliable AI systems.
      </p>
    </div>
  );
}

// Main App Component
export default function App() {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <Router>
      <div style={container}>
        <div style={missionSection}>
          <h2>Our Mission</h2>
          <p>
            Our mission is to design intelligent AI solutions that automate workflows, connect systems, and drive business impact.
            We create autonomous agents and scalable architectures that allow companies to save time, reduce errors, and unlock new opportunities.
          </p>
        </div>

        {services.map(([emoji, hueA, hueB, service, description], i) => (
          <Card key={i} i={i} emoji={emoji} hueA={hueA} hueB={hueB} service={service} description={description} />
        ))}

        <Routes>
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/ai-projects" element={<AIProjectsPage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/Promo" element={<Promo />} />
        </Routes>

        <div style={{ textAlign: 'center', marginTop: 120 }}>
          <a href="mailto:info@martitony.com" style={{ margin: '0 1rem', color: '#0070f3' }}>Contact</a>
        </div>
      </div>
    </Router>
  );
}

// Card Component
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

// Variants and Styles
const cardVariants: Variants = {
  offscreen: { y: 300 },
  onscreen: { y: 50, rotate: -10, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
};

const hue = (h: number) => `hsl(${h},100%,50%)`;
const container = { margin: "100px auto", maxWidth: 500, paddingBottom: 150, width: "100%" } as const;
const missionSection = { textAlign: "center", marginBottom: 40, padding: "0 20px", color: "#333" } as const;
const cardContainer = { overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", paddingTop: 20, marginBottom: -120 } as const;
const splash = { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } as const;
const card = { fontSize: 164, width: 300, height: 430, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, background: "#f5f5f5", transformOrigin: "10% 60%" } as const;
const emojiStyle = { fontSize: "100px", marginBottom: "20px" } as const;
const textStyle = { textAlign: "center", color: "#333", fontSize: "14px", fontWeight: "bold" } as const;

// AI Services
const services: [string, number, number, string, string | React.JSX.Element][] = [
  ["🤖", 340, 10, "AI Agents", "Custom AI agents to automate business workflows."],
  ["💻", 20, 40, "System Integration", "Connect apps and systems with smart automation."],
  ["📊", 60, 90, "Data Analytics", "AI-driven insights and predictive models."],
  ["⚙️", 60, 90, "Workflow Automation", "Streamline repetitive processes using AI."],
  ["🔐", 100, 200, "Security & Compliance", "Implement solutions respecting privacy and policies."],
  ["🌐", 290, 320, "Cloud & Deployment", "Deploy scalable AI systems on cloud platforms."],
  ["📈", 80, 120, "Business Optimization", "Optimize operations and resource allocation."],
  ["🧑‍💼", 0, 330, "Consulting & Training", <Link to="/ai-projects">Guidance and hands-on training for your team.</Link>],
];
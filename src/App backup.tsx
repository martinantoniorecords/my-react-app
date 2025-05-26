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
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Your name" required className="w-full p-2 border rounded" />
        <input name="email" type="email" placeholder="Your email" required className="w-full p-2 border rounded" />
        <textarea name="message" placeholder="Your message" required className="w-full p-2 border rounded" />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'sent' && <p className="text-green-500">Message sent! 🚀</p>}
        {status === 'error' && <p className="text-red-500">Error sending. Try again.</p>}
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

// Singing Lessons Page
function SingingLessonsPage() {
  return (
    <div>
      <h2>Singing Lessons</h2>
      <p><h1>Уроци по пеене – Разкрийте своята истинска вокална сила!</h1>

<p>🎤 <strong>Какво предлагаме?</strong></p>
<p>Ние предлагаме индивидуални и групови уроци по пеене за начинаещи и напреднали певци. Независимо дали искате да подобрите техниката си, да изградите сценично присъствие или да развиете музикалния си слух, нашите уроци ще ви помогнат да постигнете целите си.</p>

<p>🔑 <strong>Какво ще научите?</strong></p>
<ul>
  <li>Основи на вокалната техника: правилно дишане, контрол на гласа и развитие на диапазона.</li>
  <li>Музикален слух и интонация: как да разпознавате и изпълнявате нотите безпогрешно.</li>
  <li>Сценично поведение: как да излъчвате увереност и да се свързвате с публиката.</li>
  <li>Персонализиран подход: уроците са напълно адаптирани към вашето ниво и стил.</li>
</ul>

<p>🌟 <strong>За кого са подходящи?</strong></p>
<ul>
  <li>За начинаещи, които искат да започнат да пеят.</li>
  <li>За напреднали певци, които искат да усъвършенстват своите умения.</li>
  <li>За любители на музиката, които търсят начини да се изразяват по най-добрия начин.</li>
</ul>

<p>🚀 <strong>Защо да изберете нас?</strong></p>
<p>Нашите уроци не само ще ви помогнат да развиете вокалните си способности, но ще ви вдъхновят да се изразявате през музиката. Възможността за индивидуални уроци гарантира, че всеки ученик получава нужното внимание и подкрепа, за да напредва бързо и ефективно.</p>
</p>
      {/* Add additional details or links for signing up for lessons here */}
    </div>
  );
}

// Songs Page
function SongsPage() {
  return (
    <div>
      <h2>Songs Creation</h2>
      <h1>Unleash Your Emotions with Custom Music!</h1>

      <p>🎶 <strong>What we offer?</strong></p>
      <p>We create personalized songs tailored to your emotions, stories, and experiences. Whether it's for a special occasion, a personal project, or simply expressing yourself through music, we craft songs that speak to the heart.</p>

      <p>🔑 <strong>What you'll get?</strong></p>
      <ul>
        <li>Custom lyrics and melodies: Tailored to your unique message or emotion.</li>
        <li>High-quality production: From raw ideas to fully produced tracks, we ensure the best quality.</li>
        <li>Collaborative process: Work closely with us to shape the song in a way that truly reflects you.</li>
        <li>Professional mixing and mastering: Giving your song a polished and radio-ready sound.</li>
      </ul>

      <p>🌟 <strong>Who is it for?</strong></p>
      <ul>
        <li>For individuals looking to immortalize their stories and feelings in a song.</li>
        <li>For artists seeking custom tracks that align with their vision.</li>
        <li>For anyone who wants to have a unique and personal musical experience.</li>
      </ul>

      <p>🚀 <strong>Why choose us?</strong></p>
      <p>Our music creation process not only ensures that your song is crafted with precision and care, but also that it truly resonates with you. With our personalized approach, we guarantee that your song will be one-of-a-kind and will leave a lasting impact on your audience.</p>

      {/* Add additional details or links for signing up for song creation here */}
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
        (window as any).paypal.HostedButtons({ hostedButtonId: 'YWAHX2FAPX7PA' })
          .render('#paypal-container');
      }
    };
    document.head.appendChild(script);

    // Cleanup script without returning its node
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Router>
      <div style={container}>
        <div style={missionSection}>
          <h2>Our Mission</h2>
          <p>This is not a service. This is a movement. We give upcoming artists access to clean,
            cinematic promo and visuals — without watering down their style or draining their budget.</p>
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
          <Route path="/singing-lessons" element={<SingingLessonsPage />} />
          <Route path="/SongsPage" element={<SongsPage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/Promo" element={<Promo />} />
        </Routes>

        <div id="paypal-container" style={{ marginTop: 80, textAlign: 'center' }} />

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/contact" style={{ margin: '0 1rem' }}>Contact</Link>
         
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
         {/* <Link to="/Promo" style={{ margin: '0 1rem' }}>More promo options</Link> */}

         
        </div>



        <div style={{ textAlign: 'center', marginTop: 20, color: '#444' }}>
          <p>📱 <a href="tel:+359876381932">+359 87 638 1932</a></p>
          <p>📸 <a href="https://instagram.com/martinantoniorecords" target="_blank" rel="noopener noreferrer">@martinantoniorecords</a></p>
          <p>▶️ <a href="https://youtube.com/@martinantoniorecords" target="_blank" rel="noopener noreferrer">youtube.com/@martinantoniorecords</a></p>
        </div>

        <div style={{ textAlign: 'center', fontSize: 10, color: '#777', marginTop: 40, paddingBottom: 30 }}>
          By sending this payment you are agreeing to the terms and conditions of this website and of YouTube.
        </div>
      </div>
    </Router>
  );
}

// Card Component & Helpers (unchanged)
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

const services: [string, number, number, string, string | React.JSX.Element][] = [
  [
    "🍅",
    340,
    10,
    "Music Production",
    <Link to="/SongsPage">
    <>
      
      <button
        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
        style={{ background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer' }}
      >
        We create high-quality music tracks, from concept to final mix.
      </button>
    </>,
    </Link>
  ],
  ["🍊", 20, 40, "Artist Development", "Helping artists find their sound and build their brand."],
  ["🎬", 60, 90, "Music Videos", "Cinematic visuals to bring your music to life with stunning visuals."],
  [
    "🍋",
    60,
    90,
    "Music Promotion",
    <>
      
      <button
        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
        style={{ background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer' }}
      >
        Promoting music through strategic marketing and media placements.
      </button>
    </>,
  ],
  ["🎶", 100, 200, "Remixes", "Giving new life to your tracks with fresh remixes."],
  ["🍇", 290, 320, "Branding & Merch", "Designing unique branding and merchandise for artists."],
  ["🍐", 80, 120, "Event Management", "Organizing concerts, live shows, and music events."],
  [
    "🎤",
    0,
    330,
    "Singing Lessons",
    <Link to="/singing-lessons">Private & group vocal coaching for artists at every level</Link>,
  ],
];

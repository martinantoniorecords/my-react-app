import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// Payment page component
function PaymentPage() {
  return (
    <div>
      <h2>Payment Page</h2>
      <p>Make your payment here.</p>
      {/* You can embed more payment options or forms here if necessary */}
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

// Main Component
export default function App() {
  const [showPayment, setShowPayment] = useState(false); // State to control payment visibility

  // Load the PayPal SDK script once, and render the PayPal button after the page loads
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=BAAVYiC-srs0QQ7eQzFSPWsDfdJxKxthYO920jVotBhncf-yHaoRwrA_AOdHpsvzPCvCzWsQxa6UzGm5gA&components=hosted-buttons&disable-funding=venmo&currency=EUR";
    script.crossOrigin = "anonymous";
    script.async = true;

    script.onload = () => {
      if (window.paypal) {
        window.paypal.HostedButtons({
          hostedButtonId: "YWAHX2FAPX7PA",
        }).render("#paypal-container-YWAHX2FAPX7PA");
      }
    };

    document.head.appendChild(script);

    return () => {
      // Clean up if needed
      document.head.removeChild(script);
    };
  }, []);

  // Function to handle button click to show payment page
  const handleShowPayment = () => {
    setShowPayment(true); // Show the payment page when triggered
  };

  return (
    <Router>
      <div style={container}>
        {/* MISSION SECTION */}
        <div style={missionSection}>
          <h2>Our Mission</h2>
          <p>
            This is not a service. This is a movement. We give upcoming artists access to clean,
            cinematic promo and visuals — without watering down their style or draining their budget.
          </p>
          <p>
            We offer community-tier pricing. No charity. No cookie-cutter. Every project is built
            from scratch for artists with a voice.
          </p>
        </div>

        {/* SERVICES SECTION */}
        {services.map(([emoji, hueA, hueB, service, description], i) => (
          <Card
            key={i}
            i={i}
            emoji={emoji}
            hueA={hueA}
            hueB={hueB}
            service={service}
            description={description}
          />
        ))}

        {/* Button to trigger the payment page */}
        <button onClick={handleShowPayment} style={showPaymentButtonStyle}>
          Show Payment Page
        </button>

        {/* NEW PAYMENT CONTAINER (Conditional Rendering) */}
        {showPayment && (
          <div style={paymentPageContainerStyle}>
            <Link to="/payment">Go to Payment Page</Link>
          </div>
        )}

        {/* React Router Setup */}
        <Routes>
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/singing-lessons" element={<SingingLessonsPage />} />
        </Routes>

        {/* PayPal Button Container */}
        <div
          id="paypal-container-YWAHX2FAPX7PA"
          style={{ marginTop: "100px", textAlign: "center" }}
        ></div>

        <style>{`
          .glow-on-hover:hover {
            box-shadow: 0 0 12px rgba(0, 255, 255, 0.6),
                        0 0 24px rgba(0, 255, 255, 0.5),
                        0 0 48px rgba(0, 255, 255, 0.3);
          }
          a {
            color: #00aaff;
            text-decoration: underline;
          }
          a:hover {
            color: #0077cc;
          }
        `}</style>

        <div style={{ textAlign: "center", marginTop: 20, color: "#444" }}>
          <p>
            📱 <strong>Phone:</strong> <a href="tel:+359 87 638 1932">+359 87 638 1932</a>
          </p>
          <p>
            📸 <strong>Instagram:</strong>{" "}
            <a href="https://instagram.com/martinantoniorecords" target="_blank" rel="noopener noreferrer">
              @martinantoniorecords
            </a>
          </p>
          <p>
            ▶️ <strong>YouTube:</strong>{" "}
            <a href="https://youtube.com/@martinantoniorecords" target="_blank" rel="noopener noreferrer">
              youtube.com/@martinantoniorecords
            </a>
          </p>
        </div>
      </div>
    </Router>
  );
}

/* ========== Card Component ========== */
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
    <motion.div
      className={`card-container-${i}`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
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

/* ========== Framer Motion Variants ========== */

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

/* ========== Styles ========== */

const container: React.CSSProperties = {
  margin: "100px auto",
  maxWidth: 500,
  paddingBottom: 150,
  width: "100%",
};

const missionSection: React.CSSProperties = {
  textAlign: "center",
  marginBottom: 40,
  padding: "0 20px",
  color: "#333",
};

const cardContainer: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  marginBottom: -120,
};

const splash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
};

const card: React.CSSProperties = {
  fontSize: 164,
  width: 300,
  height: 430,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  background: "#f5f5f5",
  boxShadow:
    "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "10% 60%",
};

const emojiStyle: React.CSSProperties = {
  fontSize: "100px",
  marginBottom: "20px",
};

const textStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#333",
  fontSize: "14px",
  fontWeight: "bold",
};

const paymentPageContainerStyle: React.CSSProperties = {
  marginTop: "100px",
  display: "flex",
  justifyContent: "center",
};

const showPaymentButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  marginTop: "20px",
  backgroundColor: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "center",
};

/* ========== Services Data ========== */

const services: [string, number, number, string, string | React.JSX.Element][] = [
  ["🍅", 340, 10, "Music Production", "We create high-quality music tracks, from concept to final mix."],
  ["🍊", 20, 40, "Artist Development", "Helping artists find their sound and build their brand."],
  [
    "🎬",
    60,
    90,
    "Music Videos",
    "Cinematic visuals to bring your music to life with stunning visuals.",
  ],
   [
    "🍋",
    60,
    90,
    "Music Promotion",
      <button
    onClick={() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth', // Smooth scroll to the bottom
      });
    }}
    style={{ color: "#0070f3", background: "none", border: "none", cursor: "pointer" }}
  >
    Promoting music through strategic marketing and media placements.
  </button>
  ],
  ["🎶", 100, 200, "Remixes", "Giving new life to your tracks with fresh remixes."],
  ["🍇", 290, 320, "Branding & Merch", "Designing unique branding and merchandise for artists."],
  ["🍐", 80, 120, "Event Management", "Organizing concerts, live shows, and music events."],
  ["🎤", 0, 330, "Singing Lessons", <Link to="/singing-lessons">Private & group vocal coaching for artists at every level</Link>],
];

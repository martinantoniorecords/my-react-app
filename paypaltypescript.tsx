import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

declare global {
  interface Window {
    paypal: any;
  }
}

const PayPalButton = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://www.paypal.com/sdk/js?client-id=BAAVYiC-srs0QQ7eQzFSPWsDfdJxKxthYO920jVotBhncf-yHaoRwrA_AOdHpsvzPCvCzWsQxa6UzGm5gA&components=hosted-buttons&disable-funding=venmo¤cy=USD"]'
    );

    if (existingScript) {
      if (window.paypal && window.paypal.HostedButtons) {
        try {
          window.paypal.HostedButtons({
            hostedButtonId: "7TTA3H8NXNC36",
          }).render("#paypal-button-container");
          setIsLoading(false);
        } catch (err) {
          setError("Failed to render PayPal button: " + (err instanceof Error ? err.message : String(err)));
          setIsLoading(false);
        }
      } else {
        setError("PayPal SDK not available");
        setIsLoading(false);
      }
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=BAAVYiC-srs0QQ7eQzFSPWsDfdJxKxthYO920jVotBhncf-yHaoRwrA_AOdHpsvzPCvCzWsQxa6UzGm5gA&components=hosted-buttons&disable-funding=venmo¤cy=USD";
    script.async = true;
    script.crossOrigin = "anonymous";

    script.onload = () => {
      if (window.paypal && window.paypal.HostedButtons) {
        try {
          window.paypal.HostedButtons({
            hostedButtonId: "7TTA3H8NXNC36",
          }).render("#paypal-button-container");
          setIsLoading(false);
        } catch (err) {
          setError("Failed to render PayPal button: " + (err instanceof Error ? err.message : String(err)));
          setIsLoading(false);
        }
      } else {
        setError("PayPal SDK or HostedButtons not available");
        setIsLoading(false);
      }
    };

    script.onerror = (ev) => {
      setError("Failed to load PayPal SDK. Please try again later.");
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h2>PayPal Payment</h2>
      {isLoading && <p>Loading PayPal button...</p>}
      {error && <p>{error}</p>}
      <div id="paypal-button-container" style={{ display: isLoading || error ? "none" : "block" }}></div>
    </div>
  );
};

export default function ScrollTriggered() {
  const [showPayPal, setShowPayPal] = useState(false);

  const handleMusicPromotionClick = () => {
    setShowPayPal(true);
  };

  return (
    <div style={container}>
      <div style={missionSection}>
        <h2>Our Mission</h2>
        <p>
          This is not a service. This is a movement. We give upcoming artists access to clean,
          cinematic promo and visuals — without watering down their style or draining their budget.
        </p>
      </div>

      {services.map(([emoji, hueA, hueB, service, description], i) => (
        <Card
          i={i}
          emoji={emoji}
          hueA={hueA}
          hueB={hueB}
          service={service}
          description={description}
          key={emoji}
          onClick={service === "Music Promotion" ? handleMusicPromotionClick : undefined}
        />
      ))}

      {showPayPal && (
        <div style={paypalButtonStyle}>
          <PayPalButton />
        </div>
      )}
    </div>
  );
}

interface CardProps {
  emoji: string;
  hueA: number;
  hueB: number;
  i: number;
  service: string;
  description: string;
  onClick?: () => void;
}

function Card({ emoji, hueA, hueB, i, service, description, onClick }: CardProps) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className={`card-container-${i}`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
      onClick={onClick}
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

const cardVariants: Variants = {
  offscreen: { y: 300 },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 },
  },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

const container: React.CSSProperties = { margin: "100px auto", maxWidth: 500, paddingBottom: 150, width: "100%" };
const missionSection: React.CSSProperties = { textAlign: "center", marginBottom: 40, padding: "0 20px", color: "#333" };
const cardContainer: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  marginBottom: -120,
};
const splash: React.CSSProperties = { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, clipPath: `path("M 0 303.5...`)` };
const card: React.CSSProperties = { fontSize: 164, width: 300, height: 430, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, background: "#f5f5f5", boxShadow: "0 0 1px hsl(0deg 0% 0% / 0.075)" };
const emojiStyle: React.CSSProperties = { fontSize: "100px", marginBottom: "20px" };
const textStyle: React.CSSProperties = { textAlign: "center", color: "#333", fontSize: "14px", fontWeight: "bold" };
const paypalButtonStyle: React.CSSProperties = { marginTop: "100px", display: "flex", justifyContent: "center" };

const services: [string, number, number, string, string][] = [
  ["🍅", 340, 10, "Music Production", "We create high-quality music tracks, from concept to final mix."],
  ["🍊", 20, 40, "Artist Development", "Helping artists find their sound and build their brand."],
  ["🍋", 60, 90, "Music Promotion", "Promoting music through strategic marketing and media placements."],
  ["🍐", 80, 120, "Event Management", "Organizing concerts, live shows, and music events."],
  ["🍏", 100, 140, "Music Distribution", "Distributing your music to all major streaming platforms."],
  ["🫐", 205, 245, "Video Production", "Creating high-quality music videos to visually tell your story."],
  ["🍆", 260, 290, "Digital Strategy", "Building online strategies for promoting music and engaging fans."],
  ["🍇", 290, 320, "Branding & Merch", "Designing unique branding and merchandise for artists."],
  ["🎤", 0, 330, "Singing Lessons", "Private & group vocal coaching for artists at every level."],
];

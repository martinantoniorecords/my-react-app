import * as motion from "motion/react-client"
import type { Variants } from "motion/react"

export default function ScrollTriggered() {
    return (
        <div style={container}>
            {food.map(([emoji, hueA, hueB, service, description], i) => (
                <Card
                    i={i}
                    emoji={emoji}
                    hueA={hueA}
                    hueB={hueB}
                    service={service}
                    description={description}
                    key={emoji}
                />
            ))}
        </div>
    )
}

interface CardProps {
    emoji: string
    hueA: number
    hueB: number
    i: number
    service: string
    description: string
}

function Card({ emoji, hueA, hueB, i, service, description }: CardProps) {
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`

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
    )
}

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
}

const hue = (h: number) => `hsl(${h}, 100%, 50%)`

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    margin: "100px auto",
    maxWidth: 500,
    paddingBottom: 100,
    width: "100%",
}

const cardContainer: React.CSSProperties = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: 20,
    marginBottom: -120,
}

const splash: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

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
}

const emojiStyle: React.CSSProperties = {
    fontSize: "100px",
    marginBottom: "20px",
}

const textStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#333",
    fontSize: "14px",
    fontWeight: "bold",
}

/**
 * ==============   Data   ================
 */

const food: [string, number, number, string, string][] = [
    ["🍅", 340, 10, "Music Production", "We create high-quality music tracks, from concept to final mix."],
    ["🍊", 20, 40, "Artist Development", "Helping artists find their sound and build their brand."],
    ["🍋", 60, 90, "Music Promotion", "Promoting music through strategic marketing and media placements."],
    ["🍐", 80, 120, "Event Management", "Organizing concerts, live shows, and music events."],
    ["🍏", 100, 140, "Music Distribution", "Distributing your music to all major streaming platforms."],
    ["🫐", 205, 245, "Video Production", "Creating high-quality music videos to visually tell your story."],
    ["🍆", 260, 290, "Digital Strategy", "Building online strategies for promoting music and engaging fans."],
    ["🍇", 290, 320, "Branding & Merch", "Designing unique branding and merchandise for artists."]
]

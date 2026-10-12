"use client";

import { useEffect, useState, useSyncExternalStore, useRef } from "react";
import {
  Zap,
  RotateCcw,
  Play,
  CheckCircle2,
  Calendar,
  Database,
  Bot,
  MessageSquare,
  Send,
  Workflow,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

interface NetworkNode {
  id: string;
  step: string;
  title: string;
  action: string;
  type: string;
  x: number;
  y: number;
  icon: typeof MessageSquare;
  brandColor: string;
  payload: string;
}

const FLOW_NODES: NetworkNode[] = [
  {
    id: "whatsapp",
    step: "01",
    title: "WhatsApp Webhook",
    action: "New appointment enquiry captured",
    type: "TRIGGER",
    x: 80,
    y: 70,
    icon: MessageSquare,
    brandColor: "#25D366",
    payload: '{"phone": "+91 98765 43210", "text": "Book Thursday 4:30pm"}',
  },
  {
    id: "n8n",
    step: "02",
    title: "n8n Orchestrator",
    action: "Payload validation & deduplication",
    type: "LOGIC",
    x: 350,
    y: 60,
    icon: Workflow,
    brandColor: "#FF6B35",
    payload: '{"status": "VALIDATED", "idempotent": true}',
  },
  {
    id: "ai",
    step: "03",
    title: "AI Intent Engine",
    action: "LLM extraction: intent=booking (99.4%)",
    type: "REASONING",
    x: 520,
    y: 180,
    icon: Bot,
    brandColor: "#A855F7",
    payload: '{"intent": "booking", "slot": "Thu 16:30", "schema": "Pydantic"}',
  },
  {
    id: "database",
    step: "04",
    title: "Supabase DB",
    action: "Atomic database row lock acquired",
    type: "PERSIST",
    x: 330,
    y: 260,
    icon: Database,
    brandColor: "#3ECF8E",
    payload: '{"table": "bookings", "row_id": "rec_91f", "locked": true}',
  },
  {
    id: "calendar",
    step: "05",
    title: "Google Calendar",
    action: "Hold appointment slot at 4:30 PM",
    type: "SCHEDULE",
    x: 100,
    y: 290,
    icon: Calendar,
    brandColor: "#38BDF8",
    payload: '{"event": "Client Session", "time": "16:30", "status": "HOLD"}',
  },
  {
    id: "dispatch",
    step: "06",
    title: "WhatsApp & Slack",
    action: "Instant client reply + staff alert",
    type: "DISPATCH",
    x: 380,
    y: 390,
    icon: Send,
    brandColor: "#FF6B35",
    payload: '{"whatsapp": "CONFIRMED", "slack": "DISPATCHED", "latency": "184ms"}',
  },
];

// Fluid bezier connecting conduits between nodes
const PATH_DATA = [
  // 1 -> 2
  "M 120 70 C 220 50, 260 60, 310 60",
  // 2 -> 3
  "M 390 60 C 470 70, 520 110, 520 145",
  // 3 -> 4
  "M 520 215 C 500 270, 420 260, 370 260",
  // 4 -> 5
  "M 290 260 C 210 250, 160 270, 140 290",
  // 5 -> 6
  "M 140 310 C 200 370, 280 390, 340 390",
];

export function HeroAutomationScene() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedNode, setSelectedNode] = useState<NetworkNode>(FLOW_NODES[0]);

  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => (typeof window !== "undefined" ? window.matchMedia(QUERY).matches : false),
    () => false,
  );

  // Progressive automation loop
  useEffect(() => {
    if (!isPlaying || reduced) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % FLOW_NODES.length;
        setSelectedNode(FLOW_NODES[next]);
        return next;
      });
    }, 2400);
    return () => clearInterval(timer);
  }, [isPlaying, reduced]);

  function triggerTest() {
    setActiveStep(0);
    setSelectedNode(FLOW_NODES[0]);
    setIsPlaying(true);
  }

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Background Ambient Radial Glow (Seamless, no outer box) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,107,53,0.12),transparent_70%)] pointer-events-none -z-10"
      />

      {/* Floating Top Status Strip (Clean, borderless minimalism) */}
      <div className="flex items-center justify-between pb-2 mb-1 px-1">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#FF6B35] animate-ping" />
          <span className="font-mono text-[11px] font-semibold tracking-wider text-[#FF6B35] uppercase">
            LIVE AUTOMATION GRAPH
          </span>
          <span className="font-mono text-[10px] text-[#B6B1A9] hidden sm:inline">
            · 24/7 Autonomous Pipeline
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={triggerTest}
            className="inline-flex items-center gap-1.5 bg-[#FF6B35] hover:bg-[#E85B27] text-white px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <Zap className="size-3 fill-current" />
            <span>TRIGGER FLOW</span>
          </button>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause flow" : "Resume flow"}
            className="p-1 border border-[#393939] bg-[#242424] text-[#B6B1A9] hover:text-white transition-colors cursor-pointer"
          >
            {isPlaying ? <RotateCcw className="size-3" /> : <Play className="size-3" />}
          </button>
        </div>
      </div>

      {/* Fluid SVG Automation Graph Canvas (No square cards, pure connected flow) */}
      <div className="relative aspect-[16/11.5] w-full min-w-0 max-w-full overflow-hidden">
        <svg
          viewBox="0 0 620 440"
          className="size-full overflow-hidden"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Background Architectural Grid Dots */}
          <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.75" fill="#393939" opacity="0.4" />
          </pattern>
          <rect width="620" height="440" fill="url(#dot-grid)" opacity="0.7" />

          {/* Glowing Ambient Conduits (Inactive paths) */}
          {PATH_DATA.map((path, i) => (
            <path
              key={`base-${i}`}
              d={path}
              stroke="#393939"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.6"
            />
          ))}

          {/* Active Illuminated Conduits with Tangerine Glow */}
          {PATH_DATA.map((path, i) => {
            const isPathActive = activeStep === i;
            return (
              <path
                key={`active-${i}`}
                d={path}
                stroke={isPathActive ? "#FF6B35" : "#393939"}
                strokeWidth={isPathActive ? "2.5" : "1.2"}
                strokeDasharray={isPathActive ? "none" : "3 3"}
                className="transition-all duration-500"
                opacity={isPathActive ? "1" : "0.3"}
              />
            );
          })}

          {/* Flowing Energy Pulses (Animated along paths) */}
          {!reduced && isPlaying && (
            <>
              {PATH_DATA.map((path, i) => (
                <circle key={`pulse-${i}`} r="3.5" fill="#FF6B35" opacity={activeStep === i ? 1 : 0.4}>
                  <animateMotion
                    path={path}
                    dur={activeStep === i ? "1.8s" : "3.6s"}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </>
          )}

          {/* Floating Flow Nodes (Interactive, organic circular hubs with labels) */}
          {FLOW_NODES.map((node, i) => {
            const isCurrent = activeStep === i;
            const isDone = activeStep > i;
            const NodeIcon = node.icon;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => {
                  setActiveStep(i);
                  setSelectedNode(node);
                  setIsPlaying(false);
                }}
                className="cursor-pointer group"
              >
                {/* Outer Ripple Halo for Active Node */}
                {isCurrent && (
                  <circle
                    cx="0"
                    cy="0"
                    r="28"
                    fill="none"
                    stroke="#FF6B35"
                    strokeWidth="1"
                    opacity="0.4"
                    className="animate-ping"
                  />
                )}

                {/* Ambient Node Glow Disc */}
                <circle
                  cx="0"
                  cy="0"
                  r="22"
                  fill="#171717"
                  stroke={isCurrent ? "#FF6B35" : isDone ? "#3ECF8E" : "#393939"}
                  strokeWidth={isCurrent ? "2" : "1.2"}
                  className="transition-all duration-300"
                />

                {/* Inner Icon Tint Ring */}
                <circle
                  cx="0"
                  cy="0"
                  r="16"
                  fill={isCurrent ? "#FF6B35" : `${node.brandColor}22`}
                  className="transition-all duration-300"
                />

                {/* ForeignObject for crisp Lucide Icon */}
                <foreignObject x="-10" y="-10" width="20" height="20">
                  <div className="size-full flex items-center justify-center">
                    <NodeIcon
                      className={`size-3.5 transition-colors ${
                        isCurrent ? "text-white" : ""
                      }`}
                      style={{ color: isCurrent ? "#FFFFFF" : node.brandColor }}
                    />
                  </div>
                </foreignObject>

                {/* Step Number Pip */}
                <circle cx="16" cy="-14" r="7" fill="#242424" stroke="#393939" strokeWidth="0.8" />
                <text
                  x="16"
                  y="-11.5"
                  textAnchor="middle"
                  fill={isCurrent ? "#FF6B35" : "#B6B1A9"}
                  fontSize="7"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.step}
                </text>

                {/* Floating Node Label (Clean typography, no box card) */}
                <text
                  x="0"
                  y="34"
                  textAnchor="middle"
                  fill={isCurrent ? "#FFFFFF" : "#F5EBDD"}
                  fontSize="11"
                  fontFamily="Space Grotesk, sans-serif"
                  fontWeight="600"
                  className="transition-colors"
                >
                  {node.title}
                </text>

                {/* Small Monospace Action Subtitle */}
                <text
                  x="0"
                  y="45"
                  textAnchor="middle"
                  fill={isCurrent ? "#FF6B35" : "#B6B1A9"}
                  fontSize="7.5"
                  fontFamily="monospace"
                  opacity={isCurrent ? 1 : 0.75}
                >
                  {isCurrent ? "▶ EXECUTING..." : isDone ? "✓ COMPLETED" : node.type}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Floating Live Telemetry Ticker (No heavy outer cards) */}
      <div className="mt-2 pt-2 border-t border-[#393939]/70 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[#3ECF8E] animate-pulse" />
          <span className="text-[#B6B1A9] text-[11px]">
            ACTIVE STEP: <strong className="text-white">{selectedNode.title}</strong>
          </span>
          <span className="text-[#FF6B35] text-[10px] hidden sm:inline">
            → {selectedNode.action}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-[#B6B1A9]">
          <span className="text-[#3ECF8E]">LATENCY: 184ms</span>
          <span>·</span>
          <span className="text-[#F5EBDD]">ZERO BOTTLENECK</span>
        </div>
      </div>
    </div>
  );
}

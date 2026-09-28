import React from 'react';
import { motion } from 'framer-motion';

// Workflow steps data definition
export const WORKFLOW_STEPS = [
  {
    num: "01",
    title: "SHARE YOUR REQUIREMENT",
    desc: "Tell us what you need to print or advertise."
  },
  {
    num: "02",
    title: "DISCUSS YOUR IDEA",
    desc: "Discuss size, format, purpose and design."
  },
  {
    num: "03",
    title: "DESIGN & APPROVAL",
    desc: "Finalize the design direction before production."
  },
  {
    num: "04",
    title: "PRINT & PRODUCE",
    desc: "Your approved material moves into printing/production."
  },
  {
    num: "05",
    title: "READY TO USE",
    desc: "Receive your finished printing or advertising material."
  }
];

// Framer Motion animation variants for the circular marker
// Smooth 300ms transition with solid teal fill, white text, scale 1.10, and subtle glow
export const markerVariants = {
  initial: {
    backgroundColor: '#FFFFFF',
    borderColor: '#087F7B',
    scale: 1,
    boxShadow: '0 4px 14px rgba(8, 127, 123, 0.15)',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  hover: {
    backgroundColor: '#087F7B',
    borderColor: '#087F7B',
    scale: 1.10,
    boxShadow: '0 8px 24px rgba(8, 127, 123, 0.40), 0 0 16px rgba(8, 127, 123, 0.25)',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Number variants synchronized with marker hover state
export const numberVariants = {
  initial: {
    color: '#087F7B',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  hover: {
    color: '#FFFFFF',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

/**
 * Reusable Workflow Step Component
 * Each step isolates its own Framer Motion hover state so hovering one step
 * activates only that specific step circle (01, 02, 03, 04, or 05).
 */
export function WorkflowStep({ step }) {
  return (
    <div className="timeline-step">
      <motion.div
        className="step-marker"
        initial="initial"
        whileHover="hover"
        variants={markerVariants}
      >
        <motion.span
          className="step-num"
          variants={numberVariants}
        >
          {step.num}
        </motion.span>
      </motion.div>
      <div className="step-content">
        <h3 className="step-title">{step.title}</h3>
        <p className="step-desc">{step.desc}</p>
      </div>
    </div>
  );
}

/**
 * Main "How We Work" Section Component
 * Maps over the steps array to apply the exact same animation logic to all five numbers.
 */
export default function HowWeWork() {
  return (
    <section className="process-section" id="process">
      <div className="container">
        <div className="section-header-centered reveal">
          <span className="section-badge">WORKFLOW</span>
          <h2 className="section-heading">
            How we <span className="serif-accent">work</span>
          </h2>
          <p className="section-intro">
            A transparent, straightforward collaboration from first concept to final delivery.
          </p>
        </div>

        {/* Horizontal connecting line is styled via CSS .process-timeline::before and stays behind z-index: 2 markers */}
        <div className="process-timeline reveal" style={{ '--delay': '0.2s' }}>
          {WORKFLOW_STEPS.map((step) => (
            <WorkflowStep key={step.num} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

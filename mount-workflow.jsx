import React from 'react';
import { createRoot } from 'react-dom/client';
import { WorkflowStep, WORKFLOW_STEPS } from './HowWeWork.jsx';
import QuoteForm from './QuoteForm.jsx';

function WorkflowTimeline() {
  return (
    <>
      {WORKFLOW_STEPS.map((step) => (
        <WorkflowStep key={step.num} step={step} />
      ))}
    </>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  // Mount Workflow Timeline
  const processRoot = document.getElementById('process-timeline-root');
  if (processRoot) {
    const root = createRoot(processRoot);
    root.render(<WorkflowTimeline />);
  }

  // Mount Quote Form
  const quoteRoot = document.getElementById('quote-form-root');
  if (quoteRoot) {
    const root = createRoot(quoteRoot);
    root.render(<QuoteForm />);
  }
});

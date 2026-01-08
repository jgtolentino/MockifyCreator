"use client";

import { useState } from "react";
import CodeBlock from "./components/CodeBlock";

const masterPrompt = `I have a [mockup/wireframe/design] that I need to transform into a production-ready application. Here's my approach:

**1. DESIGN ANALYSIS**
Please analyze my mockup and identify:
- All UI components (buttons, forms, cards, navigation, etc.)
- Layout structure and grid system
- Color palette and typography
- Interactive elements and their expected behaviors
- Responsive breakpoints needed

**2. TECHNOLOGY STACK RECOMMENDATION**
Based on the mockup complexity, recommend:
- Frontend framework (React, Vue, Next.js, etc.)
- CSS approach (Tailwind, CSS Modules, Styled Components)
- State management needs
- Backend requirements (if any)
- Database considerations

**3. COMPONENT ARCHITECTURE**
Break down the mockup into:
- Reusable components
- Page-level components
- Layout components
- Shared utilities and hooks

**4. IMPLEMENTATION PLAN**
Provide a step-by-step plan:
- Project setup and configuration
- Component development order (atomic design: atoms → molecules → organisms)
- Styling implementation
- Interactivity and state management
- API integration points
- Testing strategy

**5. PRODUCTION CONSIDERATIONS**
Address:
- Performance optimization
- Accessibility (WCAG compliance)
- SEO requirements
- Security best practices
- Deployment strategy`;

const designAuditPrompt = `Analyze this mockup and provide:

1. **Visual Inventory**
   - List every unique UI element
   - Identify repeated patterns
   - Note spacing and alignment patterns
   - Extract exact colors (provide hex codes)
   - Identify font families and sizes

2. **Interaction Map**
   - What happens on click/tap?
   - Hover states needed?
   - Form validation requirements?
   - Loading states?
   - Error states?
   - Success states?

3. **Responsive Requirements**
   - Mobile layout changes
   - Tablet considerations
   - Desktop optimizations
   - Breakpoint recommendations`;

const projectStructure = `src/
├── components/
│   ├── ui/           # Base UI components (Button, Input, Card)
│   ├── layout/       # Layout components (Header, Footer, Sidebar)
│   ├── features/     # Feature-specific components
│   └── pages/        # Page components
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── styles/           # Global styles and themes
├── services/         # API and external services
└── types/            # TypeScript type definitions`;

const quickPrompts = [
  {
    title: "Rapid Prototyping",
    prompt: "Convert this mockup into a working React component with Tailwind CSS. Focus on visual accuracy first, we'll add interactivity later. Use placeholder data.",
  },
  {
    title: "Component Extraction",
    prompt: "Look at this mockup and identify all reusable components. Create a component library with these elements, ensuring consistent styling and props interfaces.",
  },
  {
    title: "Responsive Implementation",
    prompt: "This mockup shows the desktop version. Generate the responsive variants for tablet (768px) and mobile (375px), maintaining the design language while optimizing for each viewport.",
  },
  {
    title: "Adding Interactivity",
    prompt: "This static component needs interactivity. Add: [specific interactions like form validation, animations, state changes]. Use React hooks and ensure smooth UX.",
  },
  {
    title: "Production Polish",
    prompt: "Review this component for production readiness. Add: error boundaries, loading states, accessibility attributes, performance optimizations, and comprehensive TypeScript types.",
  },
];

const phases = [
  { id: 1, title: "Design Audit", icon: "🔍" },
  { id: 2, title: "Technical Planning", icon: "📐" },
  { id: 3, title: "Component Development", icon: "🧩" },
  { id: 4, title: "State Management", icon: "🔄" },
  { id: 5, title: "API Integration", icon: "🔌" },
  { id: 6, title: "Production Readiness", icon: "🚀" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"master" | "phases" | "quick">("master");
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">MockifyCreator</h1>
                <p className="text-xs text-zinc-500">Mockup to Production</p>
              </div>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
            AI-Powered Development
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Mockups into
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"> Production Apps</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10">
            Copy-paste prompts to guide AI assistants through converting your design mockups into fully functional, production-ready applications.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab("master")}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
            <button
              onClick={() => setActiveTab("quick")}
              className="px-6 py-3 rounded-lg bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors"
            >
              Quick Prompts
            </button>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-2 border-b border-zinc-800 mb-8">
          {[
            { id: "master", label: "Master Prompt" },
            { id: "phases", label: "6-Phase Process" },
            { id: "quick", label: "Quick Prompts" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 pb-20">
        {activeTab === "master" && (
          <div className="space-y-8">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">The Master Prompt</h3>
                <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">Copy and customize</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6">
                Use this comprehensive prompt when starting any mockup-to-production conversion. Customize the bracketed sections for your specific project.
              </p>
              <CodeBlock code={masterPrompt} />
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Recommended Project Structure</h3>
              <CodeBlock code={projectStructure} />
            </div>
          </div>
        )}

        {activeTab === "phases" && (
          <div className="space-y-4">
            {phases.map((phase) => (
              <div
                key={phase.id}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{phase.icon}</span>
                    <div className="text-left">
                      <span className="text-xs text-violet-400 font-medium">Phase {phase.id}</span>
                      <h3 className="text-lg font-semibold text-white">{phase.title}</h3>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-zinc-500 transition-transform ${expandedPhase === phase.id ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedPhase === phase.id && (
                  <div className="px-6 pb-6">
                    {phase.id === 1 && <CodeBlock code={designAuditPrompt} />}
                    {phase.id === 2 && (
                      <div className="space-y-4">
                        <p className="text-zinc-400 text-sm">Request a technical specification based on your mockup analysis:</p>
                        <CodeBlock code={`Based on the mockup analysis, create a technical specification:

**Project Structure:** [Use the recommended structure above]

**Component Naming Convention:**
- PascalCase for components
- camelCase for functions and variables
- kebab-case for CSS classes
- SCREAMING_SNAKE_CASE for constants`} />
                      </div>
                    )}
                    {phase.id === 3 && (
                      <CodeBlock code={`For each component in the mockup, generate:

1. **Component Code**
   - Functional component with TypeScript
   - Props interface with proper types
   - Default props where applicable
   - Proper event handlers

2. **Styling**
   - Responsive styles
   - Theme-aware colors
   - Consistent spacing using design tokens
   - Hover/focus/active states

3. **Accessibility**
   - Semantic HTML elements
   - ARIA labels where needed
   - Keyboard navigation support
   - Screen reader compatibility

4. **Testing**
   - Unit tests for logic
   - Integration tests for interactions
   - Visual regression tests consideration`} />
                    )}
                    {phase.id === 4 && (
                      <CodeBlock code={`Identify state requirements from the mockup:

1. **Local State**
   - Form inputs
   - UI toggles (modals, dropdowns)
   - Loading indicators

2. **Global State**
   - User authentication
   - Theme preferences
   - Shopping cart (if applicable)
   - Notifications

3. **Server State**
   - Data fetching
   - Caching strategy
   - Optimistic updates
   - Error handling

Recommend: React Query/TanStack Query for server state, Zustand or Context for global state.`} />
                    )}
                    {phase.id === 5 && (
                      <CodeBlock code={`Based on the mockup's data requirements:

1. **Identify API Endpoints Needed**
   - GET requests for data display
   - POST requests for form submissions
   - PUT/PATCH for updates
   - DELETE for removals

2. **Data Structures**
   - Define TypeScript interfaces
   - Map API responses to UI components
   - Handle loading and error states

3. **API Layer Setup**
   - Create API client with interceptors
   - Implement authentication handling
   - Add request/response transformations`} />
                    )}
                    {phase.id === 6 && (
                      <div className="space-y-4">
                        <p className="text-zinc-400 text-sm">Production readiness checklist:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            { title: "Performance", items: ["Image optimization (WebP, lazy loading)", "Code splitting and lazy loading", "Bundle size analysis", "Lighthouse score > 90"] },
                            { title: "Security", items: ["Input sanitization", "XSS prevention", "CSRF protection", "Secure headers"] },
                            { title: "Accessibility", items: ["Keyboard navigation works", "Screen reader tested", "Color contrast passes WCAG AA", "Focus indicators visible"] },
                            { title: "SEO", items: ["Meta tags configured", "Open Graph tags", "Sitemap generated", "robots.txt configured"] },
                          ].map((checklist) => (
                            <div key={checklist.title} className="bg-zinc-800/50 rounded-lg p-4">
                              <h4 className="text-white font-medium mb-2">{checklist.title}</h4>
                              <ul className="space-y-1">
                                {checklist.items.map((item) => (
                                  <li key={item} className="text-zinc-400 text-sm flex items-center gap-2">
                                    <span className="w-4 h-4 rounded border border-zinc-600 flex-shrink-0"></span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "quick" && (
          <div className="grid md:grid-cols-2 gap-4">
            {quickPrompts.map((item) => (
              <div
                key={item.title}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <CodeBlock code={item.prompt} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-zinc-500 text-sm">
          <p>MockifyCreator - Transform mockups into production apps</p>
          <p className="mt-2">Works with Figma, Sketch, Adobe XD, Canva, and more</p>
        </div>
      </footer>
    </div>
  );
}

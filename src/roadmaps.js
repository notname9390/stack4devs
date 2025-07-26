// src/roadmaps.js

export function generateRoadmap(field, tools) {
  // Basic roadmap templates by field
  const templates = {
    saas: [
      { task: "Buy a domain", status: "todo" },
      { task: "Deploy landing page", status: "todo" },
      { task: "Set up payments (Stripe)", status: "todo" },
      { task: "Connect analytics", status: "todo" },
      { task: "Set up email marketing", status: "todo" },
      { task: "Launch!", status: "todo" }
    ],
    blog: [
      { task: "Buy a domain", status: "todo" },
      { task: "Deploy blog platform", status: "todo" },
      { task: "Set up analytics", status: "todo" },
      { task: "Connect newsletter", status: "todo" },
      { task: "Write first post", status: "todo" }
    ],
    community: [
      { task: "Create Discord server", status: "todo" },
      { task: "Set up onboarding bot", status: "todo" },
      { task: "Promote community", status: "todo" },
      { task: "Host first event", status: "todo" }
    ],
    digital: [
      { task: "Create product in Gumroad", status: "todo" },
      { task: "Design product assets", status: "todo" },
      { task: "Set up email list", status: "todo" },
      { task: "Launch sales page", status: "todo" }
    ]
  };

  // Pick template by field
  if (field.includes("saas")) return templates.saas;
  if (field.includes("blog")) return templates.blog;
  if (field.includes("community")) return templates.community;
  if (field.includes("digital")) return templates.digital;

  // Fallback: generic roadmap
  return [
    { task: "Define your project goal", status: "todo" },
    { task: "Pick your tools", status: "todo" },
    { task: "Launch!", status: "todo" }
  ];
} 
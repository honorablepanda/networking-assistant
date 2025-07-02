// utils/mockContacts.js

const mockContacts = [
  {
    id: "1",
    name: "Alice Johnson",
    jobTitle: "Product Manager at TechCorp",
    lastContacted: "2025-06-20",
    engagementScore: 75, // 0-100 scale
    relationshipHealth: "Warm", // Cold / Warm / Hot
    topInterests: ["Product Strategy", "Agile Teams"],
    recentTopics: ["Q2 Product Launch"],
    lastConversationSnippet: "We discussed agile roadmapping and upcoming product features.",
  },
  {
    id: "2",
    name: "Brian Lee",
    jobTitle: "Marketing Director at Marketify",
    lastContacted: "2025-05-15",
    engagementScore: 30,
    relationshipHealth: "Cold",
    topInterests: ["Brand Awareness", "Content Strategy"],
    recentTopics: ["Social Media Metrics", "Q1 Campaign Results"],
    lastConversationSnippet: "Talked about improving engagement on LinkedIn ads.",
  },
  {
    id: "3",
    name: "Carla Smith",
    jobTitle: "Software Engineer at DevWorks",
    lastContacted: "2025-06-25",
    engagementScore: 90,
    relationshipHealth: "Hot",
    topInterests: ["AI Development", "Open Source"],
    recentTopics: ["New ML Deployment Pipeline"],
    lastConversationSnippet: "Discussed challenges in deploying machine learning models to production.",
  },
];

export default mockContacts;

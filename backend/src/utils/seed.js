const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Project = require('../models/Project');
const Experience = require('../models/Experience');

const projects = [
  {
    title: 'DevLoop',
    tagline: 'Developer Social Networking & Collaboration Platform',
    description:
      'DevLoop is a scalable full-stack developer social platform architected on an MVC-based REST API with a React frontend. It uses TanStack Query for server-state caching and optimistic UI updates, and ships secure multi-provider authentication built on JWT and OAuth 2.0. Developers can collaborate on projects through the GitHub REST API and engage through a complete networking layer: posts, likes, comments, follows and a realtime notifications feed.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'OAuth 2.0', 'Tailwind CSS', 'Render'],
    features: [
      'MVC REST API with role-aware authorization',
      'TanStack Query caching with optimistic updates',
      'JWT + OAuth 2.0 multi-provider auth',
      'GitHub-based project collaboration via GitHub REST API',
      'Social graph: posts, likes, comments, follows, notifications',
    ],
    githubUrl: 'https://github.com/Aniketdey2004',
    liveUrl: '',
    order: 1,
  },
  {
    title: 'Chatly',
    tagline: 'Real-Time Chat Application',
    description:
      'Chatly is a realtime chat application built on Socket.io riding on a shared Express HTTP server. It offers WebSocket-based messaging, online presence tracking and efficient chat history retrieval backed by MongoDB. JWT auth is enforced across both REST and WebSocket connections, Arcjet provides rate limiting at the edge, and one-to-one conversations support image uploads and transactional emails.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT', 'Tailwind CSS', 'Render'],
    features: [
      'Realtime WebSocket messaging on a shared HTTP server',
      'Online presence tracking and chat history retrieval',
      'JWT auth across REST and WebSocket layers',
      'Arcjet-based rate limiting',
      'One-to-one chat with image uploads and transactional emails',
    ],
    githubUrl: 'https://github.com/Aniketdey2004',
    liveUrl: '',
    order: 2,
  },
  {
    title: 'WanderLust',
    tagline: 'Property Rental & Listing Platform',
    description:
      'WanderLust is a full-stack property rental platform built on an MVC architecture with RESTful APIs, enabling users to host properties and book stays. It integrates Passport.js authentication, Razorpay payments with HMAC signature verification for transaction integrity, and Mapbox with GeoJSON coordinates to render interactive property locations on a live map.',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'EJS', 'Bootstrap', 'Passport.js', 'Razorpay', 'Render'],
    features: [
      'MVC architecture with RESTful APIs',
      'Passport.js session authentication',
      'Razorpay payments with HMAC verification',
      'Mapbox + GeoJSON interactive property maps',
      'Host & guest workflows with reviews',
    ],
    githubUrl: 'https://github.com/Aniketdey2004',
    liveUrl: '',
    order: 3,
  },
];

const experiences = [
  {
    company: 'NRXEN IT Solutions Pvt. Ltd.',
    role: 'Full Stack Developer Intern',
    location: 'India',
    startDate: 'Jun 2026',
    endDate: 'Present',
    current: true,
    description:
      'Building the React.js frontend for a web application connected to Wear Buddy smartwatches. The product lets organizations track employee health metrics, environmental data and live geolocation, fire geofence-triggered alerts, and generate consolidated health and sleep reports across their workforce. Collaborating with the team to align on data contracts and authoring GraphQL queries that fetch and render realtime smartwatch data inside the frontend interface.',
    bullets: [
      'React.js frontend for Wear Buddy smartwatch integrations',
      'Health metrics, environmental data, live geolocation views',
      'Geofence-triggered alerts and organization-wide reporting',
      'GraphQL queries for realtime smartwatch data',
    ],
  },
];

async function seedAll() {
  try {
    if (!process.env.MONGO_URI) return;

    // Admin
    const email = (process.env.ADMIN_EMAIL || 'aniketdey2004@gmail.com').toLowerCase();
    const exists = await Admin.findOne({ email });
    if (!exists) {
      const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@12345', 10);
      await Admin.create({ email, passwordHash });
      console.log('[seed] admin created:', email);
    }

    if ((await Project.countDocuments()) === 0) {
      await Project.insertMany(projects);
      console.log('[seed] projects inserted');
    }
    if ((await Experience.countDocuments()) === 0) {
      await Experience.insertMany(experiences);
      console.log('[seed] experiences inserted');
    }
  } catch (e) {
    console.error('[seed] error:', e.message);
  }
}

module.exports = { seedAll };

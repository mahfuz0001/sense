# 🎯 Sense App Visual Flowchart

## Main User Journey Flow

```
┌─────────────────┐
│   Landing Page  │ ← Entry point with compelling messaging
└─────────────────┘
         │
         ▼
┌─────────────────┐    ┌─────────────────┐
│   Authentication│ ←→ │   Sign Up Flow  │
│     Modal       │    │ (Email verify)  │
└─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│                   DASHBOARD                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │
│  │   Learning  │ │   Progress  │ │   Profile   │  │
│  │    Paths    │ │   Tracking  │ │  Settings   │  │
│  └─────────────┘ └─────────────┘ └─────────────┘  │
└─────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│                CHALLENGE CATEGORIES                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │
│  │  HTML/CSS   │ │ TypeScript  │ │    React    │  │
│  │ Challenges  │ │ Challenges  │ │ Components  │  │
│  └─────────────┘ └─────────────┘ └─────────────┘  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │
│  │     API     │ │   Advanced  │ │   Custom    │  │
│  │ Integration │ │  Patterns   │ │ Challenges  │  │
│  └─────────────┘ └─────────────┘ └─────────────┘  │
└─────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│              CHALLENGE INTERFACE                    │
│  ┌─────────────────────────────────────────────┐   │
│  │           Problem Description               │   │
│  │     (No step-by-step instructions)         │   │
│  └─────────────────────────────────────────────┘   │
│  ┌─────────────────┐  ┌─────────────────────┐      │
│  │  Monaco Editor  │  │    Test Results     │      │
│  │  (Live Coding)  │  │   (Real-time)       │      │
│  └─────────────────┘  └─────────────────────┘      │
│  ┌─────────────────┐  ┌─────────────────────┐      │
│  │   AI Hints      │  │     Resources       │      │
│  │  (Progressive)  │  │  (Documentation)    │      │
│  └─────────────────┘  └─────────────────────┘      │
└─────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────┐         ┌─────────────────┐
│   Challenge     │   or    │    Challenge    │
│   Completed     │         │     Failed      │
│   ✅ Success    │         │   ❌ Retry      │
└─────────────────┘         └─────────────────┘
         │                           │
         ▼                           │
┌─────────────────┐                  │
│ Progress Update │                  │
│ & Achievements  │                  │
└─────────────────┘                  │
         │                           │
         ▼                           │
┌─────────────────┐                  │
│  Next Challenge │ ←────────────────┘
│  or Learning    │
│  Path Continue  │
└─────────────────┘
```

## Admin Panel Flow

```
┌─────────────────┐
│  Admin Login    │ ← Separate admin authentication
└─────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│                 ADMIN DASHBOARD                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │
│  │  Challenge  │ │    User     │ │  Platform   │  │
│  │ Management  │ │  Analytics  │ │  Settings   │  │
│  └─────────────┘ └─────────────┘ └─────────────┘  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │
│  │   Content   │ │  Learning   │ │   System    │  │
│  │     CMS     │ │    Paths    │ │   Health    │  │
│  └─────────────┘ └─────────────┘ └─────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Feature Architecture Map

```
                    ┌─────────────────┐
                    │   SENSE CORE    │
                    │   PLATFORM      │
                    └─────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   LEARNING  │    │  CHALLENGE  │    │    USER     │
│   ENGINE    │    │   SYSTEM    │    │ EXPERIENCE  │
└─────────────┘    └─────────────┘    └─────────────┘
        │                   │                   │
        │                   │                   │
   ┌────▼────┐         ┌────▼────┐         ┌────▼────┐
   │Progress │         │ Monaco  │         │ Auth &  │
   │Tracking │         │ Editor  │         │Profile  │
   └─────────┘         └─────────┘         └─────────┘
        │                   │                   │
   ┌────▼────┐         ┌────▼────┐         ┌────▼────┐
   │Learning │         │  Test   │         │Dashboard│
   │ Paths   │         │ Runner  │         │ & Stats │
   └─────────┘         └─────────┘         └─────────┘
        │                   │                   │
   ┌────▼────┐         ┌────▼────┐         ┌────▼────┐
   │  AI     │         │  Code   │         │  Theme  │
   │ Hints   │         │Validator│         │ & UI    │
   └─────────┘         └─────────┘         └─────────┘
```

## Data Flow Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    USER     │────▶│ FRONTEND    │────▶│  SUPABASE   │
│ INTERACTION │     │ (Next.js)   │     │  BACKEND    │
└─────────────┘     └─────────────┘     └─────────────┘
                           │                     │
                           ▼                     ▼
                    ┌─────────────┐     ┌─────────────┐
                    │   STATE     │     │ POSTGRESQL  │
                    │ MANAGEMENT  │     │  DATABASE   │
                    └─────────────┘     └─────────────┘
                           │                     │
                           ▼                     ▼
                    ┌─────────────┐     ┌─────────────┐
                    │    CACHE    │     │    REAL     │
                    │   LAYER     │     │    TIME     │
                    └─────────────┘     └─────────────┘
```

## User State Flow

```
ANONYMOUS → SIGNED_UP → VERIFIED → ONBOARDED → ACTIVE_LEARNER → ADVANCED_USER
    │           │           │           │             │              │
    │           │           │           │             │              ▼
    │           │           │           │             │      ┌─────────────┐
    │           │           │           │             │      │  MENTOR /   │
    │           │           │           │             │      │  COMMUNITY  │
    │           │           │           │             │      │   LEADER    │
    │           │           │           │             │      └─────────────┘
    │           │           │           │             │
    ▼           ▼           ▼           ▼             ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ View    │ │ Email   │ │ Choose  │ │ First   │ │ Regular │
│ Landing │ │ Verify  │ │ Path    │ │Challenge│ │Progress │
└─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘
```

## Challenge Difficulty Progression

```
BEGINNER ────▶ INTERMEDIATE ────▶ ADVANCED ────▶ EXPERT
    │               │                │              │
    ▼               ▼                ▼              ▼
┌─────────┐   ┌─────────────┐   ┌─────────────┐ ┌─────────┐
│ Basic   │   │ Multi-step  │   │ Open-ended  │ │ Real    │
│ Syntax  │   │ Problems    │   │ Architecture│ │ World   │
└─────────┘   └─────────────┘   └─────────────┘ └─────────┘
    │               │                │              │
┌─────────┐   ┌─────────────┐   ┌─────────────┐ ┌─────────┐
│ Clear   │   │ Research    │   │ Multiple    │ │ Complex │
│ Goals   │   │ Required    │   │ Solutions   │ │ Systems │
└─────────┘   └─────────────┘   └─────────────┘ └─────────┘
```

## Technology Stack Visualization

```
                    ┌─────────────────┐
                    │   FRONTEND      │
                    │   (Next.js)     │
                    └─────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │   React     │ │  TypeScript │ │  Tailwind   │
    │ Components  │ │    Types    │ │     CSS     │
    └─────────────┘ └─────────────┘ └─────────────┘
            │               │               │
            ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │   Framer    │ │   Monaco    │ │   Lucide    │
    │   Motion    │ │   Editor    │ │    Icons    │
    └─────────────┘ └─────────────┘ └─────────────┘
                            │
                            ▼
                    ┌─────────────────┐
                    │   BACKEND       │
                    │  (Supabase)     │
                    └─────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │    Auth     │ │ PostgreSQL  │ │  Real-time  │
    │  Service    │ │  Database   │ │  Updates    │
    └─────────────┘ └─────────────┘ └─────────────┘
```

This visual flowchart provides a comprehensive overview of the Sense platform architecture, user journeys, and technical implementation. Use this as a reference when creating content and explaining the platform's value proposition to users and stakeholders.
# **App Name**: JetLagEase

## Core Features:

- Trip Input: Simple form for users to input their trip details: departure location, arrival location, and travel dates.
- Personalized Exercise Plan: Generate a personalized exercise schedule based on the user's trip details, factoring in time zone changes and circadian rhythm principles.
- Schedule Display: Display the generated exercise schedule in a clear, easy-to-read format, with options for reminders.

## Style Guidelines:

- Primary color: Soft blue (#A0D2EB) for a calming and reliable feel.
- Secondary color: Light green (#C5E8B7) to suggest wellness and nature.
- Accent: Orange (#FFB347) for CTAs and highlights to prompt action.
- Clean and modern sans-serif font for readability.
- Simple, card-based layout for easy navigation and content grouping.
- Use icons related to travel, sleep, and exercise.

## Original User Request:
I want to build  Personalized Jet Lag Recovery Assistant.

It works like this flowchart:
flowchart TD
    subgraph User Interface
        A[Mobile App] --> B[Trip Input Screen]
        A --> C[Recovery Plan Dashboard]
        A --> D[Exercise Recommendation View]
        A --> E[Feedback & Tracking]
    end
    
    subgraph Core Services
        F[Trip Processor] --> G[Jet Lag Severity Calculator]
        G --> H[Circadian Phase Estimator]
        H --> I[Exercise Window Optimizer]
        I --> J[Recovery Plan Generator]
    end
    
    subgraph Data Sources
        K[User Profile Data]
        L[Flight Information]
        M[Geographic Time Data]
        N[Circadian Research Rules]
    end
    
    subgraph Output
        O[Personalized Exercise Schedule]
        P[Sleep Recommendations]
        Q[Light Exposure Guide]
    end
    
    B --> F
    K --> F
    L --> F
    M --> G
    N --> H
    E --> H
    J --> O
    J --> P
    J --> Q
    O --> C
    P --> C
    Q --> C
    O --> D
    
    classDef primary fill:#d1eaff,stroke:#0066cc,stroke-width:2px
    classDef secondary fill:#e6f5d0,stroke:#629632,stroke-width:2px
    classDef interface fill:#fff0cc,stroke:#cc8800,stroke-width:2px
    classDef data fill:#f0d1ff,stroke:#8000cc,stroke-width:2px
    
    class A,B,C,D,E interface
    class F,G,H,I,J primary
    class K,L,M,N data
    class O,P,Q secondary
  
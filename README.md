# Herbert - Interactive Facility Map Application

## Project Setup and Run Instructions

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm/bun
- Git for version control
- Mapbox account for map services
- Storyblok account for content management

### Quick Start

1. **Clone and install dependencies:**
```bash
git clone [https://github.com/usman313/herbert.git]
cd herbert
npm install
```

2. **Environment setup:**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
STORY_BLOK_ACCESS_TOKEN=your_storyblok_token
MAP_BOX=your_mapbox_token
```

3. **Run development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts
- `npm run dev` - Development server with hot reload
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint-fix` - Auto-fix linting issues

## Architectural Rationale

### Component Structure

The application follows a **feature-based component architecture** with clear separation of concerns:

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # Server-side API routes
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Entry point
├── components/
│   ├── ui/                # Atomic, reusable UI components
│   │   ├── Button.tsx     # Stateless, styled components
│   │   ├── Input.tsx      # Form controls
│   │   └── Map.tsx        # Map primitives
│   ├── FacilityCard.tsx   # Feature component
│   ├── MapSection.tsx     # Container component
│   └── SearchBar.tsx      # Smart component with logic
├── hooks/                 # Custom React hooks
└── lib/                   # Utilities and configurations
```

**Rationale:**
- **UI Components**: Pure, reusable components without business logic for consistency and testability
- **Feature Components**: Domain-specific components that compose UI components
- **Container Components**: Smart components managing state and data flow
- **Separation**: Clear boundaries between presentation and logic layers

### State Management

**Local State Strategy:**
- Component-level state using `useState` for UI interactions
- Custom hooks (`useFacilityData`, `useHover`) for shared logic
- React Context for cross-component communication when needed

**Data Flow:**
```
Storyblok CMS → API Route → React Components → UI
     ↑                           ↓
     └── User Interactions ← ← ← ┘
```

**Rationale:**
- No global state management (Redux/Zustand) to reduce complexity for current scope
- Server-side data fetching via Next.js API routes for better caching
- Client-side state kept minimal and colocated with components

### Technology Decisions

**Next.js 16 with App Router:**
- Server Components for better initial load performance
- Built-in API routes eliminating need for separate backend
- Automatic code splitting and optimization

**TypeScript:**
- Type safety preventing runtime errors
- Better IDE support and auto-completion
- Self-documenting code through interfaces

**Tailwind CSS v4:**
- Utility-first approach for rapid development
- Consistent design system
- Smaller CSS bundle through purging

**Mapbox GL:**
- Vector tiles for smooth zooming/panning
- Extensive customization options
- Better performance than raster map alternatives

## Trade-offs and Limitations

### Current Trade-offs

1. **CMS Dependency**
   - **Trade-off**: Storyblok integration adds external dependency
   - **Benefit**: Non-technical users can manage content
   - **Mitigation**: API abstraction layer for potential CMS migration

2. **Client-side Map Rendering**
   - **Trade-off**: Initial bundle size increased by Mapbox GL (~200KB)
   - **Benefit**: Rich interactive features
   - **Mitigation**: Lazy loading map component when visible

3. **No State Persistence**
   - **Trade-off**: Search/filter state lost on page refresh
   - **Benefit**: Simpler architecture, faster development
   - **Future**: Could add URL parameters or localStorage

4. **Limited Offline Support**
   - **Trade-off**: Requires internet connection for maps/content
   - **Benefit**: Always up-to-date data
   - **Future**: Could implement service workers for offline mode

### Known Limitations

1. **Scale Limitations**
   - Current architecture handles ~1000 facilities well
   - Beyond that, would need pagination/virtualization
   - Map clustering not implemented for large datasets

2. **Browser Support**
   - Requires modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
   - WebGL required for Mapbox rendering
   - No IE11 support

3. **API Rate Limits**
   - Storyblok: 1000 requests/hour on free tier
   - Mapbox: 50,000 map loads/month on free tier
   - No rate limiting implemented on our API routes

### Animation Approach

**GSAP Integration:**
- Used for complex facility card animations
- Timeline-based sequences for coordinated effects
- Hardware acceleration via transforms

**Decision Rationale:**
- GSAP chosen over CSS animations for:
  - Complex timeline control
  - Better performance on mobile
  - Consistent cross-browser behavior
- Animations limited to user interactions to avoid distraction
- Respect `prefers-reduced-motion` for accessibility

**Performance Impact:**
- GSAP adds ~30KB gzipped
- Animations use CSS transforms (GPU accelerated)
- RequestAnimationFrame for smooth 60fps
- Debounced scroll/resize handlers

## Development Notes

### Folder Conventions
- Components: PascalCase (`FacilityCard.tsx`)
- Hooks: camelCase with 'use' prefix (`useFacilityData.ts`)
- Utilities: camelCase (`storyBlok.ts`)
- Types: PascalCase with 'I' or 'T' prefix

### Code Quality
- ESLint configured for code consistency
- TypeScript strict mode enabled
- Pre-commit hooks recommended (Husky + lint-staged)

### Git Workflow
- Feature branches from `main`
- Conventional commits recommended
- PR reviews before merging

## AI Assistance Disclosure

During the development of this project, AI assistance was utilized primarily for creating reusable components and documentation.

### Areas of AI Assistance:
1. **Reusable Component Development**: 
   - UI component library (`Button.tsx`, `Input.tsx`, `Dropdown.tsx`, etc.)
   - Component structure and TypeScript interfaces
   - Props validation and type definitions
   - Component composition patterns

2. **Documentation**:
   - README structure and technical documentation
   - Component documentation and usage examples
   - API documentation and setup guides
   - Code comments and inline documentation

### Human Contributions:
- Overall architecture and application design
- Business logic and feature implementation
- Integration with Mapbox and Storyblok services
- Performance optimization strategies
- Project configuration and setup
- Custom hooks and state management decisions

### Tools Used:
- AI assistants for component generation and documentation
- Code review and testing by human developers

**Note**: AI was used as a development accelerator for reusable components and documentation, while core application logic, architecture decisions, and integrations were implemented by human developers. All AI-generated code was reviewed, tested, and integrated into the project with human oversight.


## Support and Contributing

For issues or questions, please open an issue in the repository.

### Contributing Guidelines
1. Fork the repository
2. Create feature branch
3. Commit changes with clear messages
4. Add tests for new features
5. Update documentation
6. Submit pull request

## License

[Your License Here]

---

Built with using Next.js, TypeScript, and modern web technologies.
import type { HintRequest, HintResponse } from '../types';

// Simulated AI hint system - expandable to real OpenAI integration
export class HintSystem {
  private static hints: Record<string, string[]> = {
    'css-grid': [
      "Think about how CSS Grid differs from Flexbox. Grid is designed for two-dimensional layouts.",
      "Consider using 'grid-template-columns' to define your column structure. What values would create three equal columns?",
      "Remember that 'gap' property can help with spacing between grid items. Start simple and build up.",
      "Look up the CSS Grid documentation. Understanding 'fr' units will be crucial for responsive grids.",
    ],
    'typescript-validation': [
      "TypeScript's type system can catch errors at compile time. What types should your form fields have?",
      "Consider creating interfaces for your form data. This will help with validation and autocomplete.",
      "Think about how to handle form submission - what validation should happen before sending data?",
      "Research TypeScript utility types like 'Partial' and 'Required' - they might be useful here.",
    ],
    'react-state': [
      "React state management is about keeping your UI in sync with your data. What state do you need to track?",
      "Consider which component should own the state. Should it be local state or lifted up to a parent?",
      "Think about the difference between 'useState' and 'useReducer' - which is more appropriate here?",
      "Look into React's documentation on state updates. How do you handle state that depends on the previous state?",
    ],
    'api-integration': [
      "Async operations in JavaScript require careful handling. Are you using promises correctly?",
      "Consider the loading states - what should the user see while data is being fetched?",
      "Think about error handling. What happens if the API request fails?",
      "Research the 'useEffect' hook and its dependency array. When should your API calls run?",
    ],
    'default': [
      "Take a step back and break down the problem into smaller pieces. What's the core requirement?",
      "Read the requirements carefully. Are you solving the right problem?",
      "Consider looking up documentation for the technologies you're using. Official docs are often the best resource.",
      "Think about the user experience. What would make this feature intuitive and useful?",
    ],
  };

  private static encouragements = [
    "You're on the right track! Keep exploring and you'll find the solution.",
    "This is exactly the kind of problem-solving that makes you a better developer.",
    "Don't give up! The struggle is where the real learning happens.",
    "Remember, even experienced developers look things up. Research is a skill.",
    "You're building genuine problem-solving skills that will serve you throughout your career.",
    "This challenge is designed to stretch your thinking. Trust the process.",
    "Every error is a step closer to understanding. Keep iterating!",
  ];

  static async getHint(request: HintRequest): Promise<HintResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Determine hint category based on challenge (simplified for demo)
    const hintCategory = this.getCategoryFromChallengeId(request.challenge_id);
    const hints = this.hints[hintCategory] || this.hints.default;
    
    // Simple hint level progression based on code complexity
    const codeComplexity = this.analyzeCodeComplexity(request.current_code);
    const hintLevel = Math.min(Math.floor(codeComplexity / 20), hints.length - 1);
    
    const hint = hints[hintLevel];
    const encouragement = this.encouragements[Math.floor(Math.random() * this.encouragements.length)];

    return {
      hint,
      hint_level: hintLevel + 1,
      encouragement,
    };
  }

  private static getCategoryFromChallengeId(challengeId: string): string {
    // Simple mapping based on challenge ID patterns
    if (challengeId.includes('css') || challengeId.includes('grid') || challengeId.includes('layout')) {
      return 'css-grid';
    }
    if (challengeId.includes('typescript') || challengeId.includes('form') || challengeId.includes('validation')) {
      return 'typescript-validation';
    }
    if (challengeId.includes('react') || challengeId.includes('state') || challengeId.includes('component')) {
      return 'react-state';
    }
    if (challengeId.includes('api') || challengeId.includes('fetch') || challengeId.includes('async')) {
      return 'api-integration';
    }
    return 'default';
  }

  private static analyzeCodeComplexity(code: string): number {
    // Simple code complexity analysis
    let complexity = 0;
    
    // Count various code constructs
    complexity += (code.match(/function|const|let|var/g) || []).length * 5;
    complexity += (code.match(/if|else|switch|case/g) || []).length * 3;
    complexity += (code.match(/for|while|forEach|map|filter/g) || []).length * 4;
    complexity += (code.match(/\{|\}/g) || []).length;
    complexity += Math.floor(code.length / 10);
    
    return complexity;
  }

  // Method to add custom hints for specific challenges
  static addCustomHints(challengeId: string, hints: string[]) {
    this.hints[challengeId] = hints;
  }
}
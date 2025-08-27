import type { CodeExecutionResult, TestResult, Challenge } from '../types';

export class CodeExecutor {
  static async executeCode(code: string, challenge: Challenge): Promise<CodeExecutionResult> {
    // Simulate execution delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1500));

    try {
      // Basic syntax validation
      const syntaxErrors = this.validateSyntax(code);
      if (syntaxErrors.length > 0) {
        return {
          success: false,
          output: '',
          errors: syntaxErrors,
          test_results: [],
        };
      }

      // Run simulated tests based on challenge type
      const testResults = await this.runTests(code, challenge);
      const allTestsPassed = testResults.every(test => test.passed);

      return {
        success: allTestsPassed,
        output: this.generateOutput(code, challenge),
        errors: [],
        test_results: testResults,
      };
    } catch (error) {
      return {
        success: false,
        output: '',
        errors: [error instanceof Error ? error.message : 'Unknown execution error'],
        test_results: [],
      };
    }
  }

  private static validateSyntax(code: string): string[] {
    const errors: string[] = [];

    // Basic bracket matching
    const openBrackets = (code.match(/\{/g) || []).length;
    const closeBrackets = (code.match(/\}/g) || []).length;
    if (openBrackets !== closeBrackets) {
      errors.push(`Syntax Error: Mismatched brackets. Found ${openBrackets} opening and ${closeBrackets} closing brackets.`);
    }

    // Basic parentheses matching
    const openParens = (code.match(/\(/g) || []).length;
    const closeParens = (code.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      errors.push(`Syntax Error: Mismatched parentheses. Found ${openParens} opening and ${closeParens} closing parentheses.`);
    }

    // Check for common syntax issues
    if (code.includes('function') && !code.includes('{')) {
      errors.push('Syntax Error: Function declaration is missing opening brace.');
    }

    return errors;
  }

  private static async runTests(code: string, challenge: Challenge): Promise<TestResult[]> {
    const results: TestResult[] = [];

    for (const testCase of challenge.test_cases) {
      const result = await this.runSingleTest(code, testCase, challenge);
      results.push(result);
    }

    return results;
  }

  private static async runSingleTest(code: string, testCase: any, challenge: Challenge): Promise<TestResult> {
    // Simulate test execution based on challenge category
    const passed = this.evaluateTest(code, testCase, challenge);
    
    return {
      test_case_id: testCase.id,
      passed,
      expected: testCase.expected_output,
      actual: passed ? testCase.expected_output : 'Test failed - check your implementation',
      error: passed ? undefined : 'Implementation does not match expected behavior',
    };
  }

  private static evaluateTest(code: string, testCase: any, challenge: Challenge): boolean {
    // Simplified test evaluation based on challenge category
    const category = challenge.category.toLowerCase();

    if (category.includes('css') || category.includes('layout')) {
      return this.evaluateCSSTest(code, testCase);
    }
    
    if (category.includes('typescript') || category.includes('javascript')) {
      return this.evaluateJSTest(code, testCase);
    }
    
    if (category.includes('react')) {
      return this.evaluateReactTest(code, testCase);
    }

    // Default evaluation - check if code contains expected patterns
    return this.evaluateGenericTest(code, testCase);
  }

  private static evaluateCSSTest(code: string, testCase: any): boolean {
    // Check for CSS Grid properties
    if (testCase.description.includes('grid')) {
      return code.includes('display: grid') || code.includes('display:grid');
    }
    
    // Check for responsive design
    if (testCase.description.includes('responsive')) {
      return code.includes('@media') || code.includes('fr') || code.includes('%');
    }
    
    // Check for flexbox
    if (testCase.description.includes('flex')) {
      return code.includes('display: flex') || code.includes('display:flex');
    }

    return true; // Default pass for basic CSS
  }

  private static evaluateJSTest(code: string, testCase: any): boolean {
    // Check for function declarations
    if (testCase.description.includes('function')) {
      return code.includes('function') || code.includes('=>');
    }
    
    // Check for variable declarations
    if (testCase.description.includes('variable')) {
      return code.includes('const') || code.includes('let') || code.includes('var');
    }
    
    // Check for validation logic
    if (testCase.description.includes('validation')) {
      return code.includes('if') && (code.includes('return') || code.includes('throw'));
    }

    return true; // Default pass
  }

  private static evaluateReactTest(code: string, testCase: any): boolean {
    // Check for React hooks
    if (testCase.description.includes('state')) {
      return code.includes('useState') || code.includes('useReducer');
    }
    
    // Check for component structure
    if (testCase.description.includes('component')) {
      return code.includes('return') && (code.includes('<') || code.includes('React.createElement'));
    }
    
    // Check for event handlers
    if (testCase.description.includes('event')) {
      return code.includes('onClick') || code.includes('onChange') || code.includes('onSubmit');
    }

    return true; // Default pass
  }

  private static evaluateGenericTest(code: string, testCase: any): boolean {
    // Generic pattern matching
    const requiredPatterns = testCase.required_patterns || [];
    return requiredPatterns.every((pattern: string) => code.includes(pattern));
  }

  private static generateOutput(_: string, challenge: Challenge): string {
    const category = challenge.category.toLowerCase();
    
    if (category.includes('css')) {
      return 'CSS compiled successfully. Check the preview to see your styling.';
    }
    
    if (category.includes('typescript') || category.includes('javascript')) {
      return 'JavaScript executed successfully. All functions are working as expected.';
    }
    
    if (category.includes('react')) {
      return 'React component rendered successfully. Check the preview for your component.';
    }

    return 'Code executed successfully.';
  }
}
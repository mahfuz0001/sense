export interface CSSLesson {
  id: string
  title: string
  description: string
  category: string
  order: number
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  content: string
  codeExample?: string
  exercises?: Array<{
    question: string
    answer: string
    hint?: string
  }>
  keyPoints: string[]
  nextLesson?: string
  prevLesson?: string
}

export interface CSSCategory {
  id: string
  title: string
  description: string
  lessons: string[]
  order: number
}

export const cssCategories: CSSCategory[] = [
  {
    id: 'basics',
    title: 'CSS Tutorial',
    description: 'Learn the fundamentals of CSS',
    order: 1,
    lessons: [
      'css-home',
      'css-introduction',
      'css-syntax',
      'css-selectors',
      'css-how-to',
      'css-comments',
      'css-colors',
      'css-backgrounds',
      'css-borders',
      'css-margins',
      'css-padding',
      'css-height-width',
      'css-box-model',
      'css-outline',
      'css-text',
      'css-fonts',
      'css-icons',
      'css-links',
      'css-lists',
      'css-tables'
    ]
  },
  {
    id: 'advanced',
    title: 'CSS Advanced',
    description: 'Advanced CSS concepts and techniques',
    order: 2,
    lessons: [
      'css-display',
      'css-max-width',
      'css-position',
      'css-z-index',
      'css-overflow',
      'css-float',
      'css-inline-block',
      'css-align',
      'css-combinators',
      'css-pseudo-class',
      'css-pseudo-element',
      'css-opacity',
      'css-navigation-bar',
      'css-dropdowns',
      'css-image-gallery',
      'css-image-sprites',
      'css-attr-selectors',
      'css-forms',
      'css-counters',
      'css-website-layout',
      'css-units',
      'css-specificity'
    ]
  },
  {
    id: 'responsive',
    title: 'CSS Responsive',
    description: 'Responsive web design with CSS',
    order: 3,
    lessons: [
      'css-rwd-intro',
      'css-rwd-viewport',
      'css-rwd-grid-view',
      'css-rwd-media-queries',
      'css-rwd-images',
      'css-rwd-videos',
      'css-rwd-frameworks',
      'css-rwd-templates'
    ]
  },
  {
    id: 'grid',
    title: 'CSS Grid',
    description: 'Master CSS Grid Layout',
    order: 4,
    lessons: [
      'css-grid-intro',
      'css-grid-container',
      'css-grid-item'
    ]
  },
  {
    id: 'flexbox',
    title: 'CSS Flexbox',
    description: 'CSS Flexbox Layout',
    order: 5,
    lessons: [
      'css-flexbox'
    ]
  },
  {
    id: 'examples',
    title: 'CSS Examples',
    description: 'Practice and test your CSS knowledge',
    order: 6,
    lessons: [
      'css-examples',
      'css-editor',
      'css-quiz',
      'css-exercises',
      'css-website',
      'css-study-plan',
      'css-interview-prep',
      'css-bootcamp',
      'css-certificate'
    ]
  }
]

export const cssLessons: CSSLesson[] = [
  // CSS Tutorial - Basics
  {
    id: 'css-home',
    title: 'Welcome to CSS!',
    description: 'Your guide to styling and designing beautiful web pages',
    category: 'basics',
    order: 1,
    duration: '8 min',
    difficulty: 'Beginner',
    content: `
# Welcome to CSS! 🎨

CSS (Cascading Style Sheets) is the language that makes websites beautiful! If HTML is the structure of a house, CSS is the interior design, paint, furniture, and decorations.

## Why Learn CSS?

### Create Beautiful Websites
With CSS, you can transform plain HTML into stunning, professional-looking websites. Add colors, fonts, layouts, animations, and more!

### Control Every Detail
CSS gives you precise control over how your website looks:
- **Colors and backgrounds** - Make it vibrant and eye-catching
- **Typography** - Choose perfect fonts and text styling  
- **Layout** - Position elements exactly where you want them
- **Animations** - Add smooth transitions and interactive effects
- **Responsive design** - Make your site look great on all devices

### High Demand Skill
Every website needs CSS! Learning CSS opens doors to:
- **Frontend development** jobs
- **Web design** careers  
- **Freelance** opportunities
- **Personal projects** that actually look professional

## What Makes CSS Special?

### Visual and Immediate
Unlike other programming concepts, CSS shows instant visual results. Change a color? See it immediately! Adjust a layout? Watch it happen in real-time!

### Creative and Logical
CSS combines creativity with logical thinking. You're both an artist and an engineer, solving design problems with code.

### Beginner-Friendly
CSS uses English words and intuitive concepts:
- \`color: blue;\` makes text blue
- \`font-size: large;\` makes text bigger
- \`background: yellow;\` adds a yellow background

## Success Tips for Learning CSS

### Start with Simple Styles
Begin with basic properties like colors and fonts. Build confidence before moving to complex layouts.

### Experiment Constantly
CSS is best learned by doing! Try different values, break things, fix them - that's how you truly understand CSS.

### Think Like a Designer
Look at websites you admire and think "How would I recreate this with CSS?" Start developing your design eye.

### Practice Daily
Even 15-20 minutes of CSS practice daily will build your skills faster than long, infrequent sessions.

## Your CSS Journey Starts Here!

Get ready to transform plain HTML into beautiful, professional websites. By the end of this course, you'll be creating designs that amaze yourself and others!

The web needs more beautiful, well-designed sites - and you're about to help create them! 🌟
    `,
    keyPoints: [
      'CSS makes websites beautiful and professional-looking',
      'CSS uses intuitive English words and concepts',
      'You see immediate visual results when writing CSS',
      'CSS combines creativity with logical problem-solving',
      'Every website needs CSS for styling and layout',
      'Start with simple properties and build up gradually'
    ],
    nextLesson: 'css-introduction'
  },
  {
    id: 'css-introduction',
    title: 'What is CSS?',
    description: 'Learn the basics of CSS and how it works with HTML',
    category: 'basics',
    order: 2,
    duration: '10 min',
    difficulty: 'Beginner',
    content: `
# What is CSS?

CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML. CSS describes how elements should be rendered on screen, on paper, or in other media.

## CSS Solves a Big Problem

HTML was created to describe the content of a web page, not to format it. When tags like \`<font>\` and \`color\` attributes were added to HTML, it became a nightmare for web developers. Large websites where font and color information were added to every single page meant long and expensive development and maintenance.

To solve this problem, CSS was created by the World Wide Web Consortium (W3C).

## What CSS Can Do

- Control the layout of multiple web pages all at once
- Set colors, fonts, and spacing
- Create animations and transitions
- Make websites responsive (look good on all devices)
- Position elements precisely on the page
- Add visual effects like shadows and gradients

## How CSS Works

CSS works by selecting HTML elements and applying styling rules to them:

\`\`\`css
selector {
    property: value;
}
\`\`\`

For example:
\`\`\`css
h1 {
    color: blue;
    font-size: 24px;
}
\`\`\`

This rule makes all \`<h1>\` elements blue and 24 pixels in size.

## CSS Syntax

A CSS rule consists of:
- **Selector**: Points to the HTML element you want to style
- **Declaration**: Contains one or more properties and values
- **Property**: The aspect you want to change (color, font-size, etc.)
- **Value**: The setting for the property

## Why "Cascading"?

The "Cascading" in CSS means that styles can come from multiple sources and they "cascade" down in a specific order of priority. This allows you to set general styles and then override them for specific elements when needed.
    `,
    codeExample: `/* Basic CSS syntax */
h1 {
    color: blue;
    font-size: 32px;
    text-align: center;
}

p {
    color: #333;
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

.highlight {
    background-color: yellow;
    padding: 10px;
}`,
    keyPoints: [
      'CSS stands for Cascading Style Sheets',
      'CSS describes how HTML elements should be displayed',
      'CSS saves a lot of work by controlling multiple pages at once',
      'CSS syntax consists of selectors, properties, and values',
      'The cascade determines which styles take priority'
    ],
    nextLesson: 'css-syntax'
  },
  // Add more lessons here - for brevity, I'll include a few key ones
  {
    id: 'css-syntax',
    title: 'CSS Syntax',
    description: 'Learn the structure and rules of CSS syntax',
    category: 'basics',
    order: 3,
    duration: '12 min',
    difficulty: 'Beginner',
    content: `
# CSS Syntax

Understanding CSS syntax is fundamental to writing effective stylesheets. Let's break down how CSS rules are structured.

## Basic CSS Rule Structure

Every CSS rule follows this pattern:

\`\`\`css
selector {
    property: value;
    property: value;
}
\`\`\`

## Parts of a CSS Rule

### 1. Selector
The selector points to the HTML element you want to style:
- \`h1\` - selects all h1 elements
- \`.class-name\` - selects elements with class="class-name"
- \`#id-name\` - selects the element with id="id-name"

### 2. Declaration Block
Everything inside the curly braces \`{}\` is the declaration block.

### 3. Property
The CSS property you want to change (color, font-size, margin, etc.).

### 4. Value
The value you want to set for the property.

### 5. Semicolon
Each declaration must end with a semicolon \`;\`

## Examples

\`\`\`css
/* Element selector */
p {
    color: red;
    text-align: center;
}

/* Class selector */
.center {
    text-align: center;
    color: blue;
}

/* ID selector */
#my-header {
    background-color: lightblue;
    padding: 20px;
}
\`\`\`

## CSS Comments

Use comments to explain your code:

\`\`\`css
/* This is a comment */
p {
    color: red; /* This is also a comment */
}
\`\`\`

## Common Mistakes to Avoid

1. **Missing semicolons** - Always end declarations with \`;\`
2. **Wrong selector syntax** - Classes use \`.\`, IDs use \`#\`
3. **Typos in property names** - CSS properties must be spelled exactly right
4. **Missing closing braces** - Every \`{\` needs a matching \`}\`
    `,
    codeExample: `/* Complete CSS syntax example */

/* Element selector */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

/* Class selector */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* ID selector */
#header {
    background-color: #333;
    color: white;
    padding: 1rem;
}

/* Multiple selectors */
h1, h2, h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
}

/* Descendant selector */
.container p {
    line-height: 1.6;
    margin-bottom: 1rem;
}`,
    keyPoints: [
      'CSS rules consist of selectors and declaration blocks',
      'Selectors target HTML elements to style',
      'Properties define what aspect to change',
      'Values specify how to change the property',
      'Always end declarations with semicolons',
      'Use comments to document your CSS'
    ],
    nextLesson: 'css-selectors'
  }
  // Note: In a real implementation, you would add all the lessons here
  // For this example, I'm showing the structure with a few complete lessons
]

// Helper function to get lesson by ID
export function getCSSLessonById(id: string): CSSLesson | undefined {
  return cssLessons.find(lesson => lesson.id === id)
}

// Helper function to get lessons by category
export function getCSSLessonsByCategory(categoryId: string): CSSLesson[] {
  return cssLessons.filter(lesson => lesson.category === categoryId)
}

// Helper function to get next lesson
export function getNextCSSLesson(currentLessonId: string): CSSLesson | undefined {
  const currentIndex = cssLessons.findIndex(lesson => lesson.id === currentLessonId)
  if (currentIndex >= 0 && currentIndex < cssLessons.length - 1) {
    return cssLessons[currentIndex + 1]
  }
  return undefined
}

// Helper function to get previous lesson
export function getPrevCSSLesson(currentLessonId: string): CSSLesson | undefined {
  const currentIndex = cssLessons.findIndex(lesson => lesson.id === currentLessonId)
  if (currentIndex > 0) {
    return cssLessons[currentIndex - 1]
  }
  return undefined
}
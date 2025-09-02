export interface JavaScriptLesson {
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

export interface JavaScriptCategory {
  id: string
  title: string
  description: string
  lessons: string[]
  order: number
}

export const javascriptCategories: JavaScriptCategory[] = [
  {
    id: 'basics',
    title: 'JavaScript Tutorial',
    description: 'Learn the fundamentals of JavaScript',
    order: 1,
    lessons: [
      'js-home',
      'js-introduction',
      'js-where-to',
      'js-output',
      'js-statements',
      'js-syntax',
      'js-comments',
      'js-variables',
      'js-let',
      'js-const',
      'js-operators',
      'js-arithmetic',
      'js-assignment',
      'js-data-types',
      'js-functions',
      'js-objects',
      'js-events',
      'js-strings',
      'js-string-methods',
      'js-string-search',
      'js-string-templates',
      'js-numbers',
      'js-number-methods',
      'js-arrays',
      'js-array-methods',
      'js-array-sort',
      'js-array-iteration',
      'js-array-const',
      'js-dates',
      'js-date-formats',
      'js-date-get-methods',
      'js-date-set-methods',
      'js-math',
      'js-random',
      'js-booleans',
      'js-comparisons',
      'js-if-else',
      'js-switch',
      'js-loop-for',
      'js-loop-for-in',
      'js-loop-for-of',
      'js-loop-while',
      'js-break',
      'js-iterables',
      'js-sets',
      'js-maps',
      'js-typeof',
      'js-type-conversion',
      'js-bitwise',
      'js-regexp',
      'js-errors',
      'js-scope',
      'js-hoisting',
      'js-strict',
      'js-this',
      'js-arrow-function',
      'js-classes',
      'js-modules',
      'js-json',
      'js-debugging',
      'js-style-guide',
      'js-best-practices',
      'js-common-mistakes',
      'js-performance'
    ]
  },
  {
    id: 'functions',
    title: 'JavaScript Functions',
    description: 'Master JavaScript functions and scope',
    order: 2,
    lessons: [
      'js-function-definitions',
      'js-function-parameters',
      'js-function-invocation',
      'js-function-call',
      'js-function-apply',
      'js-function-bind',
      'js-function-closures'
    ]
  },
  {
    id: 'objects',
    title: 'JavaScript Objects',
    description: 'Understanding JavaScript objects and OOP',
    order: 3,
    lessons: [
      'js-object-definition',
      'js-object-properties',
      'js-object-methods',
      'js-object-display',
      'js-object-accessors',
      'js-object-constructors',
      'js-object-prototypes',
      'js-object-iterables',
      'js-object-sets',
      'js-object-maps'
    ]
  },
  {
    id: 'classes',
    title: 'JavaScript Classes',
    description: 'Object-oriented programming with JavaScript classes',
    order: 4,
    lessons: [
      'js-class-intro',
      'js-class-inheritance',
      'js-class-static'
    ]
  },
  {
    id: 'async',
    title: 'JavaScript Async',
    description: 'Asynchronous JavaScript programming',
    order: 5,
    lessons: [
      'js-callback',
      'js-asynchronous',
      'js-promises',
      'js-async'
    ]
  },
  {
    id: 'dom',
    title: 'JavaScript HTML DOM',
    description: 'Manipulating HTML with JavaScript',
    order: 6,
    lessons: [
      'js-htmldom',
      'js-htmldom-document',
      'js-htmldom-elements',
      'js-htmldom-html',
      'js-htmldom-forms',
      'js-htmldom-css',
      'js-htmldom-animations',
      'js-htmldom-events',
      'js-htmldom-event-listener',
      'js-htmldom-navigation',
      'js-htmldom-nodes',
      'js-htmldom-collections',
      'js-htmldom-node-lists'
    ]
  },
  {
    id: 'browser',
    title: 'JavaScript Browser BOM',
    description: 'Browser Object Model and Web APIs',
    order: 7,
    lessons: [
      'js-window',
      'js-screen',
      'js-location',
      'js-history',
      'js-navigator',
      'js-popup',
      'js-timing',
      'js-cookies'
    ]
  },
  {
    id: 'web-apis',
    title: 'JavaScript Web APIs',
    description: 'Modern web APIs and features',
    order: 8,
    lessons: [
      'js-api-intro',
      'js-api-forms',
      'js-api-history',
      'js-api-storage',
      'js-api-worker',
      'js-api-fetch',
      'js-api-geolocation'
    ]
  },
  {
    id: 'ajax',
    title: 'JavaScript AJAX',
    description: 'Asynchronous web requests',
    order: 9,
    lessons: [
      'js-ajax-intro',
      'js-ajax-xmlhttp',
      'js-ajax-request',
      'js-ajax-response',
      'js-ajax-xml-file',
      'js-ajax-php',
      'js-ajax-asp',
      'js-ajax-database',
      'js-ajax-applications',
      'js-ajax-examples'
    ]
  },
  {
    id: 'examples',
    title: 'JavaScript Examples',
    description: 'Practice and test your JavaScript knowledge',
    order: 10,
    lessons: [
      'js-examples',
      'js-editor',
      'js-quiz',
      'js-exercises',
      'js-website',
      'js-study-plan',
      'js-interview-prep',
      'js-bootcamp',
      'js-certificate'
    ]
  }
]

export const javascriptLessons: JavaScriptLesson[] = [
  // JavaScript Tutorial - Basics
  {
    id: 'js-home',
    title: 'Welcome to JavaScript!',
    description: 'Your gateway to interactive and dynamic web development',
    category: 'basics',
    order: 1,
    duration: '10 min',
    difficulty: 'Beginner',
    content: `
# Welcome to JavaScript! ⚡

JavaScript is the programming language that brings websites to life! If HTML is the structure and CSS is the styling, JavaScript is the **behavior** that makes websites interactive, dynamic, and engaging.

## Why Learn JavaScript?

### Make Websites Interactive
JavaScript transforms static websites into dynamic experiences:
- **Click buttons** that actually do something
- **Form validation** that helps users in real-time
- **Animations** and smooth transitions
- **Dynamic content** that updates without page refreshes
- **Interactive games** and applications

### It's Everywhere!
JavaScript runs on:
- 🌐 **Every web browser** (Chrome, Firefox, Safari, Edge)
- 🖥️ **Desktop applications** (using Electron)
- 📱 **Mobile apps** (React Native, Ionic)
- 🖥️ **Servers** (Node.js)
- 🤖 **IoT devices** and embedded systems

### High-Demand Career Skills
JavaScript developers are in huge demand:
- **Frontend Developer** - Build user interfaces
- **Backend Developer** - Create server applications  
- **Full-Stack Developer** - Handle both frontend and backend
- **Mobile App Developer** - Build cross-platform apps
- **Game Developer** - Create browser and mobile games

## What Makes JavaScript Special?

### Beginner-Friendly
JavaScript is designed to be approachable:
- **No complex setup** - runs right in your browser
- **Immediate feedback** - see results instantly
- **Forgiving syntax** - small mistakes won't crash everything
- **English-like commands** - \`alert("Hello")\` does exactly what it says

### Powerful and Flexible
Despite being beginner-friendly, JavaScript is incredibly powerful:
- **Object-oriented** and **functional** programming styles
- **Dynamic typing** - variables can hold any type of data
- **Rich ecosystem** - millions of libraries and frameworks
- **Constantly evolving** - new features added regularly

### Learn Once, Use Everywhere
Master JavaScript once, and you can build:
- Websites and web applications
- Mobile apps for iOS and Android
- Desktop applications for Windows, Mac, and Linux
- Server-side applications and APIs
- Games, data visualizations, and more!

## Success Tips for Learning JavaScript

### Start with the Browser
Use your browser's developer tools to experiment. Press F12 and start coding in the console!

### Build Real Projects
Don't just follow tutorials - build calculators, to-do lists, games, and tools you actually want to use.

### Practice Daily
Even 20-30 minutes of coding practice daily will make you proficient faster than weekend cramming sessions.

### Embrace Debugging
Every programmer writes bugs! Learning to find and fix errors is a crucial skill that gets easier with practice.

### Join the Community
JavaScript has one of the most welcoming programming communities. Don't hesitate to ask questions!

## Your JavaScript Adventure Begins!

You're about to learn the most popular programming language in the world. JavaScript will empower you to create amazing, interactive experiences that millions of people can use.

From simple button clicks to complex web applications, your JavaScript journey starts here! 🚀

Ready to make the web more interactive? Let's code!
    `,
    keyPoints: [
      'JavaScript makes websites interactive and dynamic',
      'JavaScript runs everywhere: browsers, servers, mobile apps, and more',
      'JavaScript developers are in high demand across many industries',
      'JavaScript is beginner-friendly but incredibly powerful',
      'You can build almost anything with JavaScript',
      'Practice daily and build real projects to master JavaScript'
    ],
    nextLesson: 'js-introduction'
  },
  {
    id: 'js-introduction',
    title: 'What is JavaScript?',
    description: 'Learn what JavaScript is and what it can do',
    category: 'basics',
    order: 2,
    duration: '12 min',
    difficulty: 'Beginner',
    content: `
# What is JavaScript?

JavaScript is a programming language that enables interactive web pages. It is an essential part of web applications alongside HTML and CSS.

## JavaScript vs Other Languages

### JavaScript is Different
Unlike languages like Java or C++, JavaScript:
- **Runs in the browser** - no special software needed
- **Interpreted** - code runs directly, no compilation step
- **Dynamically typed** - variables can change types
- **Event-driven** - responds to user actions like clicks and key presses

### The Frontend Trinity
- **HTML** = Structure (the skeleton)
- **CSS** = Presentation (the skin and clothing)  
- **JavaScript** = Behavior (the muscles and brain)

## What Can JavaScript Do?

### In the Browser (Frontend)
- Change HTML content and attributes
- Change CSS styles dynamically
- Validate form data before submission
- Create animations and effects
- Respond to user events (clicks, hovers, key presses)
- Communicate with servers (AJAX)
- Store data locally in the browser
- Create interactive games and applications

### On the Server (Backend)
With Node.js, JavaScript can also:
- Handle HTTP requests and responses
- Access databases
- Manage file systems
- Create APIs and web services
- Real-time applications with WebSockets

### Mobile Development
- React Native for iOS and Android apps
- Ionic for hybrid mobile applications
- Progressive Web Apps (PWAs)

### Desktop Applications
- Electron for cross-platform desktop apps
- Examples: VS Code, Discord, Slack, WhatsApp Desktop

## JavaScript Versions

JavaScript is constantly evolving:
- **ES5 (2009)** - Stable foundation
- **ES6/ES2015** - Major update with classes, arrow functions, modules
- **ES2016-ES2023** - Yearly updates with new features
- **Modern JavaScript** - Latest features for cleaner, more powerful code

## Why JavaScript is Perfect for Beginners

### Immediate Feedback
Open any browser, press F12, and start coding! See results instantly in the console.

### No Setup Required
Unlike other languages, you don't need to install compilers, IDEs, or complex development environments.

### Visual Results
JavaScript often produces visual changes you can see immediately, making learning more engaging.

### Huge Community
Millions of developers worldwide use JavaScript. Help is always available!

### Career Opportunities
JavaScript skills translate directly to job opportunities in web development, mobile apps, and more.

## Let's Get Started!

In the next lessons, we'll learn:
1. How to write your first JavaScript code
2. Where to put JavaScript in your web pages
3. Basic syntax and commands
4. Variables, functions, and control structures

Ready to bring your web pages to life? Let's dive in! 🏊‍♂️
    `,
    codeExample: `// Your first JavaScript code!
console.log("Hello, World!");

// Change webpage content
document.getElementById("demo").innerHTML = "JavaScript is awesome!";

// Respond to button clicks
function sayHello() {
    alert("Hello from JavaScript!");
}

// Simple calculation
let result = 10 + 5;
console.log("10 + 5 = " + result);

// Work with arrays
let fruits = ["apple", "banana", "orange"];
console.log("I have " + fruits.length + " fruits");`,
    keyPoints: [
      'JavaScript is the programming language of the web',
      'JavaScript makes web pages interactive and dynamic',
      'JavaScript runs in browsers, servers, mobile apps, and desktop applications',
      'No special software needed - just a web browser to get started',
      'JavaScript is perfect for beginners with immediate visual feedback',
      'Huge career opportunities in web development and beyond'
    ],
    nextLesson: 'js-where-to'
  },
  {
    id: 'js-where-to',
    title: 'Where To Put JavaScript',
    description: 'Learn the different ways to include JavaScript in your web pages',
    category: 'basics',
    order: 3,
    duration: '15 min',
    difficulty: 'Beginner',
    content: `
# Where To Put JavaScript

JavaScript can be placed in several locations within your HTML documents. Let's explore the different ways and when to use each.

## 1. Inline JavaScript (In HTML Elements)

You can put JavaScript directly in HTML elements using event attributes:

\`\`\`html
<button onclick="alert('Hello!')">Click Me</button>
<p onmouseover="this.style.color='red'">Hover over me</p>
\`\`\`

**When to use:**
- Quick, simple interactions
- Prototyping and testing

**Avoid for:**
- Complex functionality
- Production websites (hard to maintain)

## 2. Internal JavaScript (In the \`<script>\` tag)

Place JavaScript inside \`<script>\` tags within your HTML document:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
    <script>
        function sayHello() {
            alert("Hello from internal JavaScript!");
        }
    </script>
</head>
<body>
    <button onclick="sayHello()">Click Me</button>
    
    <script>
        // JavaScript can also go in the body
        console.log("Page is loading...");
    </script>
</body>
</html>
\`\`\`

**When to use:**
- Small to medium scripts
- Page-specific functionality
- When you want everything in one file

## 3. External JavaScript (Separate .js files)

Create separate .js files and link them to your HTML:

**script.js**:
\`\`\`javascript
function greetUser(name) {
    return "Hello, " + name + "!";
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("External script loaded!");
});
\`\`\`

**index.html**:
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
    <script src="script.js"></script>
</head>
<body>
    <h1>Welcome!</h1>
</body>
</html>
\`\`\`

**When to use:**
- Larger applications
- Code reused across multiple pages
- Better organization and maintenance
- Production websites

## Script Placement: \`<head>\` vs \`<body>\`

### In the \`<head>\`
\`\`\`html
<head>
    <script src="script.js"></script>
</head>
\`\`\`

**Pros:**
- Loaded before page content
- Available immediately

**Cons:**
- Can slow down page loading
- May try to access elements that don't exist yet

### At the end of \`<body>\`
\`\`\`html
<body>
    <!-- HTML content -->
    <script src="script.js"></script>
</body>
\`\`\`

**Pros:**
- Page loads faster
- All HTML elements exist when script runs
- **Recommended approach**

**Cons:**
- Script loads after content

### Using \`defer\` and \`async\`

**Defer** - script runs after HTML is parsed:
\`\`\`html
<script src="script.js" defer></script>
\`\`\`

**Async** - script runs as soon as it's downloaded:
\`\`\`html
<script src="script.js" async></script>
\`\`\`

## Best Practices

### 1. Use External Files
For any substantial JavaScript, use external .js files:
\`\`\`html
<script src="js/main.js"></script>
<script src="js/utils.js"></script>
\`\`\`

### 2. Place Scripts at the Bottom
Put \`<script>\` tags just before the closing \`</body>\` tag:
\`\`\`html
<body>
    <!-- Your HTML content -->
    <script src="script.js"></script>
</body>
\`\`\`

### 3. Use Comments
Document your JavaScript code:
\`\`\`javascript
// This function validates user input
function validateEmail(email) {
    // Check if email contains @ symbol
    return email.includes('@');
}
\`\`\`

### 4. Organize Your Files
Create a logical file structure:
\`\`\`
project/
  ├── index.html
  ├── css/
  │   └── style.css
  └── js/
      ├── main.js
      ├── utils.js
      └── components/
          ├── header.js
          └── footer.js
\`\`\`

## Testing Your Setup

Create this simple test to verify JavaScript is working:

**test.html**:
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Test</title>
</head>
<body>
    <h1>JavaScript Test Page</h1>
    <button id="testBtn">Test JavaScript</button>
    
    <script>
        document.getElementById('testBtn').onclick = function() {
            alert('JavaScript is working!');
        };
    </script>
</body>
</html>
\`\`\`

Open this file in your browser and click the button. If you see an alert, JavaScript is working!

## Next Steps

Now that you know where to put JavaScript, let's learn how to display output and interact with users in the next lesson!
    `,
    codeExample: `<!-- Complete example showing different JavaScript placement methods -->
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Placement Demo</title>
    <!-- External JavaScript -->
    <script src="utilities.js" defer></script>
    
    <!-- Internal JavaScript in head -->
    <script>
        function headerFunction() {
            console.log("This runs from the head section");
        }
    </script>
</head>
<body>
    <h1>JavaScript Placement Examples</h1>
    
    <!-- Inline JavaScript -->
    <button onclick="alert('Inline JavaScript!')">Inline Example</button>
    
    <button onclick="headerFunction()">Head Script Example</button>
    
    <button id="bodyBtn">Body Script Example</button>
    
    <!-- Internal JavaScript in body -->
    <script>
        // This script runs after the HTML above is loaded
        document.getElementById('bodyBtn').onclick = function() {
            alert('JavaScript from body section!');
        };
        
        console.log("Body script loaded");
    </script>
</body>
</html>`,
    keyPoints: [
      'JavaScript can be placed inline, internally, or in external files',
      'External .js files are best for larger applications and reusable code',
      'Place scripts at the end of the body for better page loading',
      'Use defer or async attributes to control script loading',
      'Organize JavaScript files in a logical folder structure',
      'Always test that your JavaScript is working correctly'
    ],
    nextLesson: 'js-output'
  }
  // Note: In a real implementation, you would add all the lessons here
  // For this example, I'm showing the structure with a few complete lessons
]

// Helper function to get lesson by ID
export function getJavaScriptLessonById(id: string): JavaScriptLesson | undefined {
  return javascriptLessons.find(lesson => lesson.id === id)
}

// Helper function to get lessons by category
export function getJavaScriptLessonsByCategory(categoryId: string): JavaScriptLesson[] {
  return javascriptLessons.filter(lesson => lesson.category === categoryId)
}

// Helper function to get next lesson
export function getNextJavaScriptLesson(currentLessonId: string): JavaScriptLesson | undefined {
  const currentIndex = javascriptLessons.findIndex(lesson => lesson.id === currentLessonId)
  if (currentIndex >= 0 && currentIndex < javascriptLessons.length - 1) {
    return javascriptLessons[currentIndex + 1]
  }
  return undefined
}

// Helper function to get previous lesson
export function getPrevJavaScriptLesson(currentLessonId: string): JavaScriptLesson | undefined {
  const currentIndex = javascriptLessons.findIndex(lesson => lesson.id === currentLessonId)
  if (currentIndex > 0) {
    return javascriptLessons[currentIndex - 1]
  }
  return undefined
}
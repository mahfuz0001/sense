import type { Challenge } from '../types';

// Easy HTML Challenges - Progressive difficulty
export const easyHtmlChallenges: Challenge[] = [
  {
    id: 'html-basic-structure',
    title: 'Create Basic HTML Page Structure',
    description: `Create a basic HTML page with the essential structure elements.

**Requirements:**
- Add DOCTYPE declaration
- Create html, head, and body elements
- Include a title element in the head
- Add a main heading (h1) in the body

**Skills you'll learn:**
- HTML document structure
- Essential HTML elements
- Proper nesting of elements`,
    difficulty: 'beginner',
    category: 'HTML Basics',
    starting_code: `<!-- Create your basic HTML structure here -->`,
    solution_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First HTML Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
</body>
</html>`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Has DOCTYPE declaration',
        expected_output: 'DOCTYPE declaration present',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Contains html, head, and body elements',
        expected_output: 'Basic structure elements present',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Has title element in head',
        expected_output: 'Title element present in head',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Contains h1 element in body',
        expected_output: 'H1 heading present in body',
        hidden: false,
      },
    ],
    hints: [
      'HTML documents start with <!DOCTYPE html>',
      'The html element contains everything on the page',
      'The head element contains metadata, including the title',
      'The body element contains the visible content',
    ],
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'html-text-elements',
    title: 'Working with Text Elements',
    description: `Practice using different HTML text elements to structure content.

**Requirements:**
- Create a main heading (h1)
- Add a subheading (h2)
- Include a paragraph with some text
- Make a word bold using the strong element
- Make a word italic using the em element

**Skills you'll learn:**
- Different heading levels
- Paragraph elements
- Text emphasis and importance`,
    difficulty: 'beginner',
    category: 'HTML Basics',
    starting_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Text Elements Practice</title>
</head>
<body>
    <!-- Add your text elements here -->
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Text Elements Practice</title>
</head>
<body>
    <h1>Learning HTML Text Elements</h1>
    <h2>Understanding Text Formatting</h2>
    <p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em> for emphasis.</p>
</body>
</html>`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Contains h1 element',
        expected_output: 'H1 heading present',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Contains h2 element',
        expected_output: 'H2 subheading present',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Contains paragraph element',
        expected_output: 'Paragraph element present',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Uses strong element for bold text',
        expected_output: 'Strong element present',
        hidden: false,
      },
      {
        id: 'test-5',
        description: 'Uses em element for italic text',
        expected_output: 'Em element present',
        hidden: false,
      },
    ],
    hints: [
      'h1 is for main headings, h2 for subheadings',
      'Use <p> tags to wrap paragraphs',
      '<strong> makes text bold and indicates importance',
      '<em> makes text italic and indicates emphasis',
    ],
    created_at: '2024-01-01T01:00:00Z',
  },
  {
    id: 'html-links-images',
    title: 'Adding Links and Images',
    description: `Learn to add links and images to your HTML page.

**Requirements:**
- Create a link to another website using anchor tag
- Add an image with alt text
- Create a link that opens in a new tab
- Include descriptive alt text for accessibility

**Skills you'll learn:**
- Creating hyperlinks
- Adding images with proper attributes
- Link target attributes
- Accessibility with alt text`,
    difficulty: 'beginner',
    category: 'HTML Basics',
    starting_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Links and Images</title>
</head>
<body>
    <h1>My First Links and Images</h1>
    <!-- Add your links and images here -->
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Links and Images</title>
</head>
<body>
    <h1>My First Links and Images</h1>
    <p>Visit <a href="https://developer.mozilla.org" target="_blank">MDN Web Docs</a> to learn more about HTML.</p>
    <img src="https://via.placeholder.com/300x200" alt="A placeholder image showing web development concepts">
    <p>Check out <a href="https://www.w3schools.com">W3Schools</a> for tutorials.</p>
</body>
</html>`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Contains anchor tag with href attribute',
        expected_output: 'Link with href present',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Contains img tag with src attribute',
        expected_output: 'Image with src present',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Image has alt attribute',
        expected_output: 'Image has alt text',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Link opens in new tab',
        expected_output: 'Link with target="_blank" present',
        hidden: false,
      },
    ],
    hints: [
      'Use <a href="URL"> for links',
      'Use <img src="URL" alt="description"> for images',
      'target="_blank" makes links open in new tabs',
      'Alt text describes what the image shows for accessibility',
    ],
    created_at: '2024-01-01T02:00:00Z',
  },
  {
    id: 'html-lists',
    title: 'Creating Lists',
    description: `Practice creating ordered and unordered lists in HTML.

**Requirements:**
- Create an unordered list with at least 3 items
- Create an ordered list with at least 3 items  
- Use proper list item elements
- Add descriptive content for each list

**Skills you'll learn:**
- Unordered lists (bullet points)
- Ordered lists (numbered)
- List item structure
- Organizing content with lists`,
    difficulty: 'beginner',
    category: 'HTML Basics',
    starting_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>HTML Lists</title>
</head>
<body>
    <h1>Learning About Lists</h1>
    <!-- Create your lists here -->
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>HTML Lists</title>
</head>
<body>
    <h1>Learning About Lists</h1>
    
    <h2>My Favorite Programming Languages</h2>
    <ul>
        <li>JavaScript</li>
        <li>Python</li>
        <li>TypeScript</li>
    </ul>
    
    <h2>Steps to Learn Web Development</h2>
    <ol>
        <li>Learn HTML basics</li>
        <li>Master CSS styling</li>
        <li>Add JavaScript interactivity</li>
    </ol>
</body>
</html>`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Contains unordered list element',
        expected_output: 'UL element present',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Contains ordered list element',
        expected_output: 'OL element present',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Has at least 3 list items in unordered list',
        expected_output: 'At least 3 LI elements in UL',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Has at least 3 list items in ordered list',
        expected_output: 'At least 3 LI elements in OL',
        hidden: false,
      },
    ],
    hints: [
      'Use <ul> for unordered (bullet) lists',
      'Use <ol> for ordered (numbered) lists',
      'Each list item goes in <li> tags',
      'Lists can contain any type of content',
    ],
    created_at: '2024-01-01T03:00:00Z',
  },
  {
    id: 'html-simple-form',
    title: 'Building a Simple Form',
    description: `Create a basic HTML form with different input types.

**Requirements:**
- Create a form with text input for name
- Add an email input field
- Include a textarea for comments
- Add a submit button
- Use proper labels for accessibility

**Skills you'll learn:**
- Form elements and structure
- Different input types
- Labels for accessibility
- Form submission basics`,
    difficulty: 'beginner',
    category: 'HTML Forms',
    starting_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Simple Contact Form</title>
</head>
<body>
    <h1>Contact Us</h1>
    <!-- Create your form here -->
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Simple Contact Form</title>
</head>
<body>
    <h1>Contact Us</h1>
    <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <label for="comments">Comments:</label>
        <textarea id="comments" name="comments" rows="4"></textarea>
        
        <input type="submit" value="Send Message">
    </form>
</body>
</html>`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Contains form element',
        expected_output: 'Form element present',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Has text input with label',
        expected_output: 'Text input with label present',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Has email input with label',
        expected_output: 'Email input with label present',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Contains textarea element',
        expected_output: 'Textarea element present',
        hidden: false,
      },
      {
        id: 'test-5',
        description: 'Has submit button',
        expected_output: 'Submit button present',
        hidden: false,
      },
    ],
    hints: [
      'Use <form> to wrap all form elements',
      'Connect labels to inputs using for attribute and id',
      'type="email" validates email format',
      '<textarea> is for multi-line text input',
    ],
    created_at: '2024-01-01T04:00:00Z',
  },
];

// Easy CSS Challenges - Progressive difficulty
export const easyCssChallenges: Challenge[] = [
  {
    id: 'css-text-styling',
    title: 'Basic Text Styling',
    description: `Apply basic CSS styling to text elements.

**Requirements:**
- Make the h1 element blue
- Make the paragraph text 16px size
- Center align the h1 text
- Change the font family to Arial

**Skills you'll learn:**
- CSS color properties
- Font size and family
- Text alignment
- Basic CSS selectors`,
    difficulty: 'beginner',
    category: 'CSS Basics',
    starting_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Text Styling</title>
    <style>
        /* Add your CSS here */
    </style>
</head>
<body>
    <h1>Welcome to CSS</h1>
    <p>This is a paragraph that needs styling.</p>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Text Styling</title>
    <style>
        h1 {
            color: blue;
            text-align: center;
            font-family: Arial, sans-serif;
        }
        
        p {
            font-size: 16px;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <h1>Welcome to CSS</h1>
    <p>This is a paragraph that needs styling.</p>
</body>
</html>`,
    test_cases: [
      {
        id: 'test-1',
        description: 'H1 element has blue color',
        expected_output: 'H1 color is blue',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Paragraph has 16px font size',
        expected_output: 'Paragraph font-size is 16px',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'H1 text is center aligned',
        expected_output: 'H1 text-align is center',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Font family is Arial',
        expected_output: 'Font-family includes Arial',
        hidden: false,
      },
    ],
    hints: [
      'Use color property to change text color',
      'Use font-size property for text size',
      'Use text-align property for alignment',
      'Use font-family property to change fonts',
    ],
    created_at: '2024-01-01T05:00:00Z',
  },
  {
    id: 'css-box-model',
    title: 'Understanding the Box Model',
    description: `Practice using margin, padding, and borders to style elements.

**Requirements:**
- Add 20px padding to the div
- Add 10px margin around the div
- Create a 2px solid black border
- Set a background color of lightgray

**Skills you'll learn:**
- CSS box model (margin, padding, border)
- Background colors
- Border properties
- Spacing elements`,
    difficulty: 'beginner',
    category: 'CSS Layout',
    starting_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Box Model Practice</title>
    <style>
        .box {
            /* Add your CSS here */
        }
    </style>
</head>
<body>
    <div class="box">
        <h2>Box Model Example</h2>
        <p>This div demonstrates the CSS box model with margin, padding, and border.</p>
    </div>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Box Model Practice</title>
    <style>
        .box {
            padding: 20px;
            margin: 10px;
            border: 2px solid black;
            background-color: lightgray;
        }
    </style>
</head>
<body>
    <div class="box">
        <h2>Box Model Example</h2>
        <p>This div demonstrates the CSS box model with margin, padding, and border.</p>
    </div>
</body>
</html>`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Element has 20px padding',
        expected_output: 'Padding is 20px',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Element has 10px margin',
        expected_output: 'Margin is 10px',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Element has 2px solid black border',
        expected_output: 'Border is 2px solid black',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Background color is lightgray',
        expected_output: 'Background-color is lightgray',
        hidden: false,
      },
    ],
    hints: [
      'padding adds space inside the element',
      'margin adds space outside the element',
      'border: width style color creates borders',
      'background-color sets the background',
    ],
    created_at: '2024-01-01T06:00:00Z',
  },
  {
    id: 'css-flexbox-basics',
    title: 'Flexbox Layout Basics',
    description: `Learn to use Flexbox for layout by creating a simple navigation bar.

**Requirements:**
- Make the nav element a flex container
- Space the nav items evenly across the width
- Center align the items vertically
- Make the nav items have no text decoration

**Skills you'll learn:**
- Flexbox display property
- Justify-content property
- Align-items property
- Text decoration removal`,
    difficulty: 'beginner',
    category: 'CSS Layout',
    starting_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Flexbox Navigation</title>
    <style>
        nav {
            background-color: #333;
            height: 60px;
            /* Add your flexbox CSS here */
        }
        
        nav a {
            color: white;
            padding: 0 20px;
            /* Add text decoration styling here */
        }
    </style>
</head>
<body>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
    </nav>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Flexbox Navigation</title>
    <style>
        nav {
            background-color: #333;
            height: 60px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }
        
        nav a {
            color: white;
            padding: 0 20px;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
    </nav>
</body>
</html>`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Nav element has display: flex',
        expected_output: 'Display is flex',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Items are spaced evenly horizontally',
        expected_output: 'Justify-content is space-evenly',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Items are centered vertically',
        expected_output: 'Align-items is center',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Links have no text decoration',
        expected_output: 'Text-decoration is none',
        hidden: false,
      },
    ],
    hints: [
      'display: flex makes an element a flex container',
      'justify-content controls horizontal spacing',
      'align-items controls vertical alignment',
      'text-decoration: none removes underlines from links',
    ],
    created_at: '2024-01-01T07:00:00Z',
  },
  {
    id: 'css-responsive-basics',
    title: 'Responsive Design Basics',
    description: `Create a responsive layout that works on mobile and desktop.

**Requirements:**
- Make the container width 100% on mobile (max-width: 768px)
- Make the container max-width 1200px on desktop
- Center the container with auto margins
- Stack the cards vertically on mobile, horizontally on desktop

**Skills you'll learn:**
- Media queries
- Responsive width settings
- Flexbox direction changes
- Mobile-first design`,
    difficulty: 'beginner',
    category: 'CSS Responsive',
    starting_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Responsive Layout</title>
    <style>
        .container {
            /* Add container styles here */
        }
        
        .cards {
            display: flex;
            gap: 20px;
            /* Add responsive flex direction here */
        }
        
        .card {
            padding: 20px;
            background-color: lightblue;
            border-radius: 8px;
            flex: 1;
        }
        
        /* Add media query here */
    </style>
</head>
<body>
    <div class="container">
        <h1>Responsive Cards</h1>
        <div class="cards">
            <div class="card">
                <h3>Card 1</h3>
                <p>This is the first card.</p>
            </div>
            <div class="card">
                <h3>Card 2</h3>
                <p>This is the second card.</p>
            </div>
            <div class="card">
                <h3>Card 3</h3>
                <p>This is the third card.</p>
            </div>
        </div>
    </div>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Responsive Layout</title>
    <style>
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .cards {
            display: flex;
            gap: 20px;
            flex-direction: column;
        }
        
        .card {
            padding: 20px;
            background-color: lightblue;
            border-radius: 8px;
            flex: 1;
        }
        
        @media (min-width: 769px) {
            .cards {
                flex-direction: row;
            }
        }
        
        @media (max-width: 768px) {
            .container {
                width: 100%;
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Responsive Cards</h1>
        <div class="cards">
            <div class="card">
                <h3>Card 1</h3>
                <p>This is the first card.</p>
            </div>
            <div class="card">
                <h3>Card 2</h3>
                <p>This is the second card.</p>
            </div>
            <div class="card">
                <h3>Card 3</h3>
                <p>This is the third card.</p>
            </div>
        </div>
    </div>
</body>
</html>`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Container has max-width and auto margins',
        expected_output: 'Container is centered with max-width',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Cards flex-direction changes with screen size',
        expected_output: 'Flex-direction responsive',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Media query for mobile exists',
        expected_output: 'Mobile media query present',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Media query for desktop exists',
        expected_output: 'Desktop media query present',
        hidden: false,
      },
    ],
    hints: [
      'Use max-width and margin: 0 auto to center containers',
      '@media (max-width: 768px) targets mobile devices',
      'flex-direction: column stacks items vertically',
      'flex-direction: row arranges items horizontally',
    ],
    created_at: '2024-01-01T08:00:00Z',
  },
];

// Easy JavaScript Challenges - Progressive difficulty  
export const easyJavaScriptChallenges: Challenge[] = [
  {
    id: 'js-variables-basic',
    title: 'Working with Variables',
    description: `Learn to declare and use variables in JavaScript.

**Requirements:**
- Declare a variable for your name (string)
- Declare a variable for your age (number)
- Declare a variable for whether you like coding (boolean)
- Display all variables in the console

**Skills you'll learn:**
- Variable declaration with let and const
- Different data types (string, number, boolean)
- Console.log for output
- Variable naming conventions`,
    difficulty: 'beginner',
    category: 'JavaScript Basics',
    starting_code: `// Declare your variables here


// Display the variables in console


// Expected output in console:
// Name: [your name]
// Age: [your age] 
// Likes coding: [true/false]`,
    solution_code: `// Declare your variables here
let name = "Alex";
let age = 25;
let likesCoding = true;

// Display the variables in console
console.log("Name:", name);
console.log("Age:", age);
console.log("Likes coding:", likesCoding);

// Expected output in console:
// Name: Alex
// Age: 25
// Likes coding: true`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Declares name variable as string',
        expected_output: 'Name variable declared',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Declares age variable as number',
        expected_output: 'Age variable declared',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Declares boolean variable',
        expected_output: 'Boolean variable declared',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Uses console.log to display variables',
        expected_output: 'Console.log statements present',
        hidden: false,
      },
    ],
    hints: [
      'Use let or const to declare variables',
      'Strings go in quotes: "text" or \'text\'',
      'Numbers are written without quotes: 42',
      'Booleans are true or false (no quotes)',
    ],
    created_at: '2024-01-01T09:00:00Z',
  },
  {
    id: 'js-functions-basic',
    title: 'Creating Functions',
    description: `Write your first JavaScript functions.

**Requirements:**
- Create a function that greets a person by name
- Create a function that adds two numbers
- Create a function that checks if a number is even
- Call all functions and display the results

**Skills you'll learn:**
- Function declaration syntax
- Function parameters
- Return statements
- Function calls`,
    difficulty: 'beginner',
    category: 'JavaScript Basics',
    starting_code: `// Create a greeting function


// Create an addition function


// Create an even number checker function


// Call your functions and display results`,
    solution_code: `// Create a greeting function
function greet(name) {
    return "Hello, " + name + "!";
}

// Create an addition function
function add(num1, num2) {
    return num1 + num2;
}

// Create an even number checker function
function isEven(number) {
    return number % 2 === 0;
}

// Call your functions and display results
console.log(greet("Sarah"));
console.log("5 + 3 =", add(5, 3));
console.log("Is 4 even?", isEven(4));
console.log("Is 7 even?", isEven(7));`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Greeting function exists and returns string',
        expected_output: 'Greeting function defined',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Addition function exists and returns sum',
        expected_output: 'Addition function defined',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Even checker function exists and returns boolean',
        expected_output: 'Even checker function defined',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Functions are called and results displayed',
        expected_output: 'Function calls present',
        hidden: false,
      },
    ],
    hints: [
      'Functions start with: function functionName(parameters) {}',
      'Use return to send values back from functions',
      'Use % (modulo) to check if a number is even: num % 2 === 0',
      'Call functions by using their name with parentheses: functionName()',
    ],
    created_at: '2024-01-01T10:00:00Z',
  },
  {
    id: 'js-dom-basics',
    title: 'DOM Manipulation Basics',
    description: `Learn to interact with HTML elements using JavaScript.

**Requirements:**
- Get the paragraph element by its ID
- Change the text content of the paragraph
- Change the color of the paragraph to blue
- Add a click event listener to the button

**Skills you'll learn:**
- Document.getElementById()
- Changing element properties
- Event listeners
- Basic DOM manipulation`,
    difficulty: 'beginner',
    category: 'JavaScript DOM',
    starting_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>DOM Basics</title>
</head>
<body>
    <h1>DOM Manipulation Practice</h1>
    <p id="demo">Original text</p>
    <button id="changeBtn">Change Text</button>
    
    <script>
        // Get the paragraph element
        
        
        // Change the text content
        
        
        // Change the color to blue
        
        
        // Add click event listener to button
        
    </script>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>DOM Basics</title>
</head>
<body>
    <h1>DOM Manipulation Practice</h1>
    <p id="demo">Original text</p>
    <button id="changeBtn">Change Text</button>
    
    <script>
        // Get the paragraph element
        let paragraph = document.getElementById("demo");
        
        // Change the text content
        paragraph.textContent = "Text changed by JavaScript!";
        
        // Change the color to blue
        paragraph.style.color = "blue";
        
        // Add click event listener to button
        document.getElementById("changeBtn").addEventListener("click", function() {
            paragraph.textContent = "Button was clicked!";
            paragraph.style.color = "red";
        });
    </script>
</body>
</html>`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Gets element by ID',
        expected_output: 'getElementById used',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Changes text content',
        expected_output: 'textContent modified',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Changes element color',
        expected_output: 'Style color changed',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Adds click event listener',
        expected_output: 'Event listener added',
        hidden: false,
      },
    ],
    hints: [
      'document.getElementById("id") gets elements by their ID',
      'element.textContent changes the text inside an element',
      'element.style.property changes CSS styles',
      'addEventListener("click", function) adds click handlers',
    ],
    created_at: '2024-01-01T11:00:00Z',
  },
  {
    id: 'js-arrays-loops',
    title: 'Working with Arrays and Loops',
    description: `Practice using arrays and loops to process data.

**Requirements:**
- Create an array of at least 5 numbers
- Use a for loop to display each number
- Create a new array with numbers doubled using a loop
- Calculate the sum of all numbers

**Skills you'll learn:**
- Array creation and access
- For loops
- Array iteration
- Accumulator patterns`,
    difficulty: 'beginner',
    category: 'JavaScript Basics',
    starting_code: `// Create an array of numbers


// Use a for loop to display each number


// Create a new array with doubled numbers


// Calculate the sum of all numbers`,
    solution_code: `// Create an array of numbers
let numbers = [2, 4, 6, 8, 10];

// Use a for loop to display each number
console.log("Original numbers:");
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

// Create a new array with doubled numbers
let doubledNumbers = [];
for (let i = 0; i < numbers.length; i++) {
    doubledNumbers.push(numbers[i] * 2);
}

console.log("Doubled numbers:", doubledNumbers);

// Calculate the sum of all numbers
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
}

console.log("Sum of all numbers:", sum);`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Creates array with at least 5 numbers',
        expected_output: 'Array with 5+ numbers created',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Uses for loop to iterate array',
        expected_output: 'For loop iteration present',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Creates new array with doubled values',
        expected_output: 'Doubled array created',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Calculates sum using accumulator',
        expected_output: 'Sum calculation present',
        hidden: false,
      },
    ],
    hints: [
      'Arrays are created with square brackets: [1, 2, 3]',
      'for loops: for(let i = 0; i < array.length; i++)',
      'Access array elements with: array[index]',
      'Add to arrays with: array.push(value)',
    ],
    created_at: '2024-01-01T12:00:00Z',
  },
  {
    id: 'js-conditional-logic',
    title: 'Conditional Logic Practice',
    description: `Learn to use if/else statements to make decisions in code.

**Requirements:**
- Create a function that checks if a person can vote (age >= 18)
- Create a function that returns letter grade based on score (A: 90+, B: 80+, C: 70+, D: 60+, F: below 60)
- Create a function that determines if it's a weekend (Saturday or Sunday)
- Test all functions with different inputs

**Skills you'll learn:**
- If/else statements
- Comparison operators
- Logical operators
- Nested conditionals`,
    difficulty: 'beginner',
    category: 'JavaScript Logic',
    starting_code: `// Create voting eligibility function


// Create grade calculator function


// Create weekend checker function


// Test your functions`,
    solution_code: `// Create voting eligibility function
function canVote(age) {
    if (age >= 18) {
        return "You can vote!";
    } else {
        return "You're too young to vote.";
    }
}

// Create grade calculator function
function getLetterGrade(score) {
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else if (score >= 60) {
        return "D";
    } else {
        return "F";
    }
}

// Create weekend checker function
function isWeekend(day) {
    if (day === "Saturday" || day === "Sunday") {
        return true;
    } else {
        return false;
    }
}

// Test your functions
console.log("Age 16:", canVote(16));
console.log("Age 20:", canVote(20));
console.log("Score 85:", getLetterGrade(85));
console.log("Score 95:", getLetterGrade(95));
console.log("Monday:", isWeekend("Monday"));
console.log("Saturday:", isWeekend("Saturday"));`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Voting function uses age comparison',
        expected_output: 'Voting eligibility function defined',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Grade function uses multiple if/else',
        expected_output: 'Grade calculator function defined',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Weekend function uses logical OR',
        expected_output: 'Weekend checker function defined',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Functions are tested with different inputs',
        expected_output: 'Function tests present',
        hidden: false,
      },
    ],
    hints: [
      'Use >= for greater than or equal comparisons',
      'if/else if/else chains handle multiple conditions',
      'Use || for logical OR, && for logical AND',
      'Test functions with edge cases and different values',
    ],
    created_at: '2024-01-01T13:00:00Z',
  },
];

// Combine all easy challenges
export const allEasyChallenges: Challenge[] = [
  ...easyHtmlChallenges,
  ...easyCssChallenges,
  ...easyJavaScriptChallenges,
];
export interface ProgrammingLesson {
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

export interface ProgrammingCategory {
  id: string
  title: string
  description: string
  lessons: string[]
  order: number
}

export const programmingCategories: ProgrammingCategory[] = [
  {
    id: 'fundamentals',
    title: 'Programming Fundamentals',
    description: 'Essential concepts every programmer should know',
    order: 1,
    lessons: [
      'what-is-computer',
      'what-is-programming',
      'what-are-programming-languages',
      'what-is-internet',
      'how-websites-work',
      'programming-tools',
      'ready-for-html'
    ]
  }
]

export const programmingLessons: ProgrammingLesson[] = [
  {
    id: 'what-is-computer',
    title: 'What is a Computer?',
    description: 'Understanding the basics of how computers work',
    category: 'fundamentals',
    order: 1,
    duration: '8 min',
    difficulty: 'Beginner',
    content: `
# What is a Computer?

Welcome to programming! Before we start coding, let's understand what a computer actually is.

## Think of a Computer Like a Very Smart Calculator

A computer is like a super-powered calculator that can:
- **Remember** lots of information (like your photos, documents, and apps)
- **Follow instructions** exactly as you tell it to
- **Do math** incredibly fast
- **Show you** results on a screen

## The Main Parts of a Computer

Every computer has these basic parts:

### 1. The Brain (Processor/CPU)
- This is like the computer's brain
- It follows instructions and does calculations
- The faster the brain, the quicker your computer works

### 2. Memory (RAM)
- This is like the computer's short-term memory
- It remembers what you're working on right now
- When you turn off the computer, this memory gets cleared

### 3. Storage (Hard Drive/SSD)
- This is like the computer's long-term memory
- It saves your files, photos, and programs permanently
- Even when the computer is off, this information stays safe

### 4. Input and Output
- **Input**: How you tell the computer what to do (keyboard, mouse, touchscreen)
- **Output**: How the computer shows you results (screen, speakers, printer)

## Why Understanding Computers Helps with Programming

When you write code (programming), you're giving the computer step-by-step instructions. The computer will follow these instructions exactly - it can't guess what you meant!

Think of it like giving directions to someone:
- If you say "turn left," they'll turn left
- If you forget to say "stop," they'll keep going
- You need to be very clear and specific

## Real-World Example

When you click on an app on your phone:
1. **You** press the screen (input)
2. **The computer** recognizes your touch
3. **The brain** follows instructions to open the app
4. **The screen** shows you the app (output)

All of this happens in less than a second!

## Fun Facts About Computers

- The first computers were as big as entire rooms!
- Your smartphone is more powerful than the computers that sent humans to the moon
- Computers only understand two things: ON (1) and OFF (0)
- Everything you see on screen is made from millions of these 1s and 0s

## What's Next?

Now that you understand what a computer is, let's learn what programming actually means and how we can "talk" to computers!
    `,
    keyPoints: [
      'A computer is like a super-smart calculator that follows instructions',
      'Computers have a brain (CPU), memory (RAM), and storage (hard drive)',
      'Input is how you tell the computer what to do, output is how it responds',
      'Computers follow instructions exactly - they cannot guess what you mean',
      'Understanding computers helps you write better code'
    ],
    nextLesson: 'what-is-programming'
  },
  {
    id: 'what-is-programming',
    title: 'What is Programming?',
    description: 'Learn what programming really means in simple terms',
    category: 'fundamentals',
    order: 2,
    duration: '10 min',
    difficulty: 'Beginner',
    content: `
# What is Programming?

Programming is simply **giving instructions to a computer** so it can help you solve problems or create things.

## Programming is Like Writing a Recipe

Think about baking a cake:

### A Recipe Says:
1. Preheat oven to 350°F
2. Mix flour, sugar, and eggs
3. Pour into pan
4. Bake for 30 minutes
5. Let cool before serving

### A Program Says:
1. Show a login screen
2. Check if password is correct
3. If correct, show the main page
4. If wrong, show error message
5. Let user try again

Both are **step-by-step instructions** that must be followed in order!

## What Programmers Do

Programmers write instructions that tell computers how to:
- **Show websites** (like Facebook, Google, YouTube)
- **Run apps** (like games, calculators, photo editors)
- **Store information** (like your contacts, photos, messages)
- **Solve problems** (like finding the fastest route to a destination)

## Programming Languages - Different Ways to "Talk" to Computers

Just like humans speak different languages (English, Spanish, French), there are different programming languages:

### Common Programming Languages:
- **HTML**: For creating web pages (what we'll learn first!)
- **JavaScript**: For making websites interactive
- **Python**: Great for beginners and data analysis
- **Java**: For building apps and large systems
- **CSS**: For making websites look beautiful

## Why Start with HTML?

HTML is perfect for beginners because:
- ✅ It's **simple** - easy to read and understand
- ✅ You see **immediate results** - your code creates web pages
- ✅ It's **forgiving** - small mistakes won't break everything
- ✅ It's the **foundation** - almost all websites use HTML

## Programming is Creative!

Programming isn't just about following rules - it's about:
- **Creating** websites, apps, and games
- **Solving** real-world problems
- **Building** tools that help people
- **Expressing** your ideas through code

## Don't Worry About Making Mistakes!

Everyone makes mistakes when learning to program:
- Professional programmers make mistakes every day
- Mistakes help you learn what works and what doesn't
- Most programming time is spent fixing and improving code
- There's always a solution to every problem

## What You'll Build

As you learn programming, you'll be able to create:
- **Personal websites** to show your work
- **Interactive games** for fun
- **Useful apps** to solve problems
- **Beautiful designs** that look professional

## The Most Important Thing

Programming is about **problem-solving** and **creativity**, not memorizing everything. You'll learn by doing, making mistakes, and gradually building your skills.

Ready to start your programming journey? Let's learn about the different programming languages next!
    `,
    keyPoints: [
      'Programming is giving step-by-step instructions to computers',
      'It\'s like writing a recipe that computers can follow',
      'Different programming languages are different ways to "talk" to computers',
      'HTML is perfect for beginners - simple and shows immediate results',
      'Programming is creative and about solving problems',
      'Making mistakes is normal and helps you learn'
    ],
    prevLesson: 'what-is-computer',
    nextLesson: 'what-are-programming-languages'
  },
  {
    id: 'what-are-programming-languages',
    title: 'Programming Languages Explained',
    description: 'Understanding different programming languages and why we start with HTML',
    category: 'fundamentals',
    order: 3,
    duration: '12 min',
    difficulty: 'Beginner',
    content: `
# What Are Programming Languages?

Programming languages are special ways to write instructions that computers can understand. Think of them as different languages humans speak, but for talking to computers!

## Why Do We Need Programming Languages?

Computers only understand **binary code** (1s and 0s), which looks like this:
\`01001000 01100101 01101100 01101100 01101111\`

That spells "Hello" - but it's way too hard for humans to write! So we created programming languages that:
- Use **words** instead of numbers
- Are **easier to read** and write
- Get **translated** into binary code for the computer

## Types of Programming Languages

### 1. Markup Languages (Like HTML)
**What they do**: Describe how content should be structured and displayed
**Example**: HTML for web pages

Think of markup languages like giving instructions to a book designer:
- "Make this text a heading"
- "Put this text in bold"
- "Add a picture here"

### 2. Styling Languages (Like CSS)
**What they do**: Make things look beautiful
**Example**: CSS for colors, fonts, and layouts

Like telling an artist how to paint:
- "Make the background blue"
- "Use a fancy font for titles"
- "Center this text"

### 3. Programming Languages (Like JavaScript, Python)
**What they do**: Make things interactive and smart
**Examples**: JavaScript, Python, Java

Like giving a robot complex instructions:
- "If someone clicks this button, show a message"
- "Calculate the total price including tax"
- "Save this information to remember later"

## Why We Start with HTML

HTML is the **perfect first language** because:

### 1. It's Simple
\`\`\`html
<h1>Hello World!</h1>
<p>This is my first web page.</p>
\`\`\`
You can probably guess what this does just by reading it!

### 2. Immediate Visual Results
When you write HTML, you instantly see a web page. No complex setup needed!

### 3. Forgiving
If you make a small mistake, your web page might look a bit different, but it won't completely break.

### 4. Foundation for Everything
Almost every website uses HTML as its foundation. Even the fanciest websites start with HTML!

## Popular Programming Languages and What They're Used For

### Web Development
- **HTML**: Structure of web pages
- **CSS**: Styling and beauty
- **JavaScript**: Making pages interactive

### Mobile Apps
- **Swift**: iPhone apps
- **Java/Kotlin**: Android apps
- **React Native**: Apps for both iPhone and Android

### General Programming
- **Python**: Easy to learn, great for beginners
- **Java**: Popular for large applications
- **C++**: Fast programs and games

### Data and Analysis
- **Python**: Analyzing data and artificial intelligence
- **R**: Statistics and data science
- **SQL**: Working with databases

## How Programming Languages Work Together

Think of building a house:
- **HTML** is like the **frame** (structure)
- **CSS** is like the **paint and decoration** (how it looks)
- **JavaScript** is like the **electricity and plumbing** (how it works)

You need all three to build a modern website!

## Don't Try to Learn Everything at Once

You might be excited and want to learn all the languages, but remember:
- **Master one language first** (we'll start with HTML)
- **Each language builds on concepts** you learn from others
- **It's better to know one language well** than five languages poorly

## Programming Languages Are Tools

Think of programming languages like tools in a toolbox:
- A **hammer** is great for nails, but terrible for screws
- A **screwdriver** is perfect for screws, but useless for cutting wood
- Different programming languages are **good for different jobs**

You'll learn to pick the right tool for each job as you gain experience!

## What's Coming Next

Now that you understand what programming languages are, let's learn about:
- How the internet works
- What websites actually are
- How your code becomes a web page

Ready to continue your journey? Let's explore the internet next!
    `,
    keyPoints: [
      'Programming languages let humans write instructions computers can understand',
      'Different languages are good for different tasks (websites, apps, games)',
      'HTML is perfect for beginners - simple, visual, and forgiving',
      'HTML is the foundation that almost all websites are built on',
      'Languages work together like tools in a toolbox',
      'Master one language before moving to the next'
    ],
    prevLesson: 'what-is-programming',
    nextLesson: 'what-is-internet'
  },
  {
    id: 'what-is-internet',
    title: 'What is the Internet?',
    description: 'Understanding how the internet and websites work',
    category: 'fundamentals',
    order: 4,
    duration: '10 min',
    difficulty: 'Beginner',
    content: `
# What is the Internet?

The internet is like a giant invisible highway that connects computers all around the world. Let's understand how it works in simple terms!

## The Internet is Like a Postal System

Imagine the internet as the world's largest postal system:

### Traditional Mail:
- You write a letter
- Put it in an envelope with an address
- Post office delivers it to the right house
- The person receives your letter

### Internet "Mail":
- You type a website address (like google.com)
- Your computer sends a request
- Internet "post office" finds the right server
- The website appears on your screen

## What Are Websites?

A **website** is like a digital magazine or book that lives on the internet:
- Made up of multiple **pages**
- Each page contains text, images, videos, and links
- Anyone with internet can visit and read it
- Some are free, some require payment

### Examples of Different Types of Websites:
- **Search engines**: Google, Bing (help you find information)
- **Social media**: Facebook, Instagram (connect with friends)
- **Shopping**: Amazon, eBay (buy things online)
- **Entertainment**: YouTube, Netflix (watch videos)
- **Learning**: Khan Academy, Wikipedia (learn new things)

## How Do Websites Get to Your Computer?

### Step 1: You Type an Address
When you type "google.com" in your browser, you're asking for Google's website.

### Step 2: Your Computer Asks the Internet
Your computer sends a message: "Hey internet, where can I find google.com?"

### Step 3: The Internet Points the Way
Special computers called **servers** have copies of websites stored on them. The internet helps find the right server.

### Step 4: The Website Comes to You
The server sends the website data to your computer, and your browser displays it on your screen.

All of this happens in less than a second!

## What Are Servers?

**Servers** are special computers that:
- Store websites and apps
- Run 24/7 (never turn off)
- Send information to anyone who asks for it
- Are usually kept in big buildings called "data centers"

Think of servers like:
- **Libraries** that store books (websites)
- **Always open** so you can visit anytime
- **Librarians** that find and give you the books you want

## Web Browsers - Your Window to the Internet

A **web browser** is like a translator that:
- Takes website code (HTML, CSS, JavaScript)
- Translates it into what you see on screen
- Handles clicking links, filling forms, playing videos

### Popular Web Browsers:
- **Chrome** (by Google)
- **Safari** (by Apple) 
- **Firefox** (by Mozilla)
- **Edge** (by Microsoft)

## Domain Names - Internet Addresses

**Domain names** are easy-to-remember website addresses:
- Instead of typing numbers like \`172.217.14.206\`
- You can type \`google.com\`
- Much easier for humans to remember!

### Parts of a Domain Name:
- \`google\` = the website name
- \`.com\` = the type of website
- \`www\` = an optional prefix (many sites don't use it anymore)

## How Your HTML Code Becomes a Website

When you learn HTML and create a web page:

### 1. You Write HTML Code
You create files on your computer with HTML code.

### 2. You Upload to a Server
You put your files on a server so others can access them.

### 3. People Visit Your Website
When someone types your website address, they see your HTML code displayed as a beautiful web page!

## The Amazing Thing About the Internet

The internet lets you:
- **Share** your creations with the whole world
- **Learn** from people everywhere
- **Connect** with friends and family instantly
- **Access** millions of websites and resources

And the best part? You can **create** and **contribute** to this amazing network by building your own websites!

## Internet Safety Basics

As you start exploring and creating on the internet:
- **Be careful** what personal information you share
- **Think twice** before clicking suspicious links
- **Remember** that not everything on the internet is true
- **Ask for help** if something seems confusing or scary

## What's Next?

Now that you understand how the internet works, let's learn specifically about how websites are built and what makes them work. Ready to dive into the world of web development?
    `,
    keyPoints: [
      'The internet is like a global postal system connecting computers worldwide',
      'Websites are digital pages stored on special computers called servers',
      'Web browsers translate website code into what you see on screen',
      'Domain names are easy-to-remember website addresses',
      'Your HTML code can become a real website that anyone can visit',
      'The internet lets you share your creations with the whole world'
    ],
    prevLesson: 'what-are-programming-languages',
    nextLesson: 'how-websites-work'
  },
  {
    id: 'how-websites-work',
    title: 'How Websites Work',
    description: 'Understanding the building blocks of websites',
    category: 'fundamentals',
    order: 5,
    duration: '12 min',
    difficulty: 'Beginner',
    content: `
# How Websites Work

Now that you understand the internet, let's dive deeper into how websites are actually built and what makes them work!

## Websites Are Like Digital Houses

Think of a website like building a house:

### The Foundation (HTML)
- **Structure**: Walls, rooms, doors, windows
- **Content**: What goes in each room
- **Organization**: How rooms connect to each other

### The Decoration (CSS)
- **Colors**: Paint on the walls
- **Style**: Furniture, carpets, lighting
- **Layout**: Where everything is placed

### The Functionality (JavaScript)
- **Electricity**: Light switches, outlets
- **Plumbing**: Water, heating system
- **Smart Features**: Automatic doors, security systems

## The Three Languages That Build Websites

### 1. HTML - The Structure
**HTML** (HyperText Markup Language) creates the basic structure:

\`\`\`html
<html>
  <head>
    <title>My House</title>
  </head>
  <body>
    <h1>Welcome to My Home</h1>
    <p>This is the living room.</p>
    <img src="family-photo.jpg">
  </body>
</html>
\`\`\`

This creates:
- A title for the page
- A big heading
- A paragraph of text
- A family photo

### 2. CSS - The Styling
**CSS** (Cascading Style Sheets) makes it look beautiful:

\`\`\`css
h1 {
  color: blue;
  font-size: 32px;
}

p {
  font-family: Arial;
  color: gray;
}
\`\`\`

This makes:
- The heading blue and large
- The paragraph text gray with Arial font

### 3. JavaScript - The Interactivity
**JavaScript** makes it interactive:

\`\`\`javascript
function sayHello() {
  alert("Welcome to my website!");
}
\`\`\`

This shows a welcome message when someone clicks a button.

## How These Work Together

Imagine you're looking at a social media website:

### HTML Creates:
- Text boxes for typing posts
- Buttons for "Like" and "Share"
- Areas for displaying photos
- Navigation menu

### CSS Makes It Look Good:
- Blue "Like" buttons
- Nice fonts and colors
- Proper spacing between posts
- Responsive design for phones

### JavaScript Adds Functionality:
- Clicking "Like" updates the count
- New posts appear without refreshing
- Photo slideshow automatically changes
- Real-time notifications

## Different Types of Websites

### Static Websites
- **Content never changes** (like a digital brochure)
- **Made with**: HTML and CSS
- **Examples**: Simple business websites, portfolios
- **Perfect for beginners** to start with

### Dynamic Websites
- **Content changes** based on user actions
- **Made with**: HTML, CSS, JavaScript, and more
- **Examples**: Facebook, Amazon, YouTube
- **More complex** but more powerful

## How Websites Display on Different Devices

Modern websites need to work on:
- **Desktop computers** (big screens)
- **Tablets** (medium screens)
- **Smartphones** (small screens)

This is called **"Responsive Design"** - the website automatically adjusts to fit different screen sizes!

## What Happens When You Visit a Website

### Step 1: You Type the Address
You enter \`example.com\` in your browser.

### Step 2: Browser Finds the Server
Your browser locates the server that has the website files.

### Step 3: Server Sends Files
The server sends HTML, CSS, and JavaScript files to your browser.

### Step 4: Browser Assembles the Page
Your browser reads all the code and creates the webpage you see.

### Step 5: You Interact
You can click buttons, scroll, type in forms - all powered by the code!

## The Amazing Part About Web Development

When you learn to build websites, you're learning to:
- **Create** digital experiences for people
- **Solve** real-world problems
- **Express** your creativity
- **Share** your ideas with the world

## From Simple to Complex

You'll start by building simple websites with just HTML:
- Personal portfolio
- Simple business page
- Photo gallery

Then gradually add CSS for styling:
- Beautiful colors and fonts
- Professional layouts
- Animations and effects

Finally, add JavaScript for interactivity:
- Contact forms
- Interactive games
- Real-time updates

## Why Start with HTML?

HTML is the perfect starting point because:
- **Every website uses it** - it's the foundation
- **You see immediate results** - write code, see a webpage
- **It's forgiving** - mistakes don't break everything
- **Builds confidence** - you'll feel like a real programmer quickly!

## Real Website Examples

Let's think about websites you use every day:

### Google Search Page:
- **HTML**: Search box, buttons, links
- **CSS**: Clean white design, Google colors
- **JavaScript**: Search suggestions, instant results

### YouTube:
- **HTML**: Video player, comment sections, menus
- **CSS**: Red branding, grid layouts, thumbnails
- **JavaScript**: Video controls, recommendations, live chat

## What You'll Build

As you progress through this course, you'll build:
1. **Simple text pages** with just HTML
2. **Styled pages** with HTML + CSS
3. **Interactive pages** with HTML + CSS + JavaScript
4. **Complete websites** with multiple pages

## Ready to Start Building?

You now understand:
- ✅ What computers are and how they work
- ✅ What programming is and why it's useful
- ✅ How the internet connects everything
- ✅ How websites are built with HTML, CSS, and JavaScript

Next, let's learn about the tools you'll use to write your code and build amazing websites!
    `,
    keyPoints: [
      'Websites are like digital houses with structure (HTML), decoration (CSS), and functionality (JavaScript)',
      'HTML creates the content and structure of web pages',
      'CSS makes websites look beautiful with colors, fonts, and layouts',
      'JavaScript adds interactivity and smart features',
      'Websites can be static (never change) or dynamic (interactive)',
      'Modern websites work on computers, tablets, and phones automatically'
    ],
    prevLesson: 'what-is-internet',
    nextLesson: 'programming-tools'
  },
  {
    id: 'programming-tools',
    title: 'Programming Tools for Beginners',
    description: 'Essential tools you need to start coding',
    category: 'fundamentals',
    order: 6,
    duration: '15 min',
    difficulty: 'Beginner',
    content: `
# Programming Tools for Beginners

Just like a carpenter needs tools to build a house, programmers need tools to write code. Let's explore the essential tools you'll use!

## The Most Important Tool: Text Editor

A **text editor** is where you write your code. Think of it like Microsoft Word, but designed specifically for programming.

### What Makes a Good Programming Text Editor:
- **Syntax highlighting**: Colors your code to make it easier to read
- **Auto-completion**: Suggests what you might want to type
- **Error detection**: Points out mistakes as you type
- **File management**: Organizes your project files

### Popular Free Text Editors:

#### Visual Studio Code (VS Code) - ⭐ RECOMMENDED
- **Free** and made by Microsoft
- **Beginner-friendly** with great features
- **Extensions** to add more functionality
- **Works on** Windows, Mac, and Linux

#### Other Good Options:
- **Sublime Text**: Fast and simple
- **Atom**: Customizable and open-source
- **Notepad++**: Simple and lightweight (Windows only)

## Web Browsers - Your Testing Ground

Since you're learning HTML, you'll use web browsers to see your work:

### Any Browser Works:
- **Chrome** (most popular for development)
- **Firefox** (great developer tools)
- **Safari** (if you're on Mac)
- **Edge** (built into Windows)

### Developer Tools
All modern browsers have special tools for programmers:
- **Inspect Element**: See the HTML code of any website
- **Console**: See error messages and test code
- **Network**: See how fast your website loads

## File Organization - Keep Things Tidy

Programming projects have many files, so organization is important:

### Create a Coding Folder Structure:
\`\`\`
📁 My Coding Projects
  📁 Project 1 - My First Website
    📄 index.html
    📄 style.css
    📁 images
      🖼️ photo1.jpg
      🖼️ logo.png
  📁 Project 2 - Portfolio Website
    📄 index.html
    📄 about.html
    📄 style.css
\`\`\`

### File Naming Best Practices:
- ✅ **Use lowercase**: \`index.html\` not \`Index.HTML\`
- ✅ **Use hyphens**: \`my-page.html\` not \`my page.html\`
- ✅ **Be descriptive**: \`contact.html\` not \`page2.html\`
- ✅ **No spaces**: Computers prefer \`about-me.html\` over \`about me.html\`

## Version Control - Save Your Progress

**Version control** is like a save game system for your code:

### What Git Does:
- **Saves** different versions of your code
- **Tracks** what changes you made
- **Backs up** your work online
- **Lets you** experiment without fear

### GitHub - Your Code's Home Online
- **Free** online storage for your code
- **Portfolio** to show your work to others
- **Collaboration** with other programmers
- **Backup** so you never lose your work

*Don't worry about Git and GitHub right away - focus on learning HTML first!*

## Optional Tools (You Don't Need These Yet)

### Local Development Server
As you advance, you might use tools that create a mini web server on your computer:
- **Live Server** (VS Code extension)
- **XAMPP** (for more advanced projects)

### Image Editing Software
For creating and editing images for your websites:
- **GIMP** (free alternative to Photoshop)
- **Canva** (online design tool)
- **Paint.NET** (simple image editor)

### Color and Design Tools
- **Color picker** tools to find perfect colors
- **Google Fonts** for beautiful typography
- **Unsplash** for free high-quality photos

## Setting Up Your First Coding Environment

### Step 1: Download a Text Editor
1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Download Visual Studio Code for your operating system
3. Install it with default settings

### Step 2: Create Your First Project Folder
1. Create a folder called "My First Website" on your desktop
2. Open Visual Studio Code
3. Open your folder in VS Code (File → Open Folder)

### Step 3: Create Your First HTML File
1. Right-click in the file explorer
2. Create a new file called \`index.html\`
3. You're ready to start coding!

## Browser Extensions for Web Development

### Free Extensions That Help:
- **ColorZilla**: Pick colors from any website
- **Fonts Ninja**: Identify fonts used on websites
- **Web Developer**: Extra tools for testing websites

## The Best Tool is Practice

Remember, the most important "tool" is:
- **Practice** regularly
- **Experiment** with your code
- **Don't be afraid** to make mistakes
- **Have fun** while learning!

## What You Don't Need (Yet)

Many beginners think they need expensive or complex tools:
- ❌ **Expensive software** - free tools work great
- ❌ **Powerful computer** - any modern computer works
- ❌ **Complex development environment** - start simple
- ❌ **Multiple monitors** - nice to have, but not necessary

## Online Tools (No Installation Required)

If you can't install software, try these online editors:
- **CodePen**: Write HTML, CSS, and JavaScript online
- **JSFiddle**: Quick code testing
- **Repl.it**: Full programming environment in browser

## Your Toolkit Checklist

✅ **Text Editor** (Visual Studio Code recommended)
✅ **Web Browser** (Chrome, Firefox, Safari, or Edge)
✅ **Organized folder** for your projects
✅ **Patience and curiosity** (most important!)

## Ready to Start Coding?

You now have everything you need to start your programming journey:
- Understanding of how computers and the internet work
- Knowledge of what programming languages do
- The right tools installed and ready
- A clear path forward with HTML

Next, let's make sure you're completely ready to start learning HTML with confidence!
    `,
    keyPoints: [
      'A text editor (like Visual Studio Code) is your main programming tool',
      'Web browsers help you test and see your code in action',
      'Good file organization keeps your projects tidy and manageable',
      'Start simple - you don\'t need expensive or complex tools',
      'Practice and experimentation are more important than perfect tools',
      'Free tools work just as well as expensive ones for beginners'
    ],
    prevLesson: 'how-websites-work',
    nextLesson: 'ready-for-html'
  },
  {
    id: 'ready-for-html',
    title: 'Ready to Learn HTML!',
    description: 'Putting it all together and preparing for HTML',
    category: 'fundamentals',
    order: 7,
    duration: '8 min',
    difficulty: 'Beginner',
    content: `
# Ready to Learn HTML!

Congratulations! You've learned all the fundamentals you need to start programming. Let's review what you know and get excited about building your first website!

## What You've Learned So Far

### 🖥️ About Computers
- Computers follow instructions exactly
- They have a brain (CPU), memory (RAM), and storage
- Input and output help us communicate with them

### 💻 About Programming
- Programming is giving step-by-step instructions to computers
- It's like writing a recipe that computers can follow
- Making mistakes is normal and helps you learn

### 🌐 About the Internet
- The internet connects computers around the world
- Websites are stored on special computers called servers
- Your browser translates code into beautiful web pages

### 🏠 About Websites
- HTML creates the structure (like building a house frame)
- CSS adds styling (like painting and decorating)
- JavaScript adds functionality (like electricity and plumbing)

### 🛠️ About Tools
- Text editors help you write code
- Browsers help you see your work
- Organization keeps your projects tidy

## Why HTML is Perfect for You

Now that you understand the big picture, here's why HTML is the ideal first programming language:

### 1. Immediate Visual Results
When you write HTML code, you immediately see a web page. No complex compilation or setup required!

### 2. Easy to Understand
HTML uses English words that make sense:
- \`<title>\` creates a title
- \`<paragraph>\` creates a paragraph
- \`<image>\` displays an image

### 3. Forgiving Nature
If you make a mistake in HTML:
- Your page might look a bit different
- But it usually won't completely break
- You can easily fix errors

### 4. Foundation for Everything
- Every website on the internet uses HTML
- It's the starting point for all web development
- Learning HTML first makes everything else easier

## Your Learning Journey Ahead

### Phase 1: HTML Basics (Starting Now!)
You'll learn to create:
- Simple text pages
- Headings and paragraphs
- Lists and links
- Images and basic formatting

### Phase 2: HTML Structure
You'll discover how to:
- Organize content with sections
- Create navigation menus
- Build forms for user input
- Structure complete web pages

### Phase 3: Beyond HTML
After mastering HTML, you'll add:
- **CSS** for beautiful styling
- **JavaScript** for interactivity
- **Advanced features** for modern websites

## What You'll Build in the HTML Course

### Your First Web Page
A simple page that says "Hello, World!" and introduces you to HTML basics.

### Personal About Page
A page about yourself with:
- Your name and photo
- Information about your interests
- Links to your social media
- Contact information

### Simple Business Website
A multi-page website with:
- Home page
- About page
- Services page
- Contact form

### Portfolio Website
A professional site showcasing:
- Your projects
- Your skills
- Your experience
- Ways to contact you

## Tips for Success

### 1. Start Small
Don't try to build the next Facebook on day one. Start with simple pages and gradually add complexity.

### 2. Practice Regularly
Even 15-30 minutes a day is better than cramming for hours once a week.

### 3. Experiment Freely
Try changing things in your code to see what happens. Curiosity is your best teacher!

### 4. Don't Rush
Take time to understand each concept before moving to the next. Solid foundations lead to better learning.

### 5. Ask for Help
Use online resources, forums, and communities when you get stuck. Every programmer does this!

## Common Beginner Concerns (And Why Not to Worry)

### "What if I'm not good at math?"
HTML requires almost no math. You're creating structure and content, not complex calculations.

### "What if I make mistakes?"
Everyone makes mistakes! Professional programmers spend most of their time finding and fixing bugs.

### "What if I'm too old/young to learn?"
People of all ages learn programming successfully. Your life experience actually helps!

### "What if it's too hard?"
We'll start with very simple concepts and build up gradually. Each lesson builds on the previous one.

## Your First HTML Challenge

Ready for a sneak peek? Here's what your very first HTML code might look like:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My First Web Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first web page!</p>
</body>
</html>
\`\`\`

When you save this in a file called \`index.html\` and open it in a browser, you'll see a real web page with a heading and paragraph!

## The Programming Mindset

Remember these key principles as you start:

### Think Step by Step
Break big problems into smaller pieces. Want to build a website? Start with one page. Want to create a page? Start with one paragraph.

### Embrace the Process
Learning to program is like learning a musical instrument or new language. It takes time, but every small step forward is progress.

### Stay Curious
The best programmers are always asking "What if I try this?" and "How does this work?" Keep that curiosity alive!

## You're Ready!

You now have:
- ✅ **Understanding** of how computers and the internet work
- ✅ **Knowledge** of what programming languages do
- ✅ **Tools** installed and ready to use
- ✅ **Mindset** prepared for learning
- ✅ **Motivation** to build something amazing

## What's Next?

Click "Next" to start your HTML journey! In the next lesson, you'll:
- Learn what HTML actually stands for
- Understand the basic structure of HTML
- Write your very first lines of HTML code
- See your first web page come to life

Are you excited? You should be! You're about to join millions of people around the world who create amazing things with code.

**Welcome to the world of programming!** 🎉

Let's build something amazing together!
    `,
    keyPoints: [
      'You now understand computers, programming, the internet, and websites',
      'HTML is perfect for beginners - visual, easy to understand, and forgiving',
      'You\'ll start simple and gradually build more complex projects',
      'Making mistakes is normal and part of the learning process',
      'Every professional programmer started exactly where you are now',
      'You have all the knowledge and tools needed to begin your HTML journey'
    ],
    prevLesson: 'programming-tools',
    nextLesson: 'html-home'
  }
]

// Helper functions
export function getProgrammingLessonById(id: string): ProgrammingLesson | undefined {
  return programmingLessons.find(lesson => lesson.id === id)
}

export function getProgrammingLessonsByCategory(categoryId: string): ProgrammingLesson[] {
  return programmingLessons.filter(lesson => lesson.category === categoryId)
    .sort((a, b) => a.order - b.order)
}

export function getNextProgrammingLesson(currentId: string): ProgrammingLesson | undefined {
  const currentLesson = getProgrammingLessonById(currentId)
  if (!currentLesson) return undefined
  
  const currentIndex = programmingLessons.findIndex(lesson => lesson.id === currentId)
  return programmingLessons[currentIndex + 1]
}

export function getPrevProgrammingLesson(currentId: string): ProgrammingLesson | undefined {
  const currentLesson = getProgrammingLessonById(currentId)
  if (!currentLesson) return undefined
  
  const currentIndex = programmingLessons.findIndex(lesson => lesson.id === currentId)
  if (currentIndex > 0) {
    return programmingLessons[currentIndex - 1]
  }
  return undefined
}
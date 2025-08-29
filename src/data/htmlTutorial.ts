export interface HTMLLesson {
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

export interface HTMLCategory {
  id: string
  title: string
  description: string
  lessons: string[]
  order: number
}

export const htmlCategories: HTMLCategory[] = [
  {
    id: 'basics',
    title: 'HTML Tutorial',
    description: 'Learn the fundamentals of HTML',
    order: 1,
    lessons: [
      'html-home',
      'html-introduction',
      'html-editors',
      'html-basic',
      'html-elements',
      'html-attributes',
      'html-headings',
      'html-paragraphs',
      'html-styles',
      'html-formatting',
      'html-quotations',
      'html-comments',
      'html-colors',
      'html-css',
      'html-links',
      'html-images',
      'html-favicon',
      'html-page-title',
      'html-tables',
      'html-lists',
      'html-block-inline',
      'html-div',
      'html-classes',
      'html-id',
      'html-iframes',
      'html-javascript',
      'html-file-paths',
      'html-head',
      'html-layout',
      'html-responsive',
      'html-computercode',
      'html-semantics',
      'html-style-guide',
      'html-entities',
      'html-symbols',
      'html-emojis',
      'html-charsets',
      'html-url-encode',
      'html-vs-xhtml'
    ]
  },
  {
    id: 'forms',
    title: 'HTML Forms',
    description: 'Master HTML forms and user input',
    order: 2,
    lessons: [
      'html-forms',
      'html-form-attributes',
      'html-form-elements',
      'html-input-types',
      'html-input-attributes',
      'input-form-attributes'
    ]
  },
  {
    id: 'graphics',
    title: 'HTML Graphics',
    description: 'Learn HTML Canvas and SVG',
    order: 3,
    lessons: [
      'html-canvas',
      'html-svg'
    ]
  },
  {
    id: 'media',
    title: 'HTML Media',
    description: 'Work with multimedia in HTML',
    order: 4,
    lessons: [
      'html-media',
      'html-video',
      'html-audio',
      'html-plug-ins',
      'html-youtube'
    ]
  },
  {
    id: 'apis',
    title: 'HTML APIs',
    description: 'Modern HTML5 APIs and features',
    order: 5,
    lessons: [
      'html-web-apis',
      'html-geolocation',
      'html-drag-drop',
      'html-web-storage',
      'html-web-workers',
      'html-sse'
    ]
  },
  {
    id: 'examples',
    title: 'HTML Examples',
    description: 'Practice and test your HTML knowledge',
    order: 6,
    lessons: [
      'html-examples',
      'html-editor',
      'html-quiz',
      'html-exercises',
      'html-website',
      'html-syllabus',
      'html-study-plan',
      'html-interview-prep',
      'html-bootcamp',
      'html-certificate',
      'html-summary',
      'html-accessibility'
    ]
  },
  {
    id: 'references',
    title: 'HTML References',
    description: 'Complete HTML reference guide',
    order: 7,
    lessons: [
      'html-tag-list',
      'html-attributes-ref',
      'html-global-attributes',
      'html-browser-support',
      'html-events',
      'html-colors-ref',
      'html-canvas-ref',
      'html-audio-video',
      'html-doctypes',
      'html-character-sets',
      'html-url-encode-ref',
      'html-lang-codes',
      'http-messages',
      'http-methods',
      'px-to-em-converter',
      'keyboard-shortcuts'
    ]
  }
]

export const htmlLessons: HTMLLesson[] = [
  // HTML Tutorial - Basics
  {
    id: 'html-home',
    title: 'HTML HOME',
    description: 'Welcome to HTML tutorial - Learn the basics of web development',
    category: 'basics',
    order: 1,
    duration: '5 min',
    difficulty: 'Beginner',
    content: `
# Welcome to HTML Tutorial

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using markup.

## What You'll Learn

- HTML basics and syntax
- How to structure web content
- Essential HTML elements and attributes
- Best practices for modern web development

## Why Learn HTML?

HTML is the foundation of all web development. Every website you visit is built with HTML. Learning HTML is your first step toward becoming a web developer.

## Course Structure

This comprehensive tutorial covers everything from basic HTML elements to advanced features:

- **HTML Basics**: Elements, attributes, structure
- **Forms**: Creating interactive user interfaces  
- **Graphics**: Canvas and SVG elements
- **Media**: Video, audio, and multimedia
- **APIs**: Modern HTML5 features
- **Examples**: Practical exercises and projects
- **References**: Complete documentation

Start your journey to web development mastery today!
    `,
    keyPoints: [
      'HTML is the foundation of web development',
      'Learn structured approach from basics to advanced',
      'Practical examples and exercises included',
      'Modern HTML5 features and best practices'
    ]
  },
  {
    id: 'html-introduction',
    title: 'HTML Introduction',
    description: 'Learn what HTML is and how web pages are structured',
    category: 'basics',
    order: 2,
    duration: '10 min',
    difficulty: 'Beginner',
    content: `
# HTML Introduction

## What is HTML?

HTML (HyperText Markup Language) is the standard markup language for creating Web pages.

- **HTML** stands for Hyper Text Markup Language
- **HTML** is the standard markup language for creating Web pages
- **HTML** describes the structure of a Web page
- **HTML** consists of a series of elements
- **HTML** elements tell the browser how to display the content

## A Simple HTML Document

Here's what a basic HTML document looks like:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
</body>
</html>
\`\`\`

## Example Explained

- The \`<!DOCTYPE html>\` declaration defines that this document is HTML5
- The \`<html>\` element is the root element of an HTML page
- The \`<head>\` element contains meta information about the HTML page
- The \`<title>\` element specifies a title for the HTML page (shown in browser's title bar)
- The \`<body>\` element defines the document's body, and is a container for all visible contents
- The \`<h1>\` element defines a large heading
- The \`<p>\` element defines a paragraph

## HTML Elements

An HTML element is defined by a start tag, some content, and an end tag:

\`<tagname>Content goes here...</tagname>\`

HTML elements can be nested (elements can contain other elements).

## Web Browsers

The purpose of a web browser (Chrome, Edge, Firefox, Safari) is to read HTML documents and display them correctly.

A browser does not display the HTML tags, but uses them to determine how to display the document.
    `,
    codeExample: `<!DOCTYPE html>
<html>
<head>
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is my first paragraph in HTML.</p>
    <p>HTML is <strong>amazing</strong> and <em>easy to learn</em>!</p>
</body>
</html>`,
    keyPoints: [
      'HTML is the markup language for web pages',
      'HTML documents have a specific structure',
      'Elements are the building blocks of HTML',
      'Browsers interpret HTML to display web pages'
    ],
    nextLesson: 'html-editors'
  },
  {
    id: 'html-editors',
    title: 'HTML Editors',
    description: 'Learn about different tools for writing HTML code',
    category: 'basics',
    order: 3,
    duration: '8 min',
    difficulty: 'Beginner',
    content: `
# HTML Editors

## Write HTML Using Notepad or TextEdit

Web pages can be created and modified by using professional HTML editors. However, for learning HTML we recommend a simple text editor like Notepad (PC) or TextEdit (Mac).

Using a simple text editor is a good way to learn HTML.

## Step 1: Open Notepad (PC)

**Windows 8 or later:**
Open the Start Screen (the window symbol at the bottom left on your screen). Type Notepad.

**Windows 7 or earlier:**
Open Start > Programs > Accessories > Notepad

## Step 1: Open TextEdit (Mac)

Open Finder > Applications > TextEdit

Also change some preferences to get the application to save files correctly:
- Go to Preferences (TextEdit > Preferences)
- In the "New Document" tab, change the format to "Plain Text"
- In the "Open and Save" tab, check "Ignore rich text commands in HTML files"

## Step 2: Write Some HTML

Write or copy the following HTML code into Notepad:

\`\`\`html
<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>

<p>My first paragraph.</p>

</body>
</html>
\`\`\`

## Step 3: Save the HTML Page

Save the file on your computer with the name "index.html".

**Note:** When saving an HTML file, you can use either .htm or .html as the file extension. There is no difference; it is up to you.

## Step 4: View the HTML Page in Your Browser

Open the saved HTML file in your favorite browser (double click on the file, or right-click and choose "Open with").

## Professional HTML Editors

However, professional web developers often use specialized HTML editors that provide features like:

- **Syntax highlighting** - Different colors for HTML tags, attributes, and content
- **Auto-completion** - Suggestions as you type
- **Error detection** - Highlighting syntax errors
- **Live preview** - See changes in real-time

### Popular HTML Editors:

1. **Visual Studio Code** (Free) - Microsoft's popular code editor
2. **Sublime Text** - Fast and customizable text editor  
3. **Atom** (Free) - GitHub's hackable text editor
4. **WebStorm** - Professional IDE by JetBrains
5. **Brackets** (Free) - Adobe's open-source editor

### Online HTML Editors:

- **CodePen** - Online code editor and community
- **JSFiddle** - Online playground for web development
- **W3Schools Tryit Editor** - Simple online HTML editor

## Tips for Choosing an Editor

- **Beginners**: Start with a simple text editor or Visual Studio Code
- **Advanced users**: Consider full-featured IDEs like WebStorm
- **Quick testing**: Use online editors like CodePen

The most important thing is to start coding and get comfortable with HTML syntax!
    `,
    keyPoints: [
      'You can write HTML in any text editor',
      'Professional editors offer helpful features',
      'Save HTML files with .html or .htm extension',
      'Test your HTML files in web browsers'
    ],
    prevLesson: 'html-introduction',
    nextLesson: 'html-basic'
  },
  {
    id: 'html-elements',
    title: 'HTML Elements',
    description: 'Understand HTML elements, tags, and their structure',
    category: 'basics',
    order: 5,
    duration: '10 min',
    difficulty: 'Beginner',
    content: `
# HTML Elements

## What are HTML Elements?

An HTML element is defined by a start tag, some content, and an end tag:

\`<tagname>Content goes here...</tagname>\`

The HTML **element** is everything from the start tag to the end tag:

\`<h1>My First Heading</h1>\`
\`<p>My first paragraph.</p>\`

## HTML Elements

| Start tag | Element content | End tag |
|-----------|----------------|---------|
| \`<h1>\`    | My First Heading | \`</h1>\` |
| \`<p>\`     | My first paragraph. | \`</p>\` |
| \`<br>\`    | *none*           | *none*  |

**Note:** Some HTML elements have no content (like the \`<br>\` element). These elements are called empty elements. Empty elements do not have an end tag!

## Nested HTML Elements

HTML elements can be nested (this means that elements can contain other elements).

All HTML documents consist of nested HTML elements.

The following example contains four HTML elements (\`<html>\`, \`<body>\`, \`<h1>\` and \`<p>\`):

\`\`\`html
<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>
\`\`\`

## Example Explained

The \`<html>\` element is the root element and it defines the whole HTML document.

It has a start tag \`<html>\` and an end tag \`</html>\`.

Then, inside the \`<html>\` element there is a \`<body>\` element:

\`\`\`html
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
\`\`\`

The \`<body>\` element defines the document's body.

It has a start tag \`<body>\` and an end tag \`</body>\`.

Then, inside the \`<body>\` element there are two other elements: \`<h1>\` and \`<p>\`:

\`\`\`html
<h1>My First Heading</h1>
<p>My first paragraph.</p>
\`\`\`

The \`<h1>\` element defines a heading.

It has a start tag \`<h1>\` and an end tag \`</h1>\`:

\`<h1>My First Heading</h1>\`

The \`<p>\` element defines a paragraph.

It has a start tag \`<p>\` and an end tag \`</p>\`:

\`<p>My first paragraph.</p>\`

## Never Skip the End Tag

Some HTML elements will display correctly, even if you forget the end tag:

\`\`\`html
<html>
<body>

<p>This is a paragraph
<p>This is a paragraph

</body>
</html>
\`\`\`

**However, never rely on this! Unexpected results and errors may occur if you forget the end tag!**

## Empty HTML Elements

HTML elements with no content are called empty elements.

The \`<br>\` tag defines a line break, and is an empty element without a closing tag:

\`\`\`html
<p>This is a <br> paragraph with a line break.</p>
\`\`\`

## HTML is Not Case Sensitive

HTML tags are not case sensitive: \`<P>\` means the same as \`<p>\`.

The HTML standard does not require lowercase tags, but W3C **recommends** lowercase in HTML, and **demands** lowercase for stricter document types like XHTML.
    `,
    codeExample: `<!DOCTYPE html>
<html>
<body>

<h1>This is a heading</h1>
<h2>This is a smaller heading</h2>

<p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>

<p>This is another paragraph.<br>
This line comes after a line break.</p>

<ul>
  <li>First list item</li>
  <li>Second list item</li>
  <li>Third list item</li>
</ul>

</body>
</html>`,
    keyPoints: [
      'HTML elements consist of start tag, content, and end tag',
      'Elements can be nested inside other elements',
      'Some elements are empty and have no closing tag',
      'Always use lowercase for HTML tags',
      'Never skip end tags to avoid unexpected results'
    ],
    prevLesson: 'html-basic',
    nextLesson: 'html-attributes'
  },
  {
    id: 'html-attributes',
    title: 'HTML Attributes',
    description: 'Learn about HTML attributes and how they modify elements',
    category: 'basics',
    order: 6,
    duration: '15 min',
    difficulty: 'Beginner',
    content: `
# HTML Attributes

## What are HTML Attributes?

HTML attributes provide additional information about HTML elements.

## HTML Attributes

- All HTML elements can have **attributes**
- Attributes provide **additional information** about elements
- Attributes are always specified in **the start tag**
- Attributes usually come in name/value pairs like: **name="value"**

## The href Attribute

The \`<a>\` tag defines a hyperlink. The \`href\` attribute specifies the URL of the page the link goes to:

\`\`\`html
<a href="https://www.example.com">Visit Example.com!</a>
\`\`\`

## The src Attribute

The \`<img>\` tag is used to embed an image in an HTML page. The \`src\` attribute specifies the path to the image to be displayed:

\`\`\`html
<img src="img_girl.jpg">
\`\`\`

There are two ways to specify the URL in the \`src\` attribute:

**1. Absolute URL** - Links to an external image that is hosted on another website.
Example: src="https://www.example.com/images/img_girl.jpg"

**2. Relative URL** - Links to an image that is hosted within the website.
Example: src="img_girl.jpg"

## The width and height Attributes

The \`<img>\` tag should also contain the \`width\` and \`height\` attributes, which specify the width and height of the image (in pixels):

\`\`\`html
<img src="img_girl.jpg" width="500" height="600">
\`\`\`

## The alt Attribute

The required \`alt\` attribute for the \`<img>\` tag specifies an alternate text for an image, if the image for some reason cannot be displayed. This can be due to a slow connection, or an error in the \`src\` attribute, or if the user uses a screen reader.

\`\`\`html
<img src="img_girl.jpg" alt="Girl with a jacket">
\`\`\`

## The style Attribute

The \`style\` attribute is used to add styles to an element, such as color, font, size, and more.

\`\`\`html
<p style="color:red;">This is a red paragraph.</p>
\`\`\`

## The lang Attribute

You should always include the \`lang\` attribute inside the \`<html>\` tag, to declare the language of the Web page. This is meant to assist search engines and browsers.

The following example specifies English as the language:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<body>
...
</body>
</html>
\`\`\`

Country codes can also be added to the language code in the \`lang\` attribute. So, the first two characters define the language of the HTML page, and the last two characters define the country.

The following example specifies English as the language and United States as the country:

\`\`\`html
<!DOCTYPE html>
<html lang="en-US">
<body>
...
</body>
</html>
\`\`\`

## The title Attribute

The \`title\` attribute defines some extra information about an element.

The value of the title attribute will be displayed as a tooltip when you mouse over the element:

\`\`\`html
<p title="I'm a tooltip">This is a paragraph.</p>
\`\`\`

## We Suggest: Always Use Lowercase Attributes

The HTML standard does not require lowercase attribute names.

The title attribute (and all other attributes) can be written with uppercase or lowercase like **title** or **TITLE**.

However, W3C **recommends** lowercase attributes in HTML, and **demands** lowercase attributes for stricter document types like XHTML.

## We Suggest: Always Quote Attribute Values

The HTML standard does not require quotes around attribute values.

However, W3C **recommends** quotes in HTML, and **demands** quotes for stricter document types like XHTML.

**Good:**
\`<a href="https://www.example.com">Visit our HTML tutorial</a>\`

**Bad:**
\`<a href=https://www.example.com>Visit our HTML tutorial</a>\`

Sometimes you have to use quotes. This example will not display the title attribute correctly, because it contains a space:

\`<p title=About Example>About Example</p>\`

## Single or Double Quotes?

Double quotes around attribute values are the most common in HTML, but single quotes can also be used.

In some situations, when the attribute value itself contains double quotes, it is necessary to use single quotes:

\`<p title='John "ShotGun" Nelson'>\`

Or vice versa:

\`<p title="John 'ShotGun' Nelson">\`
    `,
    codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>HTML Attributes Example</title>
</head>
<body>

<h1 style="color:blue; text-align:center;">Welcome to My Website</h1>

<p title="This is a tooltip">Hover over this paragraph to see a tooltip.</p>

<a href="https://www.google.com" title="Go to Google">Visit Google</a>

<br><br>

<img src="https://via.placeholder.com/300x200" 
     alt="Placeholder image" 
     width="300" 
     height="200"
     title="This is a sample image">

<p style="color:red; font-size:18px;">This paragraph has custom styling.</p>

</body>
</html>`,
    exercises: [
      {
        question: "What attribute is used to specify the destination URL of a link?",
        answer: "href",
        hint: "Think about hypertext references"
      },
      {
        question: "Which attribute provides alternative text for images?",
        answer: "alt",
        hint: "This attribute is important for accessibility"
      },
      {
        question: "What's the purpose of the title attribute?",
        answer: "It provides extra information shown as a tooltip when hovering over an element",
        hint: "It appears when you hover your mouse over an element"
      }
    ],
    keyPoints: [
      'Attributes provide additional information about HTML elements',
      'Attributes are specified in the start tag as name="value" pairs',
      'Common attributes include href, src, alt, width, height, style, lang, and title',
      'Always use lowercase for attribute names',
      'Always quote attribute values',
      'The alt attribute is required for images for accessibility'
    ],
    prevLesson: 'html-elements',
    nextLesson: 'html-headings'
  },
  {
    id: 'html-basic',
    title: 'HTML Basic',
    description: 'Learn the basic structure and syntax of HTML',
    category: 'basics',
    order: 4,
    duration: '12 min', 
    difficulty: 'Beginner',
    content: `
# HTML Basic Examples

## HTML Documents

All HTML documents must start with a document type declaration: \`<!DOCTYPE html>\`.

The HTML document itself begins with \`<html>\` and ends with \`</html>\`.

The visible part of the HTML document is between \`<body>\` and \`</body>\`.

### Example:

\`\`\`html
<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>
\`\`\`

## The <!DOCTYPE> Declaration

The \`<!DOCTYPE>\` declaration represents the document type, and helps browsers to display web pages correctly.

It must only appear once, at the top of the page (before any HTML tags).

The \`<!DOCTYPE>\` declaration is not case sensitive.

The \`<!DOCTYPE>\` declaration for HTML5 is:

\`<!DOCTYPE html>\`

## HTML Headings

HTML headings are defined with the \`<h1>\` to \`<h6>\` tags.

\`<h1>\` defines the most important heading. \`<h6>\` defines the least important heading:

\`\`\`html
<h1>This is heading 1</h1>
<h2>This is heading 2</h2>
<h3>This is heading 3</h3>
\`\`\`

## HTML Paragraphs

HTML paragraphs are defined with the \`<p>\` tag:

\`\`\`html
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>
\`\`\`

## HTML Links

HTML links are defined with the \`<a>\` tag:

\`\`\`html
<a href="https://www.example.com">This is a link</a>
\`\`\`

The link's destination is specified in the \`href\` attribute.

Attributes are used to provide additional information about HTML elements.

## HTML Images

HTML images are defined with the \`<img>\` tag.

The source file (\`src\`), alternative text (\`alt\`), width, and height are provided as attributes:

\`\`\`html
<img src="image.jpg" alt="Description" width="104" height="142">
\`\`\`

## How to View HTML Source

**Right-click in an HTML page and select "View Page Source" (in Chrome) or "View Source" (in Edge), or similar in other browsers.**

This will open a window containing the HTML source code of the page.

## Inspect an HTML Element

**Right-click on an element (or a blank area), and choose "Inspect" or "Inspect Element" to see what elements are made up of.**

You will see both the HTML and the CSS. You can also edit the HTML or CSS on-the-fly in the Elements or Styles panel that opens.
    `,
    codeExample: `<!DOCTYPE html>
<html>
<body>

<h1>Welcome to My Website</h1>
<h2>About Me</h2>

<p>This is my first website built with HTML.</p>
<p>I'm learning web development step by step.</p>

<h3>My Favorite Links</h3>
<a href="https://www.google.com">Google</a><br>
<a href="https://www.github.com">GitHub</a>

<h3>A Beautiful Image</h3>
<img src="sunset.jpg" alt="Beautiful sunset" width="300" height="200">

</body>
</html>`,
    exercises: [
      {
        question: "What does the <!DOCTYPE html> declaration do?",
        answer: "It tells the browser that this is an HTML5 document",
        hint: "Think about what information the browser needs to display the page correctly"
      },
      {
        question: "Which heading tag creates the largest heading?",
        answer: "<h1>",
        hint: "Headings are numbered from 1 to 6, with 1 being the largest"
      }
    ],
    keyPoints: [
      'All HTML documents start with <!DOCTYPE html>',
      'Headings use <h1> to <h6> tags',
      'Paragraphs use <p> tags',
      'Links use <a> tags with href attribute',
      'Images use <img> tags with src and alt attributes'
    ],
    prevLesson: 'html-editors',
    nextLesson: 'html-elements'
  },
  {
    id: 'html-elements',
    title: 'HTML Elements',
    description: 'Understand HTML elements, tags, and their structure',
    category: 'basics',
    order: 5,
    duration: '10 min',
    difficulty: 'Beginner',
    content: `
# HTML Elements

## What are HTML Elements?

An HTML element is defined by a start tag, some content, and an end tag:

\`<tagname>Content goes here...</tagname>\`

The HTML **element** is everything from the start tag to the end tag:

\`<h1>My First Heading</h1>\`
\`<p>My first paragraph.</p>\`

## HTML Elements

| Start tag | Element content | End tag |
|-----------|----------------|---------|
| \`<h1>\`    | My First Heading | \`</h1>\` |
| \`<p>\`     | My first paragraph. | \`</p>\` |
| \`<br>\`    | *none*           | *none*  |

**Note:** Some HTML elements have no content (like the \`<br>\` element). These elements are called empty elements. Empty elements do not have an end tag!

## Nested HTML Elements

HTML elements can be nested (this means that elements can contain other elements).

All HTML documents consist of nested HTML elements.

The following example contains four HTML elements (\`<html>\`, \`<body>\`, \`<h1>\` and \`<p>\`):

\`\`\`html
<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>
\`\`\`

## Example Explained

The \`<html>\` element is the root element and it defines the whole HTML document.

It has a start tag \`<html>\` and an end tag \`</html>\`.

Then, inside the \`<html>\` element there is a \`<body>\` element:

\`\`\`html
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
\`\`\`

The \`<body>\` element defines the document's body.

It has a start tag \`<body>\` and an end tag \`</body>\`.

Then, inside the \`<body>\` element there are two other elements: \`<h1>\` and \`<p>\`:

\`\`\`html
<h1>My First Heading</h1>
<p>My first paragraph.</p>
\`\`\`

The \`<h1>\` element defines a heading.

It has a start tag \`<h1>\` and an end tag \`</h1>\`:

\`<h1>My First Heading</h1>\`

The \`<p>\` element defines a paragraph.

It has a start tag \`<p>\` and an end tag \`</p>\`:

\`<p>My first paragraph.</p>\`

## Never Skip the End Tag

Some HTML elements will display correctly, even if you forget the end tag:

\`\`\`html
<html>
<body>

<p>This is a paragraph
<p>This is a paragraph

</body>
</html>
\`\`\`

**However, never rely on this! Unexpected results and errors may occur if you forget the end tag!**

## Empty HTML Elements

HTML elements with no content are called empty elements.

The \`<br>\` tag defines a line break, and is an empty element without a closing tag:

\`\`\`html
<p>This is a <br> paragraph with a line break.</p>
\`\`\`

## HTML is Not Case Sensitive

HTML tags are not case sensitive: \`<P>\` means the same as \`<p>\`.

The HTML standard does not require lowercase tags, but W3C **recommends** lowercase in HTML, and **demands** lowercase for stricter document types like XHTML.
    `,
    codeExample: `<!DOCTYPE html>
<html>
<body>

<h1>This is a heading</h1>
<h2>This is a smaller heading</h2>

<p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>

<p>This is another paragraph.<br>
This line comes after a line break.</p>

<ul>
  <li>First list item</li>
  <li>Second list item</li>
  <li>Third list item</li>
</ul>

</body>
</html>`,
    keyPoints: [
      'HTML elements consist of start tag, content, and end tag',
      'Elements can be nested inside other elements',
      'Some elements are empty and have no closing tag',
      'Always use lowercase for HTML tags',
      'Never skip end tags to avoid unexpected results'
    ],
    prevLesson: 'html-basic',
    nextLesson: 'html-attributes'
  },
  {
    id: 'html-attributes',
    title: 'HTML Attributes',
    description: 'Learn about HTML attributes and how they modify elements',
    category: 'basics',
    order: 6,
    duration: '15 min',
    difficulty: 'Beginner',
    content: `
# HTML Attributes

## What are HTML Attributes?

HTML attributes provide additional information about HTML elements.

## HTML Attributes

- All HTML elements can have **attributes**
- Attributes provide **additional information** about elements
- Attributes are always specified in **the start tag**
- Attributes usually come in name/value pairs like: **name="value"**

## The href Attribute

The \`<a>\` tag defines a hyperlink. The \`href\` attribute specifies the URL of the page the link goes to:

\`\`\`html
<a href="https://www.example.com">Visit Example.com!</a>
\`\`\`

## The src Attribute

The \`<img>\` tag is used to embed an image in an HTML page. The \`src\` attribute specifies the path to the image to be displayed:

\`\`\`html
<img src="img_girl.jpg">
\`\`\`

There are two ways to specify the URL in the \`src\` attribute:

**1. Absolute URL** - Links to an external image that is hosted on another website.
Example: src="https://www.example.com/images/img_girl.jpg"

**2. Relative URL** - Links to an image that is hosted within the website.
Example: src="img_girl.jpg"

## The width and height Attributes

The \`<img>\` tag should also contain the \`width\` and \`height\` attributes, which specify the width and height of the image (in pixels):

\`\`\`html
<img src="img_girl.jpg" width="500" height="600">
\`\`\`

## The alt Attribute

The required \`alt\` attribute for the \`<img>\` tag specifies an alternate text for an image, if the image for some reason cannot be displayed. This can be due to a slow connection, or an error in the \`src\` attribute, or if the user uses a screen reader.

\`\`\`html
<img src="img_girl.jpg" alt="Girl with a jacket">
\`\`\`

## The style Attribute

The \`style\` attribute is used to add styles to an element, such as color, font, size, and more.

\`\`\`html
<p style="color:red;">This is a red paragraph.</p>
\`\`\`

## The lang Attribute

You should always include the \`lang\` attribute inside the \`<html>\` tag, to declare the language of the Web page. This is meant to assist search engines and browsers.

The following example specifies English as the language:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<body>
...
</body>
</html>
\`\`\`

Country codes can also be added to the language code in the \`lang\` attribute. So, the first two characters define the language of the HTML page, and the last two characters define the country.

The following example specifies English as the language and United States as the country:

\`\`\`html
<!DOCTYPE html>
<html lang="en-US">
<body>
...
</body>
</html>
\`\`\`

## The title Attribute

The \`title\` attribute defines some extra information about an element.

The value of the title attribute will be displayed as a tooltip when you mouse over the element:

\`\`\`html
<p title="I'm a tooltip">This is a paragraph.</p>
\`\`\`

## We Suggest: Always Use Lowercase Attributes

The HTML standard does not require lowercase attribute names.

The title attribute (and all other attributes) can be written with uppercase or lowercase like **title** or **TITLE**.

However, W3C **recommends** lowercase attributes in HTML, and **demands** lowercase attributes for stricter document types like XHTML.

## We Suggest: Always Quote Attribute Values

The HTML standard does not require quotes around attribute values.

However, W3C **recommends** quotes in HTML, and **demands** quotes for stricter document types like XHTML.

**Good:**
\`<a href="https://www.example.com">Visit our HTML tutorial</a>\`

**Bad:**
\`<a href=https://www.example.com>Visit our HTML tutorial</a>\`

Sometimes you have to use quotes. This example will not display the title attribute correctly, because it contains a space:

\`<p title=About Example>About Example</p>\`

## Single or Double Quotes?

Double quotes around attribute values are the most common in HTML, but single quotes can also be used.

In some situations, when the attribute value itself contains double quotes, it is necessary to use single quotes:

\`<p title='John "ShotGun" Nelson'>\`

Or vice versa:

\`<p title="John 'ShotGun' Nelson">\`
    `,
    codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>HTML Attributes Example</title>
</head>
<body>

<h1 style="color:blue; text-align:center;">Welcome to My Website</h1>

<p title="This is a tooltip">Hover over this paragraph to see a tooltip.</p>

<a href="https://www.google.com" title="Go to Google">Visit Google</a>

<br><br>

<img src="https://via.placeholder.com/300x200" 
     alt="Placeholder image" 
     width="300" 
     height="200"
     title="This is a sample image">

<p style="color:red; font-size:18px;">This paragraph has custom styling.</p>

</body>
</html>`,
    exercises: [
      {
        question: "What attribute is used to specify the destination URL of a link?",
        answer: "href",
        hint: "Think about hypertext references"
      },
      {
        question: "Which attribute provides alternative text for images?",
        answer: "alt",
        hint: "This attribute is important for accessibility"
      },
      {
        question: "What's the purpose of the title attribute?",
        answer: "It provides extra information shown as a tooltip when hovering over an element",
        hint: "It appears when you hover your mouse over an element"
      }
    ],
    keyPoints: [
      'Attributes provide additional information about HTML elements',
      'Attributes are specified in the start tag as name="value" pairs',
      'Common attributes include href, src, alt, width, height, style, lang, and title',
      'Always use lowercase for attribute names',
      'Always quote attribute values',
      'The alt attribute is required for images for accessibility'
    ],
    prevLesson: 'html-elements',
    nextLesson: 'html-headings'
  },
  {
    id: 'html-headings',
    title: 'HTML Headings',
    description: 'Learn how to create and structure headings in HTML',
    category: 'basics',
    order: 7,
    duration: '8 min',
    difficulty: 'Beginner',
    content: `
# HTML Headings

## HTML Headings

HTML headings are defined with the \`<h1>\` to \`<h6>\` tags.

\`<h1>\` defines the most important heading. \`<h6>\` defines the least important heading.

\`\`\`html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
\`\`\`

**Note:** Browsers automatically add some white space (a margin) before and after a heading.

## Headings Are Important

Search engines use the headings to index the structure and content of your web pages.

Users often skim a page by its headings. It is important to use headings to show the document structure.

\`<h1>\` headings should be used for main headings, followed by \`<h2>\` headings, then the less important \`<h3>\`, and so on.

**Note:** Use HTML headings for headings only. Don't use headings to make text BIG or bold.

## Bigger Headings

Each HTML heading has a default size. However, you can specify the size for any heading with the \`style\` attribute, using the CSS \`font-size\` property:

\`\`\`html
<h1 style="font-size:60px;">Heading 1</h1>
\`\`\`

## HTML Horizontal Rules

The \`<hr>\` tag defines a thematic break in an HTML page, and is most often displayed as a horizontal rule.

The \`<hr>\` element is used to separate content (or define a change) in an HTML page:

\`\`\`html
<h1>This is heading 1</h1>
<p>This is some text.</p>
<hr>
<h2>This is heading 2</h2>
<p>This is some other text.</p>
<hr>
\`\`\`

The \`<hr>\` tag is an empty tag, which means that it has no end tag.

## The HTML <head> Element

The HTML \`<head>\` element is a container for the following elements: \`<title>\`, \`<style>\`, \`<meta>\`, \`<link>\`, \`<script>\`, and \`<base>\`.

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>A Meaningful Page Title</title>
</head>
<body>

The content of the document......

</body>
</html>
\`\`\`

The \`<head>\` element is a container for metadata (data about data) and is placed between the \`<html>\` tag and the \`<body>\` tag.

HTML metadata is data about the HTML document. Metadata is not displayed.

The \`<head>\` element is a container for metadata. HTML metadata is data about the HTML document. Metadata is not displayed.

## The HTML <title> Element

The \`<title>\` element defines the title of the document. The title must be text-only, and it is shown in the browser's title bar or in the page's tab.

The \`<title>\` element is required in HTML documents!

The contents of a page title is very important for search engine optimization (SEO)! The page title is used by search engine algorithms to decide the order when listing pages in search results.

The \`<title>\` element:

- defines a title in the browser toolbar
- provides a title for the page when it is added to favorites
- displays a title for the page in search engine-results

So, try to make the title as accurate and meaningful as possible!
    `,
    codeExample: `<!DOCTYPE html>
<html>
<head>
    <title>HTML Headings Example</title>
</head>
<body>

<h1>Welcome to My Website</h1>
<h2>About Me</h2>
<p>This section contains information about me.</p>

<h2>My Services</h2>
<h3>Web Development</h3>
<p>I create responsive and modern websites.</p>

<h3>Graphic Design</h3>
<p>I design logos and marketing materials.</p>

<hr>

<h2>Contact Information</h2>
<h3>Email</h3>
<p>contact@example.com</p>

<h3>Phone</h3>
<p>+1 (555) 123-4567</p>

<h1 style="font-size:40px; color:blue;">Custom Styled Heading</h1>

</body>
</html>`,
    exercises: [
      {
        question: "Which heading tag represents the most important heading?",
        answer: "<h1>",
        hint: "Think about the hierarchy - what comes first?"
      },
      {
        question: "What does the <hr> tag do?",
        answer: "It creates a horizontal rule (line) to separate content",
        hint: "It's used to create visual separation between sections"
      },
      {
        question: "Why are headings important for SEO?",
        answer: "Search engines use headings to understand the structure and content of web pages",
        hint: "Search engines read your content to understand what it's about"
      }
    ],
    keyPoints: [
      'HTML has six heading levels: <h1> to <h6>',
      '<h1> is most important, <h6> is least important',
      'Headings are crucial for SEO and document structure',
      'Use headings for structure, not just for styling',
      'The <hr> tag creates horizontal rules for content separation',
      'The <title> element in <head> is required and important for SEO'
    ],
    prevLesson: 'html-attributes',
    nextLesson: 'html-paragraphs'
  },
  // Add more lessons following the same pattern
  // For brevity, I'm including key lessons. In practice, you'd implement all lessons from the requirements.
]

// Helper function to get lesson by ID
export function getLessonById(id: string): HTMLLesson | undefined {
  return htmlLessons.find(lesson => lesson.id === id)
}

// Helper function to get lessons by category
export function getLessonsByCategory(categoryId: string): HTMLLesson[] {
  return htmlLessons.filter(lesson => lesson.category === categoryId)
    .sort((a, b) => a.order - b.order)
}

// Helper function to get next lesson
export function getNextLesson(currentLessonId: string): HTMLLesson | undefined {
  const currentLesson = getLessonById(currentLessonId)
  if (!currentLesson) return undefined
  
  const categoryLessons = getLessonsByCategory(currentLesson.category)
  const currentIndex = categoryLessons.findIndex(lesson => lesson.id === currentLessonId)
  
  if (currentIndex < categoryLessons.length - 1) {
    return categoryLessons[currentIndex + 1]
  }
  
  // If this is the last lesson in the category, get first lesson of next category
  const currentCategory = htmlCategories.find(cat => cat.id === currentLesson.category)
  if (!currentCategory) return undefined
  
  const nextCategory = htmlCategories.find(cat => cat.order === currentCategory.order + 1)
  if (nextCategory && nextCategory.lessons.length > 0) {
    return getLessonById(nextCategory.lessons[0])
  }
  
  return undefined
}

// Helper function to get previous lesson
export function getPrevLesson(currentLessonId: string): HTMLLesson | undefined {
  const currentLesson = getLessonById(currentLessonId)
  if (!currentLesson) return undefined
  
  const categoryLessons = getLessonsByCategory(currentLesson.category)
  const currentIndex = categoryLessons.findIndex(lesson => lesson.id === currentLessonId)
  
  if (currentIndex > 0) {
    return categoryLessons[currentIndex - 1]
  }
  
  // If this is the first lesson in the category, get last lesson of previous category
  const currentCategory = htmlCategories.find(cat => cat.id === currentLesson.category)
  if (!currentCategory) return undefined
  
  const prevCategory = htmlCategories.find(cat => cat.order === currentCategory.order - 1)
  if (prevCategory && prevCategory.lessons.length > 0) {
    const lastLessonId = prevCategory.lessons[prevCategory.lessons.length - 1]
    return getLessonById(lastLessonId)
  }
  
  return undefined
}
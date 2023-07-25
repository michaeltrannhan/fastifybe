# Question 1

You are tasked with creating a Node.js application that uses Elasticsearch to store and retrieve book data. The book data should have the following properties:

- `id`: a unique identifier for the book
- `title`: the title of the book
- `author`: the author of the book
- `publishedDate`: the date the book was published
- `description`: a brief description of the book
- `price`: the price of the book

You need to implement the following APIs:

- `GET /books`: Returns a list of all books in Elasticsearch.
- `GET /books/:id`: Returns a specific book by ID.
- `POST /books`: Creates a new book.
- `PUT /books/:id`: Updates an existing book by ID.

You can assume that Elasticsearch is already set up and running on the developer's machine.

## Requirements

- You should use `Fastify` to create the Node.js application.
- You should use the official Elasticsearch client library for Node.js (`@elastic/elasticsearch`) to interact with Elasticsearch.
- You should handle errors and provide appropriate error messages in the response.
- You should validate incoming requests to ensure that they contain the required data and data types.
- You should use async/await or Promises to handle asynchronous operations.

## Example Book Data

Here is an example of what the book data might look like:

```json
[
  {
    "id": "1",
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "publishedDate": "1960-07-11",
    "description": "The story of racial injustice and the loss of innocence in the American South during the Great Depression.",
    "price": 12.99
  },
  {
    "id": "2",
    "title": "1984",
    "author": "George Orwell",
    "publishedDate": "1949-06-08",
    "description": "A dystopian novel set in a totalitarian society ruled by the Party, which has total control over every aspect of people's lives.",
    "price": 10.99
  },
  {
    "id": "3",
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "publishedDate": "1951-07-16",
    "description": "The story of Holden Caulfield, a teenage boy who struggles with alienation and loss after being expelled from his prep school.",
    "price": 9.99
  },
  {
    "id": "4",
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "publishedDate": "1813-01-28",
    "description": "A romantic novel that follows the emotional development of Elizabeth Bennet, who learns the error of making hasty judgments.",
    "price": 8.99
  },
  {
    "id": "5",
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "publishedDate": "1937-09-21",
    "description": "A fantasy novel about the adventures of hobbit Bilbo Baggins, who is hired by the wizard Gandalf to help a group of dwarves reclaim their treasure from a dragon.",
    "price": 11.99
  },
  {
    "id": "6",
    "title": "The Adventures of Huckleberry Finn",
    "author": "Mark Twain",
    "publishedDate": "1884-12-10",
    "description": "A novel about the adventures of a young boy named Huck Finn and his friend Jim, a runaway slave, as they travel down the Mississippi River.",
    "price": 7.99
  },
  {
    "id": "7",
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "publishedDate": "1954-07-29",
    "description": "A high fantasy novel that follows the quest of hobbit Frodo Baggins to destroy the One Ring, which was created by the Dark Lord Sauron.",
    "price": 14.99
  },
  {
    "id": "8",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publishedDate": "1925-04-10",
    "description": "The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    "price": 9.99
  }
]
```

# Question 2

Please build a simple web page using VueJS/ReactJS (**VueJS is preferable**) to display book data in Question 1. A book page includes a `title`, `author`, `publishedDate`, `description`, `price` and a `comment` area. Users can reply to other comments with a maximum of one level of nesting.
The comments can use dummy data inside a JSON file:

### Instructions

1. Create a new VueJS/ReactJS project.

2. Design and implement a web page with the following components:

- Display `title`, `author`, `publishedDate`, `description`, `price` of a book.
- Create a comment section below book data section.
- Allow users to add new comments.
- Allow users to reply to other comments with one level of nesting.
- Display comments and their nested replies appropriately.
  
1. Use Vue components to create reusable and modular components:

- Create a Book component to display the book details.
- Create a Comment component to display individual comments.
- Create a CommentForm component to handle adding new comments.

1. Style the web page using Tailwind CSS to make it visually appealing.

2. Implement validation to ensure that comments cannot be empty.

3. Add features like editing and deleting comments.

# Submission

- The source code for the applications, including any necessary configuration files and installation instructions.
- A brief documentation describing how to run and test the application.

# Evaluation Criteria

- Correctness: Does the application meet the requirements outlined in the test description?
- Code Quality: Is the code well-structured, modular, and easy to read and maintain?
- Best Practices: Does the code follow best practices for Node.js and Elasticsearch development?
- Error Handling: Does the code handle errors effectively and provide appropriate error messages?
- Testing: Does the code include tests to ensure correctness and robustness of the application?

<<<<<<< HEAD

# Audiobook Review and Rating System.

This is a full-stack application for reviewing and rating audiobooks. Built with the MERN stack and styled using Tailwind CSS, the app allows users to register, log in, add audiobooks for database, see the list of all audiobooks on homepage, click and open a seprate page for each audiobook to see book info (author, genre, description) and to write reviews and give rating for the book. It has filter option for users to search for the audiobook with genre, author, title and rating. Helps users to interact with the community through reviews and ratings.


## Features

- **User Authentication:** Users can register and log in using JWT for authentication, with passwords securely hashed using bcrypt hashing method.

- **Add Audiobooks:** Users can add their audiobooks to the platform for the database for all the users and can update or edit them later.

- **View Audiobooks:** The homepage lists all available audiobooks. Clicking on an audiobook redirects to a detailed page with its description, genre, and author.

- **Comments and Ratings:** Users can post comments and give ratings on seprate audiobook page for each book.

- **Search Functionality:** Users can search for audiobooks using a search bar on the homepage. The search functionality supports filtering by genre, author, title, and rating.

## Tech Stack

**Frontend**

- React.js: A JavaScript library for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for styling.

**Backend**
- Node.js: A JavaScript runtime for server-side development.
- Express.js: A web application framework for Node.js.

**Database**
- MongoDB: A NoSQL database for storing audiobook and user data.

**Authentication**
- JWT: For secure user authentication.
- bcrypt: For hashing passwords securely.
=======
Audiobook Review and Rating System.


This is a full-stack application for reviewing and rating audiobooks. Built with the MERN stack and styled using Tailwind CSS, the app allows users to register, log in, add audiobooks for database, see the list of all audiobooks on homepage, click and open a seprate page for each audiobook to see book info (author, genre, description) and to write reviews and give rating for the book. and also to interact with the community through reviews and ratings.

Features

(1) User Authentication: Users can register and log in using JWT for authentication, with passwords securely hashed using bcrypt hashing method.

(2) Add Audiobooks: Users can add their audiobooks to the platform for the database for all the users and can update or edit them later.

(3) View Audiobooks: The homepage lists all available audiobooks. Clicking on an audiobook redirects to a detailed page with its description, genre, and author.

(4) Comments and Ratings: Users can post comments and give ratings on audiobook pages.

(5) Search Functionality: Users can search for audiobooks using a search bar on the homepage. The search functionality supports filtering by genre, author, title, and rating.
>>>>>>> 849cb1b88f8ef17955e142a7dba309fcd9b00d47




<<<<<<< HEAD
## Installation

**Prerequisites**
- Node.js
- MongoDB

**Backend setup**

Clone the repository
```bash
git clone https://github.com/PrathamN444/BookWave.git
```
Navigate to the backend directory
```bash
cd BookWave/server
```

Install the dependencies:
```bash
npm install
```

Create a .env file and add the following environment variables:
```bash
MONGO_URL = your_mongo_db_connection_string
JWT_SECRET = your_jwt_secret
```

start the server
```bash
node index.js
```


**Frontend setup**

Navigate to the frontend directory
```bash
cd ../client
```

Install the dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm start
```


    
## API Reference

- #### APIs for user authentication


| User APIs      | Description                |
| :-------- | :------------------------- |
| POST /login & /register | To login and registration for the user|
| GET /profile | To get the profile of logged in user using the token |
| POST /logout | Logout API for the user |


- #### To fetch data about the audiobooks


| Audiobook APIs      | Description                |
| :-------- | :------------------------- |
| POST /books | To upload audiobooks in the database |
| PUT /books | To update the audiobooks info |
| GET /books | To fetch all the books and display on the homepage |
| GET /user-books | To fetch the books uploaded by an user to display in his my books section |
| GET /books:/id | To redirect on the seprate audiobook page by clicking on the book on homepage |
| POST /:id/reviews | To post comment and rating on a specific book by a certain user. |

- #### To upload cover photos for the book while adding your own book

| Book photos APIs      | Description                |
| :-------- | :------------------------- |
| POST /upload-by-link | To upload the photos using image address link using **image-downloader** package|
| POST /upload| To upload the cover photo for the book from the local device |


## Contact

- for any queries or feedbacks you can reach out to me at **prathamnarwade444@gmail.com**
=======
Tech Stack

Frontend:
React.js: A JavaScript library for building user interfaces.
Tailwind CSS: A utility-first CSS framework for styling.

Backend:
Node.js: A JavaScript runtime for server-side development.
Express.js: A web application framework for Node.js.

Database:
MongoDB: A NoSQL database for storing audiobook details and user data.

Authentication:
JWT: For secure user authentication.
bcrypt: For hashing passwords securely.
>>>>>>> 849cb1b88f8ef17955e142a7dba309fcd9b00d47

Audiobook Review and Rating System.


This is a full-stack application for reviewing and rating audiobooks. Built with the MERN stack and styled using Tailwind CSS, the app allows users to register, log in, add audiobooks for database, see the list of all audiobooks on homepage, click and open a seprate page for each audiobook to see book info (author, genre, description) and to write reviews and give rating for the book. and also to interact with the community through reviews and ratings.

Features

(1) User Authentication: Users can register and log in using JWT for authentication, with passwords securely hashed using bcrypt hashing method.

(2) Add Audiobooks: Users can add their audiobooks to the platform for the database for all the users and can update or edit them later.

(3) View Audiobooks: The homepage lists all available audiobooks. Clicking on an audiobook redirects to a detailed page with its description, genre, and author.

(4) Comments and Ratings: Users can post comments and give ratings on audiobook pages.

(5) Search Functionality: Users can search for audiobooks using a search bar on the homepage. The search functionality supports filtering by genre, author, title, and rating.




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

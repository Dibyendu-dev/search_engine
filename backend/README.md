# 🔍 Search Engine

## Project Description

A lightweight, modular web search engine backend built with Node.js and Express. This project demonstrates core search engine concepts including web crawling, document indexing, and full-text search functionality. The application provides REST APIs for crawling web content and performing indexed searches.

## What the Application Does

This search engine performs the following core operations:

- **Web Crawling**: Fetches and extracts content from web pages using HTTP requests and DOM parsing
- **Document Indexing**: Processes and stores crawled documents in a searchable index with metadata
- **Full-Text Search**: Enables efficient searching through indexed documents with relevance ranking
- **RESTful API**: Exposes endpoints for crawling operations and executing search queries
- **Data Persistence**: Stores indexed documents and metadata in JSON format for quick retrieval

### Key Features:

- Modular architecture with separated concerns (controllers, services, modules)
- CORS support for cross-origin requests
- Efficient document parsing and indexing
- Search with keyword matching and ranking

## Technologies Used

### Why These Technologies?

**Node.js & Express.js**

- Lightweight and event-driven architecture ideal for I/O operations like web crawling
- Express provides a minimal and flexible framework for building REST APIs quickly
- JavaScript throughout the stack enables rapid development and code reuse

**Cheerio**

- Efficient jQuery-like DOM manipulation library
- Perfect for server-side HTML parsing and data extraction
- Lightweight alternative to heavier frameworks like Puppeteer or Selenium

**Axios**

- Simple and promise-based HTTP client
- Excellent for making requests and handling responses from web pages
- Built-in support for timeouts and interceptors

**CORS (Cross-Origin Resource Sharing)**

- Enables the frontend to communicate with the backend from different origins
- Essential for modern web applications with separated frontend and backend services

**JSON Storage**

- Simple but effective for small to medium-scale applications
- No database setup required, making the project easy to deploy and test
- Easy to extend to SQL/NoSQL databases as the project scales

## Project Structure

```
backend/
├── server.js                 # Application entry point
├── package.json              # Project dependencies
├── data/                     # Indexed documents storage
│   ├── index.json           # Search index
│   └── docs/                # Document storage
├── src/
│   ├── app.js               # Express app configuration
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── modules/             # Core functionality modules
│   │   ├── crawler/         # Web crawling logic
│   │   ├── indexer/         # Document indexing logic
│   │   ├── parser/          # HTML parsing logic
│   │   ├── search/          # Search algorithm logic
│   │   └── storage/         # Data persistence logic
│   ├── routes/              # API routes
│   ├── services/            # Business logic layer
│   └── utils/               # Utility functions
```

## Installation & Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

- `POST /api/crawl` - Crawl and index a website
- `GET /api/search?q=<query>` - Search the indexed documents

## Challenges Faced

1. **Web Page Variability**: Different websites have different HTML structures, making consistent data extraction challenging. Solution: Implemented flexible parsing logic with error handling.

2. **Performance at Scale**: As the index grows, search performance can degrade. Currently using JSON-based storage which has limitations for large datasets.

3. **Duplicate Content**: Managing and avoiding duplicate content during crawling requires careful tracking and deduplication logic.

4. **CORS Issues**: Handling cross-origin requests from frontend applications required proper configuration and middleware setup.

5. **Memory Management**: Large web pages and bulk crawling operations can consume significant memory. Implemented streaming and batch processing where possible.

## Future Enhancements & Features

- [ ] **Database Integration**: Replace JSON storage with MongoDB or PostgreSQL for better scalability and query performance
- [ ] **Advanced Search Algorithm**: Implement TF-IDF (Term Frequency-Inverse Document Frequency) for better ranking and relevance
- [ ] **Web UI Dashboard**: Create a frontend interface for visualizing search results and crawler statistics
- [ ] **Multi-threaded Crawling**: Parallel crawling to improve performance when indexing multiple URLs
- [ ] **Caching Layer**: Implement Redis caching to speed up frequent searches
- [ ] **Authentication & Authorization**: Secure the API endpoints with JWT tokens
- [ ] **Sitemap Support**: Automatically discover and crawl websites using sitemap.xml files
- [ ] **Search Filters**: Add date range, domain, and content-type filters for refined searches
- [ ] **Analytics & Logging**: Track search queries and crawling statistics
- [ ] **Mobile Optimization**: Ensure the API and frontend work seamlessly on mobile devices
- [ ] **Docker Support**: Containerize the application for easier deployment
- [ ] **Unit & Integration Tests**: Add comprehensive test suite for reliability



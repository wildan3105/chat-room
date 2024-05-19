# Chat room
An inclusive chat room

# Features
- Anyone can create or join room
- Anyone can send and receive messages real-time

# Stacks
## Backend
- Framework: NodeJS using Typescript
- Database: MongoDB
- Websocket: [ws](https://www.npmjs.com/package/ws)

## Frontend
- Library: React
- State management: Redux

# How to run
1. Build and run the applications from [docker-compose](./docker-compose.yaml) `docker-compose up --build`
2. The app is then available at `http://localhost`


# Submission details
## Date
May 20, 2024

## Time spent
Roughly around 20 hours

## Assumption
1. User authentication and authorization
- **assumption**: user auth will be relatively simple: use JSON webtoken to create and validate user session that's valid for up to 1 hour for each user signing to certain room (a signed token translates to `userId-roomId`)
- **justification**: JSON web token implementation is quite simple and thus achievable given the time limit and also aligns with the requirement (unique username within a room)

2. Real-time communication
- **assumption**: websocket will be used for real-time communication between frontend and backend
- **justification**: websocket provide a full-duplex (2-way) communication channel over a single TCP connection, making it ideal for real-time messaging. this ensures messages from other users are received in real-time as required.

3. Database structure
- **assumption**: MongoDB collections will be structure to store rooms, users, and messages.
- **justification**: MongoDB is schema-less, flexible, and scales well with real-time applications. separate collections for rooms, users, and messages help in organizing data efficiently and ensure persistence of messages for each room. 

4. Concurrency handling
- **assumption**: simple checks will be performed (upon login) to ensure unique usernames within a room.
- **justification**: this aligns with the requirement that no two users in the same room can have the same exact username.

5. Deployment
- **assumption**: the app is bundled into one and can be deployed in single server or a local machine
- **justification**: there's no deployment details from the requirement, so using a bundled app will simplify the setup process and allow focusing more on core functionality.

## Compromises
1. Authentication and authorization
- **compromise**: use simple JSON web token mechanism to create and validate token
- **improvement**: apart from JSON web token for stateless authentication, we could also potentially use OAuth for 3rd party integrations and store the password for enhanced security since currently anyone can be "everyone" to join room.

2. Error handling and validation
- **compromise**: basic error handling and validation for username uniqueness and form inputs
- **improvement**: use more structured and comprehensive schema and API-driven tool such as open API specification (OAS) to enforce consistency and avoid manual error code generation and validation. this will ensure data integrity and provide detailed feedback to end-users.

3. Scalability and performance
- **compromise**: focused on a single server deployment, potentially limiting scalability
- **improvement**: design the application with scalability in mind i.e. using microservices architecture, load balancing, and horizontal scaling. deploy using k8s other similar tools for better orchestration and manageability of services as they scales.

4. Security
- **compromise**: only basic security measures are implemented. even CORS are enabled for all sites (*)
- **improvement**: implement comprehensive, rigid, and zero-trust security model. for concrete improvements, we could enforce HTTPS for secure communication, rate limiting to prevent abuse, sanitizing the inputs to prevent XSS attacks, and many more.

5. Testing
- **compromise**: no programmable tests are implemented. only manual testing due to time constraints.
- **improvement**: implement multi-level of testing (from unit, component, integration, and E2E) to ensure application's robustness and reduces the likelihood of bugs in production as well as allow other engineers contribute to the project easily and confidently.

## Production plan
1. Production-ready plan
- **refactor and clean code**: ensure codebase follows the best practices, is well-documented, and is free of unnecessary code. this applies for both backend and frontend
- **comprehensive testing**: implement multi-level of testing: unit, integration, component, E2E. also, use automated testing tools in CI/CD pipelines
- **optimize database**: design efficient database schema and use indexes where appropiate. perform load testing to identify and resolve bottlenecks.
- **API rate limit**: implement rate limiting to prevenf abuse of API endpoints, especially burst of potential spam messages from certain user
- **logging and monitoring**: integrate with logging tools, setup comprehensive monitoring tool to detect issues early and measure app performance
- **containerization**: use docker to containerize the application (this is done) to maintain consistency across development, staging, and production environment
- **CI/CD pipeline**: setup a CI/CD tool to automate testing, building, and deployment
- **load balancing**: use load balancers like nginx or AWS elastic load balancing to distribute traffic across multiple instances of the application
- **CDN**: use a content delivery network (CDN) like cloudflare or AWS cloudfront to serve static assets quickly to users globally

2. Handle thousands of users simultaneously

- **horizontal scaling**: Deploy the application across multiple instances to handle increased load. Use orchestration tools like Kubernetes to manage scaling.
- **auto-scaling**: Configure auto-scaling groups to automatically scale the number of instances based on traffic and load.
- **efficient websocket management**: Use a WebSocket server optimized for high concurrency, such as Socket.IO or ws, and consider using a managed service like AWS API Gateway with WebSocket support for handling large-scale WebSocket connections.
- **DB optimization**: Optimize database queries, use read replicas, and implement sharding if necessary to distribute the load.
- **lazy loading and code splitting**: Use lazy loading and code splitting in the frontend to reduce initial load times and improve performance.
- **real-time monitoring**: Use tools like New Relic, Datadog, or ELK stack (Elasticsearch, Logstash, Kibana) for real-time monitoring and logging.
- **alerting**: Set up alerting mechanisms to notify the team of any issues such as high response times, errors, or downtime.

3. Ensure application security
- **encryption**: Encrypt sensitive data in transit using HTTPS (SSL/TLS) and at rest using database encryption features.
- **environment variables**: Use environment variables to manage configuration secrets and avoid hardcoding sensitive information in the codebase.
- **regular security audits**: Perform regular security audits and penetration testing to identify and address vulnerabilities.
- **dependency management**: Keep dependencies up to date and use tools like Snyk, Dependabot, or npm audit to identify and fix security vulnerabilities in third-party libraries.
- **input validation and sanitization**: Validate and sanitize all inputs to prevent SQL injection, XSS, and other injection attacks.
- **rate limithing and throttling**: Implement rate limiting and throttling to prevent abuse of APIs.
- **CORS policies**: Configure CORS (Cross-Origin Resource Sharing) policies to allow only trusted domains to access the API.

## Other notes
1. **Service-level testing**: I planned to implement basic service-level testing to ensure core functionalities are working correctly for both the frontend and backend. However, due to limited time, I was unable to start this.
2. **Message timestamps**: I also intended to add a feature to display timestamps for messages in the chat room. This would help users verify the chronological order of messages. Unfortunately, I couldn't implement this feature within the given timeframe. 
3. **Room's messages persistence issue**: I discovered an issue where users who sign into a room, sign out, and then create a new room still see the previous room's messages instead of starting with a blank room. I believe this issue is on the frontend, but I haven't had time to fully investigate and resolve it. More details can be found [here](https://github.com/wildan3105/chat-room/issues/4). 

## Other considerations
- **Performance Optimization**: While I have optimized several aspects of the application, there is still room for further performance tuning, especially under high load scenarios
- **Security Enhancements**: Basic security measures are in place, but additional security layers and thorough testing are needed for a production-ready system
- **Scalability Testing**: The application should undergo more extensive scalability testing to ensure it handles a large number of concurrent users smoothly.

## Feedback
- **Challenging Task**: The task was challenging and provided a good opportunity to demonstrate full-stack development skills.
- **Detailed Feature List**: Including a more detailed feature list with must-have and nice-to-have features would help candidates prioritize their work and manage their time better.
- **Minimum Accomplishments**: Defining minimum accomplishments would also be beneficial in guiding candidates on what is essential to complete within the timeframe.
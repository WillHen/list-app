import app from "./app";
import { makeExecutableSchema } from 'graphql-tools';
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors');
const port = 4040;


const typeDefs = `
    type Query {
                allCourses: [Course]
        course(id: Int!): Course
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`;

const coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
];
const getCourse = function(root, {id}) { 
    return coursesData.filter(course => {
        return course.id === id;
    })[0];
};
const getAllCourses = function() {
  return coursesData;
}
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    allCourses: getAllCourses,
    course: getCourse,
  },
};

var schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// The root provides a resolver function for each API endpoint
var root = {
  getAllCourses: () => {
    return coursesData
  }
};

// Allow corse on Angular app
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));
app.listen(port, function() {
  console.log('Express server listening on port..' + port);
});
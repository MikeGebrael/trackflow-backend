import { MongooseModuleOptions } from '@nestjs/mongoose';

/**
 * Configuration object for MongoDB connection using Mongoose.
 * 
 * This configuration provides the connection URI to the MongoDB database.
 * It first attempts to retrieve the URI from the environment variables (MONGODB_URI),
 * and falls back to a default local MongoDB connection URI ('mongodb://localhost:27017/trackflow')
 * if the environment variable is not defined.
 * 
 * @constant {MongooseModuleOptions} databaseConfig - The MongoDB connection options for Mongoose.
 * @property {string} uri - The MongoDB connection URI. It will use the value from 
 *                          process.env.MONGODB_URI or default to 'mongodb://localhost:27017/trackflow'.
 */
export const databaseConfig: MongooseModuleOptions = {
  // MongoDB connection URI, from environment variables and default value as this is a project
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/trackflow',
};

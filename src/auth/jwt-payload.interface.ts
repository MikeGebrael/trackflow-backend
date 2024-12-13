import { Types } from 'mongoose'; // Import Types to allow the use of ObjectId for MongoDB document references

/**
 * Interface defining the structure of the JWT payload.
 * This payload is embedded within the JWT and contains
 * the necessary information for identifying and authorizing the user.
 */
export interface JwtPayload {
  /**
   * The unique identifier of the employee (subject of the token).
   */
  sub: string | Types.ObjectId;

  /**
   * The username of the employee associated with the token.
   */
  username: string;

  /**
   * The role of the employee (e.g., manager, admin, or employee).
   */
  role: string;
}

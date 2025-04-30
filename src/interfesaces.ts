/**
 * src/interfesaces.ts
 */
import React from "react";

/* NEW TYPE REDUX */
/**
 * This is intarface for User.status
 */
export enum UserStatus {
  STATUS_ADMIN = "ADMIN",
  STATUS_USER = "USER",
  STATUS_SUPER_ADMIN = "SUPER_ADMIN",
  STATUS_ANONYMOUSUSER = "ANONYMOUSUSER"
}

/**
 * This is intarface for User.privaleges
 */
export enum UserPrivaleges {
  PRIVALEGES_ADMIN = "COMMENT",
  PRIVALEGES_SUPER_ADMIN = "ALL",
  PRIVALEGES_USER = "READING",
  PRIVALEGES_ANONYMOUS = "NoN",

}

/**
 * email: string  of user
 * password: string  of user
 */
interface UserSecretData {
  email: string
  password: string
}

/** * 
 * status: ADMIN, USER, SUPER_ADMIN, ANONYMOUSUSER of UserStatus
 * privaleges: COMMENT, ALL, READING, NoN of UserPrivaleges
 * token: string  is secret key of server
 */
export interface User extends UserSecretData {
  status: string // of UserRole
  privaleges: string[] // NoN, All, Reading, Comment
  token?: string
}



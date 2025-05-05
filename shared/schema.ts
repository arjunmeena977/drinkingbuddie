import { pgTable, text, serial, integer, boolean, timestamp, json, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  age: integer("age"),
  gender: text("gender"),
  profileImage: text("profile_image"),
  drinkPreferences: text("drink_preferences").array(),
  musicTaste: text("music_taste").array(),
  vibePref: text("vibe_preference"),
  isActive: boolean("is_active").default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  name: true,
  password: true,
  email: true,
  fullName: true,
  age: true,
  gender: true,
  profileImage: true,
  drinkPreferences: true,
  musicTaste: true,
  vibePref: true,
});

// Club model
export const clubs = pgTable("clubs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  distance: real("distance"),
  priceRange: text("price_range"),
  rating: real("rating"),
  reviewCount: integer("review_count"),
  images: text("images").array(),
  category: text("category").array(),
  features: text("features").array(),
  openHours: text("open_hours"),
  musicTypes: text("music_types").array(),
  isFeatured: boolean("is_featured").default(false),
});

export const insertClubSchema = createInsertSchema(clubs).pick({
  name: true,
  description: true,
  location: true,
  distance: true,
  priceRange: true,
  rating: true,
  reviewCount: true,
  images: true,
  category: true,
  features: true,
  openHours: true,
  musicTypes: true,
  isFeatured: true,
});

// Event model
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
  venueId: integer("venue_id"),
  image: text("image"),
  price: real("price"),
  ticketInfo: text("ticket_info"),
  category: text("category"),
  featured: boolean("featured").default(false),
  artists: json("artists").default([]),
  attendeesCount: integer("attendees_count").default(0),
  interestedCount: integer("interested_count").default(0),
  dressCode: text("dress_code"),
});

export const insertEventSchema = createInsertSchema(events).pick({
  name: true,
  description: true,
  date: true,
  time: true,
  location: true,
  venueId: true,
  image: true,
  price: true,
  ticketInfo: true,
  category: true,
  featured: true,
  artists: true,
  dressCode: true,
});

// Review model
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  clubId: integer("club_id").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  date: timestamp("date").defaultNow(),
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  userId: true,
  clubId: true,
  rating: true,
  comment: true,
});

// Define the export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Club = typeof clubs.$inferSelect;
export type InsertClub = z.infer<typeof insertClubSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

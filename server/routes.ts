import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertReviewSchema } from "@shared/schema";
import { z, ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix with /api
  
  // Get all clubs
  app.get("/api/clubs", async (req: Request, res: Response) => {
    try {
      const clubs = await storage.getClubs();
      res.json(clubs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clubs" });
    }
  });
  
  // Get a specific club
  app.get("/api/clubs/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const club = await storage.getClub(id);
      
      if (!club) {
        return res.status(404).json({ message: "Club not found" });
      }
      
      res.json(club);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch club" });
    }
  });
  
  // Get featured clubs
  app.get("/api/clubs/featured/:limit?", async (req: Request, res: Response) => {
    try {
      const limit = req.params.limit ? parseInt(req.params.limit) : undefined;
      const clubs = await storage.getFeaturedClubs(limit);
      res.json(clubs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured clubs" });
    }
  });
  
  // Search clubs
  app.get("/api/clubs/search/:query", async (req: Request, res: Response) => {
    try {
      const query = req.params.query;
      const clubs = await storage.searchClubs(query);
      res.json(clubs);
    } catch (error) {
      res.status(500).json({ message: "Failed to search clubs" });
    }
  });
  
  // Get all events
  app.get("/api/events", async (req: Request, res: Response) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });
  
  // Get a specific event
  app.get("/api/events/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });
  
  // Get featured events
  app.get("/api/events/featured/:limit?", async (req: Request, res: Response) => {
    try {
      const limit = req.params.limit ? parseInt(req.params.limit) : undefined;
      const events = await storage.getFeaturedEvents(limit);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured events" });
    }
  });
  
  // Get upcoming events
  app.get("/api/events/upcoming/:limit?", async (req: Request, res: Response) => {
    try {
      const limit = req.params.limit ? parseInt(req.params.limit) : undefined;
      const events = await storage.getUpcomingEvents(limit);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch upcoming events" });
    }
  });
  
  // Get events by club
  app.get("/api/events/club/:clubId", async (req: Request, res: Response) => {
    try {
      const clubId = parseInt(req.params.clubId);
      const events = await storage.getEventsByClub(clubId);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch club events" });
    }
  });
  
  // Get club reviews
  app.get("/api/reviews/:clubId", async (req: Request, res: Response) => {
    try {
      const clubId = parseInt(req.params.clubId);
      const reviews = await storage.getReviews(clubId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });
  
  // Create a review
  app.post("/api/reviews", async (req: Request, res: Response) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });
  
  // User registration
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUserByUsername = await storage.getUserByUsername(userData.username);
      if (existingUserByUsername) {
        return res.status(409).json({ message: "Username already taken" });
      }
      
      // Check if email already exists
      const existingUserByEmail = await storage.getUserByEmail(userData.email);
      if (existingUserByEmail) {
        return res.status(409).json({ message: "Email already registered" });
      }
      
      // Create new user
      const user = await storage.createUser(userData);
      
      // Don't send password back
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });
  
  // User login
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = z.object({
        username: z.string(),
        password: z.string()
      }).parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Don't send password back
      const { password: _, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid login data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to login" });
    }
  });
  
  // Get users for partner matching (limited fields for privacy)
  app.get("/api/partners", async (req: Request, res: Response) => {
    try {
      // In a real app, this would get actual users
      // For demo, we're using clubs as sample "partners"
      const clubs = await storage.getClubs();
      
      // Simulate partner attributes for the demo
      const genders = ["Men", "Women"];
      const drinkTypes = [
        ["Beer", "Shots"], 
        ["Wine", "Cocktails"], 
        ["Beer", "Wine"], 
        ["Cocktails", "Shots"]
      ];
      const musicOptions = [
        ["Electronic", "Hip Hop"], 
        ["Rock", "Pop"], 
        ["Latin", "Pop"], 
        ["Electronic", "Rock"]
      ];
      const areas = [2.1, 3.5, 0.8, 5.2, 8.7, 1.2, 4.3];
      const availabilities = ["Tonight", "Weekends", "Weekdays"];
      
      // Convert clubs to look like partners with filtering attributes
      const partners = clubs.map((club, index) => ({
        id: club.id,
        username: club.name.split(' ')[0], // Use first word of club name as username
        profileImage: club.images ? club.images[0] : null,
        gender: genders[index % genders.length],
        age: Math.floor(Math.random() * 15) + 21, // Random age between 21-35
        preferences: {
          drinkType: drinkTypes[index % drinkTypes.length],
          musicTaste: club.musicTypes || musicOptions[index % musicOptions.length],
          favoriteVenues: [club.name]
        },
        distance: areas[index % areas.length],
        availability: availabilities[index % availabilities.length],
        bio: club.description
      }));
      
      // Add a few more partners with different characteristics
      partners.push({
        id: clubs.length + 1,
        username: "Alex",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        gender: "Men",
        age: 28,
        preferences: {
          drinkType: ["Beer", "Whiskey"],
          musicTaste: ["Rock", "Jazz"],
          favoriteVenues: ["Rock Bar", "Jazz Club"]
        },
        distance: 1.2,
        availability: "Tonight",
        bio: "Music lover and craft beer enthusiast."
      });
      
      partners.push({
        id: clubs.length + 2,
        username: "Jessica",
        profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        gender: "Women",
        age: 25,
        preferences: {
          drinkType: ["Cocktails", "Wine"],
          musicTaste: ["Pop", "Latin"],
          favoriteVenues: ["Wine Bar", "Cocktail Lounge"]
        },
        distance: 0.5,
        availability: "Tonight",
        bio: "Passionate about mixology and dancing."
      });
      
      res.json(partners);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch potential partners" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

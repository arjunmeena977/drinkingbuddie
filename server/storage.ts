import { 
  users, type User, type InsertUser,
  clubs, type Club, type InsertClub,
  events, type Event, type InsertEvent,
  reviews, type Review, type InsertReview
} from "@shared/schema";

// Storage interface for CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Club operations
  getClubs(): Promise<Club[]>;
  getClub(id: number): Promise<Club | undefined>;
  createClub(club: InsertClub): Promise<Club>;
  updateClub(id: number, club: Partial<InsertClub>): Promise<Club | undefined>;
  getFeaturedClubs(limit?: number): Promise<Club[]>;
  searchClubs(query: string): Promise<Club[]>;
  
  // Event operations
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined>;
  getFeaturedEvents(limit?: number): Promise<Event[]>;
  getUpcomingEvents(limit?: number): Promise<Event[]>;
  getEventsByClub(clubId: number): Promise<Event[]>;
  
  // Review operations
  getReviews(clubId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private clubs: Map<number, Club>;
  private events: Map<number, Event>;
  private reviews: Map<number, Review>;
  
  private userId: number;
  private clubId: number;
  private eventId: number;
  private reviewId: number;
  
  constructor() {
    this.users = new Map();
    this.clubs = new Map();
    this.events = new Map();
    this.reviews = new Map();
    
    this.userId = 1;
    this.clubId = 1;
    this.eventId = 1;
    this.reviewId = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id, isActive: true };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Club operations
  async getClubs(): Promise<Club[]> {
    return Array.from(this.clubs.values());
  }
  
  async getClub(id: number): Promise<Club | undefined> {
    return this.clubs.get(id);
  }
  
  async createClub(insertClub: InsertClub): Promise<Club> {
    const id = this.clubId++;
    const club: Club = { ...insertClub, id };
    this.clubs.set(id, club);
    return club;
  }
  
  async updateClub(id: number, clubData: Partial<InsertClub>): Promise<Club | undefined> {
    const club = this.clubs.get(id);
    if (!club) return undefined;
    
    const updatedClub = { ...club, ...clubData };
    this.clubs.set(id, updatedClub);
    return updatedClub;
  }
  
  async getFeaturedClubs(limit?: number): Promise<Club[]> {
    const featured = Array.from(this.clubs.values()).filter(club => club.isFeatured);
    if (limit) {
      return featured.slice(0, limit);
    }
    return featured;
  }
  
  async searchClubs(query: string): Promise<Club[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.clubs.values()).filter(
      club => 
        club.name.toLowerCase().includes(lowercaseQuery) || 
        club.description.toLowerCase().includes(lowercaseQuery) ||
        club.location.toLowerCase().includes(lowercaseQuery) ||
        (club.category && club.category.some(c => c.toLowerCase().includes(lowercaseQuery)))
    );
  }
  
  // Event operations
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.eventId++;
    const event: Event = { 
      ...insertEvent, 
      id,
      attendeesCount: 0,
      interestedCount: 0
    };
    this.events.set(id, event);
    return event;
  }
  
  async updateEvent(id: number, eventData: Partial<InsertEvent>): Promise<Event | undefined> {
    const event = this.events.get(id);
    if (!event) return undefined;
    
    const updatedEvent = { ...event, ...eventData };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }
  
  async getFeaturedEvents(limit?: number): Promise<Event[]> {
    const featured = Array.from(this.events.values()).filter(event => event.featured);
    if (limit) {
      return featured.slice(0, limit);
    }
    return featured;
  }
  
  async getUpcomingEvents(limit?: number): Promise<Event[]> {
    // In a real app, we would compare with current date
    // For simplicity, we just return all events
    const allEvents = Array.from(this.events.values());
    if (limit) {
      return allEvents.slice(0, limit);
    }
    return allEvents;
  }
  
  async getEventsByClub(clubId: number): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      event => event.venueId === clubId
    );
  }
  
  // Review operations
  async getReviews(clubId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      review => review.clubId === clubId
    );
  }
  
  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.reviewId++;
    const review: Review = { 
      ...insertReview, 
      id,
      date: new Date()
    };
    this.reviews.set(id, review);
    
    // Update club's review count and rating
    const club = this.clubs.get(insertReview.clubId);
    if (club) {
      const clubReviews = await this.getReviews(club.id);
      const totalRating = clubReviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = totalRating / clubReviews.length;
      
      this.clubs.set(club.id, {
        ...club,
        reviewCount: clubReviews.length,
        rating: parseFloat(averageRating.toFixed(1))
      });
    }
    
    return review;
  }
  
  // Initialize with sample data
  private async initSampleData() {
    // Sample clubs
    const clubs = [
      {
        name: "Pulse Nightclub",
        description: "The hottest dance floors with world-class DJs every weekend. The perfect place to lose yourself in music.",
        location: "123 Nightlife Ave, Downtown",
        distance: 5.2,
        priceRange: "$$$",
        rating: 4.5,
        reviewCount: 128,
        images: ["https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"],
        category: ["Nightclub", "Dance", "VIP"],
        features: ["Craft Cocktails", "DJ Nights", "VIP Areas", "Smoking Terrace", "Valet Parking", "Table Service"],
        openHours: "10 PM - 4 AM",
        musicTypes: ["EDM", "Hip Hop"],
        isFeatured: true
      },
      {
        name: "Skyline Lounge",
        description: "Rooftop views with craft cocktails and DJ sets. Known for its exclusive VIP sections.",
        location: "Downtown, 5.2 miles away",
        distance: 5.2,
        priceRange: "$$",
        rating: 4.8,
        reviewCount: 96,
        images: ["https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
        category: ["Lounge", "Rooftop", "Cocktail Bar"],
        features: ["Rooftop View", "Craft Cocktails", "DJ Sets", "VIP Sections"],
        openHours: "8 PM - 2 AM",
        musicTypes: ["House", "Lounge", "Top 40"],
        isFeatured: false
      },
      {
        name: "Velvet Underground",
        description: "Industrial-chic space with underground electronic music and immersive light shows.",
        location: "Arts District, 3.7 miles away",
        distance: 3.7,
        priceRange: "$$$",
        rating: 4.7,
        reviewCount: 112,
        images: ["https://images.unsplash.com/photo-1556035511-3168381ea4d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
        category: ["Underground", "Electronic", "Alternative"],
        features: ["Light Shows", "Underground DJs", "Art Installations", "Industrial Space"],
        openHours: "11 PM - 6 AM",
        musicTypes: ["Techno", "House", "Experimental"],
        isFeatured: false
      },
      {
        name: "Rhythm & Blues",
        description: "Live music venue with jazz and blues performers. Authentic speakeasy atmosphere.",
        location: "Riverside, 6.3 miles away",
        distance: 6.3,
        priceRange: "$$",
        rating: 4.5,
        reviewCount: 76,
        images: ["https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
        category: ["Live Music", "Jazz", "Blues", "Speakeasy"],
        features: ["Live Performances", "Craft Cocktails", "Intimate Setting", "Historical Building"],
        openHours: "7 PM - 2 AM",
        musicTypes: ["Jazz", "Blues", "Soul"],
        isFeatured: false
      }
    ];
    
    // Add clubs
    for (const club of clubs) {
      await this.createClub(club as InsertClub);
    }
    
    // Sample events
    const events = [
      {
        name: "Summer Blast Party",
        description: "The season's biggest rooftop party with open bar for the first hour. Featuring DJ Maxwell.",
        date: "July 10",
        time: "10 PM - 5 AM",
        location: "Skyline Rooftop, 789 Highrise Blvd",
        venueId: 2,
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1950&q=80",
        price: 30,
        ticketInfo: "General Admission",
        category: "Hot Event",
        featured: true,
        artists: [
          { name: "DJ Maxwell", role: "Headliner", time: "1 AM - 3 AM", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" },
          { name: "DJ Luna", role: "Opening Set", time: "10 PM - 1 AM", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" },
          { name: "DJ Rhythm", role: "Closing Set", time: "3 AM - 5 AM", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" }
        ],
        dressCode: "Upscale Summer Chic: Stylish summer attire required. No athletic wear, flip-flops, or excessively casual clothing. Dress to impress!"
      },
      {
        name: "Neon Nights: Glow Party",
        description: "The ultimate UV party with neon paint, black lights, and the city's top EDM DJs.",
        date: "July 15",
        time: "10 PM - 3 AM",
        location: "Pulse Nightclub",
        venueId: 1,
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 25,
        ticketInfo: "early bird",
        category: "This Weekend",
        featured: true,
        artists: [],
        dressCode: "Neon and white clothing encouraged for the UV effect. Comfortable shoes recommended."
      },
      {
        name: "Throwback Thursday: 90s Hits",
        description: "Relive the golden age of pop with 90s hits, themed cocktails, and nostalgic vibes.",
        date: "July 13",
        time: "9 PM - 2 AM",
        location: "Retro Lounge",
        venueId: 4,
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 15,
        ticketInfo: "cover",
        category: "This Week",
        featured: false,
        artists: [],
        dressCode: "90s inspired outfits encouraged but not required. Bring your nostalgia!"
      },
      {
        name: "Rooftop Summer Series",
        description: "Open-air lounge party with craft cocktails, city views, and tropical house music.",
        date: "July 21",
        time: "8 PM - 1 AM",
        location: "Skyline Lounge",
        venueId: 2,
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 30,
        ticketInfo: "w/ 1 drink",
        category: "Next Week",
        featured: false,
        artists: [],
        dressCode: "Smart casual. No athletic wear or flip flops."
      }
    ];
    
    // Add events
    for (const event of events) {
      await this.createEvent(event as InsertEvent);
    }
    
    // Sample users
    const users = [
      {
        username: "sarah_89",
        password: "password123",
        email: "sarah@example.com",
        fullName: "Sarah Johnson",
        age: 27,
        gender: "female",
        profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        drinkPreferences: ["Cocktails", "Wine"],
        musicTaste: ["EDM", "Pop"],
        vibePref: "Energetic dance clubs"
      },
      {
        username: "mike_31",
        password: "password123",
        email: "mike@example.com",
        fullName: "Mike Thompson",
        age: 31,
        gender: "male",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        drinkPreferences: ["Beer", "Shots"],
        musicTaste: ["Hip Hop", "R&B"],
        vibePref: "Upscale venues"
      },
      {
        username: "alex_25",
        password: "password123",
        email: "alex@example.com",
        fullName: "Alex Chen",
        age: 25,
        gender: "non-binary",
        profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        drinkPreferences: ["Cocktails", "Wine"],
        musicTaste: ["Alternative", "Rock"],
        vibePref: "Live music spots"
      },
      {
        username: "david_29",
        password: "password123",
        email: "david@example.com",
        fullName: "David Wilson",
        age: 29,
        gender: "male",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        drinkPreferences: ["Beer", "Whiskey"],
        musicTaste: ["Jazz", "Blues"],
        vibePref: "Relaxed lounges"
      }
    ];
    
    // Add users
    for (const user of users) {
      await this.createUser(user as InsertUser);
    }
    
    // Sample reviews
    const reviews = [
      {
        userId: 1,
        clubId: 1,
        rating: 5,
        comment: "Amazing vibes and great music selection! The VIP service was worth every penny. Will definitely be back."
      },
      {
        userId: 2,
        clubId: 1,
        rating: 4,
        comment: "Great DJs and dance floors. Drinks are a bit pricey but strong. The lines can get long after midnight."
      },
      {
        userId: 3,
        clubId: 1,
        rating: 3,
        comment: "Sound system is incredible, but it gets very crowded on weekends. Weekday nights are better if you want space to dance."
      }
    ];
    
    // Add reviews
    for (const review of reviews) {
      await this.createReview(review as InsertReview);
    }
  }
}

export const storage = new MemStorage();

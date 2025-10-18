import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPlayerSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/submit", async (req, res) => {
    try {
      const data = insertPlayerSchema.parse(req.body);

      const existingPlayer = await storage.getPlayerByName(data.name);
      if (existingPlayer) {
        return res.status(400).json({ 
          error: "Questo nome è già stato utilizzato. Scegli un altro nome." 
        });
      }

      const player = await storage.createPlayer(data);
      res.json(player);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Dati non validi" });
      }
      res.status(500).json({ error: "Errore del server" });
    }
  });

  app.get("/api/ranking-data", async (_req, res) => {
    try {
      const players = await storage.getAllPlayers();
      
      const sortedPlayers = players.sort((a, b) => {
        if (a.operations !== b.operations) {
          return a.operations - b.operations;
        }
        return a.time - b.time;
      });

      res.json(sortedPlayers);
    } catch (error) {
      res.status(500).json({ error: "Errore del server" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

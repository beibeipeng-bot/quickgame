import { type Player, type InsertPlayer } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getPlayer(id: string): Promise<Player | undefined>;
  getPlayerByName(name: string): Promise<Player | undefined>;
  createPlayer(player: InsertPlayer): Promise<Player>;
  getAllPlayers(): Promise<Player[]>;
}

export class MemStorage implements IStorage {
  private players: Map<string, Player>;

  constructor() {
    this.players = new Map();
  }

  async getPlayer(id: string): Promise<Player | undefined> {
    return this.players.get(id);
  }

  async getPlayerByName(name: string): Promise<Player | undefined> {
    return Array.from(this.players.values()).find(
      (player) => player.name === name,
    );
  }

  async createPlayer(insertPlayer: InsertPlayer): Promise<Player> {
    const id = randomUUID();
    const player: Player = { ...insertPlayer, id };
    this.players.set(id, player);
    return player;
  }

  async getAllPlayers(): Promise<Player[]> {
    return Array.from(this.players.values());
  }
}

export const storage = new MemStorage();

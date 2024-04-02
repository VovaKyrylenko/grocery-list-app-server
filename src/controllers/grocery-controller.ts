import { Request, Response } from "express";
import { GroceryService } from "src/services";
import {
  ICreateGroceryItemInput,
  IGroceryItem,
  IUpdateGroceryItemInput,
} from "src/types";

// Fetches groceries for a specific user
export async function getUserGroceries(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userId: string = req.params.userId;
    const groceries: IGroceryItem[] = await GroceryService.getUserGroceries(
      userId
    );
    res.status(200).json(groceries);
  } catch (error) {
    console.error("Failed to fetch user groceries:", error);
    res.status(500).json({ message: "Failed to fetch user groceries" });
  }
}

// Deletes a grocery item
export async function deleteGrocery(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const groceryId: string = req.params.groceryId;
    await GroceryService.deleteGrocery(groceryId);
    res.status(200).json({ message: "Grocery deleted successfully" });
  } catch (error) {
    console.error("Failed to delete grocery:", error);
    res.status(500).json({ message: "Failed to delete grocery" });
  }
}

// Updates a grocery item
export async function updateGrocery(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const groceryId: string = req.params.groceryId;
    const updateGroceryData: IUpdateGroceryItemInput = req.body;
    const updatedGrocery: IGroceryItem | null =
      await GroceryService.updateGrocery(groceryId, updateGroceryData);

    if (updatedGrocery === null) {
      res.status(404).json({ message: "Grocery not found" });
      return;
    }

    res.status(200).json(updatedGrocery);
  } catch (error) {
    console.error("Failed to update grocery:", error);
    res.status(500).json({ message: "Failed to update grocery" });
  }
}

// Adds a new grocery item
export async function addGrocery(req: Request, res: Response): Promise<void> {
  try {
    const userId: string = req.params.userId;
    const groceryData: ICreateGroceryItemInput = req.body;

    if (
      !groceryData ||
      !groceryData.name ||
      groceryData.amount === undefined ||
      groceryData.amount <= 0
    ) {
      res.status(400).json({ message: "Invalid grocery data" });
      return;
    }

    const newGrocery: IGroceryItem | null = await GroceryService.addGrocery(
      userId,
      groceryData
    );

    if (newGrocery === null) {
      res.status(400).json({ message: "Failed to create new grocery" });
      return;
    }

    res.status(201).json(newGrocery);
  } catch (error) {
    console.error("Failed to add new grocery:", error);
    res.status(500).json({ message: "Failed to add new grocery" });
  }
}

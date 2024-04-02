import { GroceryItemModel } from "src/database";
import {
  ICreateGroceryItemInput,
  IGroceryItem,
  IUpdateGroceryItemInput,
} from "src/types";

class GroceryService {
  // Get user's groceries from the database
  public async getUserGroceries(userId: string): Promise<IGroceryItem[]> {
    const groceries: IGroceryItem[] = await GroceryItemModel.find({
      userId,
    }).lean();
    return groceries;
  }

  // Delete a grocery item from the database
  public async deleteGrocery(groceryId: string): Promise<void> {
    await GroceryItemModel.findByIdAndDelete(groceryId);
  }

  // Update a grocery item in the database
  public async updateGrocery(
    groceryId: string,
    updatedGrocery: Partial<IUpdateGroceryItemInput>
  ): Promise<IGroceryItem | null> {
    const options = { new: true };
    const updatedItem: IGroceryItem | null =
      await GroceryItemModel.findByIdAndUpdate(
        groceryId,
        updatedGrocery,
        options
      ).lean();
    return updatedItem;
  }

  // Add a new grocery item to the database
  public async addGrocery(
    userId: string,
    groceryData: ICreateGroceryItemInput
  ): Promise<IGroceryItem> {
    const newGroceryItem: IGroceryItem = await GroceryItemModel.create({
      ...groceryData,
      userId,
    });
    return newGroceryItem;
  }
}

export default new GroceryService();

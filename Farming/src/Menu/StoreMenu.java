package Menu;

import Controller.*;
import DataManager.*;

import Entity.*;
import java.util.*;

/**
 * A StoreMenu represents a store to allow farmer to purchase crops
 */
public class StoreMenu{

	private RankController rankCtrl;
	private CropDataManager cropDM;
	private InventoryDataManager inventoryDM;
	private FarmerDataManager farmerDM;
	
	/**
	* Creates a Store object
	*/
	public StoreMenu(){
	
		rankCtrl=new RankController();
		cropDM = new CropDataManager();
		inventoryDM = new InventoryDataManager();
		farmerDM = new FarmerDataManager();
		
	}
	
	/**
	* Display store menu to farmer
	* @param f user that logged in
	*/
	public void display(Farmer f){
	
		Scanner sc = new Scanner(System.in);
		
		int counter = 0;
		
		System.out.println("\n== Farm City :: Store ==");
		System.out.println("Welcome, " + f.getFullName() + "!");
		System.out.println("Rank: " + rankCtrl.currentRank(f).getRankName()   + "\t\t Gold: " + f.getGold() + "\n");
		
		ArrayList<Crop> storeItems = cropDM.loadCrop();
		System.out.println("Seeds Available:");
		
		for (Crop c : storeItems){
		
			if (c.getTime()> 60 && c.getTime()%60==0) {
			
				System.out.println(++counter + ". " + c.getName() + " costs: "+ c.getCost() + " gold\n   Harvest in: " + c.getTime()/60 + " hours\n" + "   XP Gained: " + c.getXP());
			
			} else if (c.getTime()> 60 && c.getTime()%60!=0){
				
				System.out.println(++counter + ". " + c.getName() + " costs: "+ c.getCost() + " gold\n   Harvest in: " + c.getTime()/60 + " hours " + c.getTime()%60 + " mins\n" + "   XP Gained: " + c.getXP());
			
			} else {
				
				System.out.println(++counter + ". " + c.getName() + " costs: "+ c.getCost() + " gold\n   Harvest in: " + c.getTime() + " mins\n" + "   XP Gained: " + c.getXP());
			}
		}
		
		try {
		
			System.out.println();		
			System.out.print("[M]ain | Select choice > ");
			
			String input = sc.nextLine();
			
			if (input.toUpperCase().charAt(0)=='M'){
			
				return;
				
			}
		
			int choice = Integer.parseInt(input);
			
			Crop c = storeItems.get(choice-1);
			
			System.out.print("   Enter quantity > ");
			int quantity = sc.nextInt();
			
			if(quantity > 0 && f.getGold()>=(quantity*c.getCost())){

				f.setGold(-quantity * c.getCost());
				Inventory iv=new Inventory(quantity,c.getName());
				ArrayList<Inventory> ivList=inventoryDM.loadInventory(f.getUsername());
				boolean cropExistInInventory = false;
				
				for(int i=0; i<ivList.size(); i++){
				
					if(ivList.get(i).getCropName().equals(iv.getCropName())){
					
						cropExistInInventory = true;
						ivList.get(i).setAmount(quantity);
						break;
						
					}
				}
				
				if(!cropExistInInventory) {
				
					ivList.add(iv);
					
				}
				
				inventoryDM.saveInventory(ivList,f.getUsername());
				farmerDM.saveUser(f);
				System.out.println("   " + quantity + " bags of " + c.getName() + " seeds purchased for " + (c.getCost()*quantity) + " gold.\n");
				
			} else if (quantity<=0){
			
				System.out.println("Invalid purchase quantity.\n");
				
			} else {
			
				System.out.println("Insufficient gold.\n");
			}
			
		} catch (Exception e){
			System.out.println("Please enter a valid choice.\n");
		}
	}		
	
}	

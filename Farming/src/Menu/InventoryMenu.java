package Menu;

import Controller.*;
import DataManager.*;
import Entity.*;

import java.util.*;

/**
 * An InventoryMenu allows farmer to maintain inventory by buying crops or sending a gift
 */
public class InventoryMenu{
	
	private InventoryDataManager inventoryDM;
	private ArrayList<Inventory> inventoryList;
	private RankController rankCtrl;
	private StoreMenu storeMenu;
	private GiftMenu giftMenu;
	
	/**
	* Creates an Inventory Menu
	*/
	public InventoryMenu(){
	
		inventoryDM=new InventoryDataManager();
		rankCtrl=new RankController();
		storeMenu = new StoreMenu();
		giftMenu = new GiftMenu();
		
	}
	
	/**
	* Display inventory menu to farmer
	* @param f user that logged in
	*/
	public void display(Farmer f){
	
		Scanner sc = new Scanner(System.in);
		int counter = 0;
		char action = '0';
		
		do {
			
			try{
			
				counter = 0;
				
				System.out.println("== Farm City :: My Inventory ==");
				System.out.println("Welcome, " + f.getFullName() + "!");
				System.out.println("Rank: " + rankCtrl.currentRank(f).getRankName()  + "\t\t Gold: " + f.getGold() + "\n");
				
				inventoryList = inventoryDM.loadInventory(f.getUsername());
				System.out.println("My Seeds:");
				
				if (inventoryList!=null && inventoryList.size()!=0){
				
					for (Inventory i : inventoryList){
					
						if (i.getCropName()!=null){
						
							System.out.println(++counter + ". " + i.getAmount() + " Bags of " + i.getCropName());
						}
					}
				}
				System.out.println();
				
				System.out.print("[M]ain | [B]uy | [G]ift | Select choice > ");
				
				String input = sc.nextLine();
				input = input.toUpperCase();
				action = input.charAt(0);
				
				switch(action){
				case 'M':
					return;
				case 'B':
					storeMenu.display(f);
					break;
				case 'G':
					giftMenu.display(f);
					break;
				default:
					System.out.println("Please enter a valid choice\n");
				}
				
			} catch (Exception e){
				System.out.println("Please enter a valid choice\n");
			}
			
		} while (action!='M');
	}
}
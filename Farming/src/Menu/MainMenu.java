package Menu;

import DataManager.*;

import Entity.*;
import java.util.*;

public class MainMenu{
	
	private FarmingMenu farmingMenu;
	private InventoryMenu inventoryMenu;
	private FriendMenu friendMenu;
	
	/**
	* Creates the Main Menu
	*/
	public MainMenu(){
	
		inventoryMenu=new InventoryMenu();
		farmingMenu = new FarmingMenu();
		friendMenu = new FriendMenu();
		
	}
	
	/**
	* Display main menu to farmer
	* @param farmer user that logged in
	*/
	public void display(Farmer farmer){
	
		int choice = 0;
		Scanner sc = new Scanner(System.in);
		
		do{
		
			System.out.println("\n== Farm City :: Main Menu ==");
			System.out.println("Welcome, " + farmer.getFullName() + "!");
			System.out.println();
			System.out.println("1. My Friends");
			System.out.println("2. My Farm");
			System.out.println("3. My Inventory");
			System.out.println("4. Logout");
			System.out.print("Enter your choice > ");
			
			try{
				choice = sc.nextInt();
				System.out.println();
			
				if (choice > 4 || choice < 1){
			
					System.out.println("Invalid input! Please enter again with [1],[2],[3] or [4].");
				
				}
			
				if(choice == 1){
			
					friendMenu.display(farmer);
			
				}else if(choice == 2){
			
					farmingMenu.display(farmer);
			
				}else if(choice == 3){
			
					inventoryMenu.display(farmer);
			
				}
			}catch(Exception e){
				System.out.println("Invalid input! Please enter again with [1],[2],[3] or [4].");
				sc.nextLine();
			}	
			
		}while (choice != 4);
		System.out.println();
	}
}
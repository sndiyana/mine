package DataManager;

import Entity.*;

import java.util.*;
import java.io.*;

/**
 * A InventoryDataManager maintains farmer's inventory list
 */
public class InventoryDataManager{
	
	private final String FILEPATH = "data/Inventory/";
	
	/**
	* Retrieve the inventory list for specified farmer
	* @param username user that logged in
	* @return inventory list
	*/
	public ArrayList<Inventory> loadInventory(String username){
		
		String path = FILEPATH + username +".csv";
		Scanner sc = null;
		File inventoryFile = null;
		int amount = 0;
		String cropName = "";
		
		ArrayList<Inventory> inventoryList = new ArrayList<>();
		
		try{
		
			inventoryFile = new File(path);
			sc = new Scanner(inventoryFile);
			sc.useDelimiter(",|\r\n");
			
			sc.nextLine();
			
			while(sc.hasNext()){
				amount = Integer.parseInt(sc.next());
				cropName = sc.next();
				inventoryList.add(new Inventory(amount, cropName));
			}
			
		} catch (FileNotFoundException e){
			return null;
		}
		
		return inventoryList;
	}
	
	/**
	* Replaces the current inventory list with the updated list for the specified farmer
	* @param inventoryList updated inventory list
	* @param username user that logged in
	*/
	public void saveInventory(ArrayList<Inventory> inventoryList, String username){
	
		String path = FILEPATH + username +".csv";
		
		PrintStream fileOut = null;
		
		try {
		
		
			fileOut = new PrintStream(new FileOutputStream(path, false));
			fileOut.println("amount,cropName");
			
			for (int i = 0; i < inventoryList.size(); i++) {
				Inventory iv = inventoryList.get(i);
				if(iv.getAmount()>0){
					fileOut.print(iv.getAmount());
					fileOut.print(",");
					fileOut.println(iv.getCropName());
				}
			}
			
		} catch (Exception e) {
		  e.printStackTrace();
		  
		} finally {
			if (fileOut != null) {
				fileOut.close();
			}
		}	
	}
}
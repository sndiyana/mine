package DataManager;

import Entity.*;
import CSVReader.*;

import java.io.*;
import java.util.*;

/**
 * A FarmerDataManager maintains the farmer list
 */
public class FarmerDataManager{

	private PlotDataManager plotDM;
	private FriendDataManager friendDM;
	private InventoryDataManager inventoryDM;
	private GiftDataManager giftDM;
	private final String FILEPATH = "data/";
	
	/**
	* Creates a Farmer Data Manager object
	*/
	public FarmerDataManager() {
	
		plotDM = new PlotDataManager();
		friendDM = new FriendDataManager();
		inventoryDM = new InventoryDataManager();
		giftDM = new GiftDataManager();
		
	}
	
	/**
	* Creates a new Farmer
	* @param username username of new farmer
	* @param fullname fullname of new farmer
	* @param password password of new farmer
	*/
	public void add(String username, String fullname, String password){
	
		File frd = new File(FILEPATH + "friends/"+username+".csv");
		File ivty = new File(FILEPATH + "inventory/"+username+".csv");
		File pt = new File(FILEPATH + "plot/"+username+".csv");
		
		// Create plots.csv
		ArrayList<Plot> pList = new ArrayList<>();
		
		for (int i = 0; i < 5; i++) {
			pList.add(new Plot());
		}
		
		plotDM.savePlot(pList, username);
		
		// Create friends.csv
		friendDM.saveFriend(new ArrayList<Friend>(), username);
		
		//Create gifts.csv
		giftDM.overwriteGift(new ArrayList<Gift>(), username);
			
		// Create inventory.csv
		inventoryDM.saveInventory(new ArrayList<Inventory>(), username);
		ArrayList<Farmer> farmerList = retrieveAll();
		farmerList.add(new Farmer(username, fullname, password));
		update(farmerList);
		
	}
	
	/**
	* Retrieve the list of registered farmers
	* @return farmer list
	*/
	public static ArrayList<Farmer> retrieveAll(){
	
		ArrayList<Farmer> farmerList=loadData();
		return farmerList;
		
	}
	
	/**
	* Export data about farmer from the file into an ArrayList
	* @return farmer list
	*/
	public static ArrayList<Farmer> loadData(){
	
		ArrayList<Farmer> farmerList = new ArrayList<Farmer>();

		try{
			
			CsvReader reader = new CsvReader("data/FarmerList.csv");
			
			reader.readHeaders();
			
			while (reader.readRecord()){
				String username = reader.get("Username").trim();
				String fullname = reader.get("Fullname").trim();
				String password = reader.get("Password").trim();
				int XP = Integer.parseInt(reader.get("XP").trim());
				int gold = Integer.parseInt(reader.get("Gold").trim());
				farmerList.add(new Farmer(username, fullname, password, XP, gold));	
			}
			
			reader.close();
			
		}	catch (FileNotFoundException e){
			System.out.println("Error, file not found");
			
		}   catch (IOException e){
			System.out.println("IO exception");
		}
		
		return farmerList;
		
	}
	
	/**
	* Retrieve specific Farmer object for the specified username
	* @param  username username of farmer
	* @return Farmer object
	*/
	public static Farmer retrieveFarmer(String username){
	
		ArrayList<Farmer> farmerList=loadData();	
		
		for (Farmer f : farmerList){
			if (f.getUsername().equals(username)){
				return f;
			}
		}
		
		return null;
	}
	
	/**
	* Updates farmer list with the specified list
	* @param  farmerList the updated friend list
	*/
	public static void update(ArrayList<Farmer> farmerList){
		
		String outputFile = "data/FarmerList.csv";
		
		try {

			CsvWriter csvOutput = new CsvWriter(new FileWriter(outputFile), ',');
			
			csvOutput.write("Username");
			csvOutput.write("Fullname");
			csvOutput.write("Password");
			csvOutput.write("XP");
			csvOutput.write("Gold");
			csvOutput.endRecord();
			
			for (Farmer f : farmerList){
				csvOutput.write(f.getUsername());
				csvOutput.write(f.getFullName());
				csvOutput.write(f.getPassword());			
				csvOutput.write(""+f.getXP());
				csvOutput.write(""+f.getGold());
				csvOutput.endRecord();
			}			
			
			csvOutput.close();
			
		} catch (IOException e) {
		
			System.out.println("Error, 'FarmerList.csv' file not found!"); 
			
		}
	}
	
	/**
	* Adds new farmer to farmer list
	* @param farmer object
	*/
	public static void saveUser(Farmer farmer){
	
		ArrayList<Farmer> farmerList=loadData();
		String username=farmer.getUsername();
		
		for(int i=0; i<farmerList.size(); i++){
			Farmer f=farmerList.get(i);			
			if(f.getUsername().equals(username)){
				farmerList.remove(i);
				farmerList.add(farmer);
			}
		}

		update(farmerList);
	}
}
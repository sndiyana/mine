package Controller;

import DataManager.*;
import Entity.*;

import java.util.*;
import java.text.*;
import java.time.*;
/**
 * A GiftController manages the farmer's gift
 */
public class GiftController {

	private GiftDataManager giftDM;
	private FriendDataManager friendDM;
	private InventoryDataManager inventoryDM;
	private FarmerDataManager farmerDM;
	
	/**
	* Creates a Gift Controller object
	*/
	public GiftController() {
	
		giftDM = new GiftDataManager();
		friendDM = new FriendDataManager();
		inventoryDM = new InventoryDataManager();
		farmerDM = new FarmerDataManager();
		
	}
	
	/**
	* Verifies if farmer has met the maximum sending limit for the day
	* @param farmerName farmer that logged in
	* @return if sending limit was met
	*/
	public boolean validateSendLimit(String farmerName) {
	
		ArrayList<Gift> gList = giftDM.loadGifts(farmerName);
		
		if(gList.size() < 5) {
			return true;
		}
		LocalDate ld = LocalDate.now();
		Gift g = gList.get(gList.size()-1);
		Date d = g.getDate();
		Instant instant = Instant.ofEpochMilli(d.getTime());
		LocalDate res = LocalDateTime.ofInstant(instant, ZoneId.systemDefault()).toLocalDate();
		if(ld.isAfter(res)){
			giftDM.overwriteGift(new ArrayList<Gift>() , farmerName);
			return true;
		}
		return false;
	}
	
	/**
	* Process the farmer sending list
	* @param chosenFriends user input of friends who will receive gift
	* @return farmer list has been split and placed into an array
	*/
	public String[] chosenFriendList(String chosenFriends) {
			
		String[] fList;
		// farmer only sends gift to one friend
		if(chosenFriends.indexOf(",") < 0) {
			fList = new String[1];
			fList[0] = chosenFriends;
		// farmer sends gift to more than one friend
		} else {
			fList = chosenFriends.split(",");
		}
		
		return fList;
		
	}
	
	/**
	* Verifies that the friend is a confirmed friend for the specified farmer
	* @param friendName the friend that will receive the gift
	* @param farmer the user that logged in
	* @return checks if the friend is a confirmed friend
	*/
	public boolean validateFriend(String friendName, String farmer) {
	
		ArrayList<Friend> friends = friendDM.loadFriends(farmer);
		
		if(friends.size() == 0) {
			return false;
		}
		
		for(int k = 0; k < friends.size(); k++) {
			Friend friend = friends.get(k);
			if(friendName.equals(friend.getFriendName()) && friend.getStatus().equals("friends")) {
				return true;
			}
		}
		
		return false;
		
	}
	
	/**
	* Process to send a gift for the specified farmer to the specified friend
	* @param farmer the farmer that logged in
	* @param friend the username of the friend that will receive the gift
	* @param cropName the crop that will be sent to friend
	* @return if the gift was sent successfully
	*/
	public boolean sendGift(String farmer, String friend, String cropName) {
	
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yy");
		
		ArrayList<Gift> gList = giftDM.loadGifts(farmer); // load farmer gift list
		
		Date date = new Date();
		String sNewDate = formatter.format(date);
		
		//if list is not empty
		if(!(gList.size() == 0)) {
			String sOldDate = formatter.format(gList.get(0).getDate());
			
			//if sending diff date, clear arraylist
			if(!(sOldDate.equals(sNewDate))) {
				gList.clear();
				giftDM.overwriteGift(gList,farmer);
			}
			
			//if send same day and limit reached, return false
			if((sOldDate.equals(sNewDate) && gList.size() == 5) ) {
				return false;
			}
			
		}
		
		
		//update user's inventory
		boolean b = false;
		ArrayList<Inventory> ivList1=inventoryDM.loadInventory(farmer); //load farmer inventory
		for(int i=0; i<ivList1.size(); i++){
			if(ivList1.get(i).getCropName().equals(cropName)){
				ivList1.get(i).setAmount(-1);
				b=true;
				break;
			}
		}
		if(!b){
			return false;
		}
		
		//update farmer gift csv
		Gift gift = new Gift(friend, date, cropName);
		giftDM.saveGift(gift,farmer);
		
		inventoryDM.saveInventory(ivList1,farmer);
				
		//update friend inventory
		ArrayList<Inventory> ivList=inventoryDM.loadInventory(friend);
		boolean cropExistInInventory = false;
		
		for(int i=0; i<ivList.size(); i++){
			if(ivList.get(i).getCropName().equals(cropName)){
				cropExistInInventory = true;
				ivList.get(i).setAmount(1);
				break;
			}
		}
		
		if(!cropExistInInventory) {
			ivList.add(new Inventory(1, cropName));
		}
		
		inventoryDM.saveInventory(ivList,friend);
		Farmer Ffriend = farmerDM.retrieveFarmer(friend); 
		farmerDM.saveUser(Ffriend);
		
		return true;
		
	}
	
	/**
	* Check if the friend has received a gift before on that day
	* @param farmer user that logged in
	* @param username friend that will receive the gift
	* @return if friend has received a gift
	*/
	public boolean hasReceivedGift(String farmer, String username) {
	
		ArrayList<Gift> gList = giftDM.loadGifts(farmer);
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yy");
		
		Date date = new Date();
		String nowDate = formatter.format(date);
		
		for(Gift g : gList) {
			String giftDate = formatter.format(g.getDate());
			if(g.getFriendName().equals(username) && giftDate.equals(nowDate)) {
			
				return true;
			
			}
		
		}
	
		return false;
	
	}
	
	/**
	* Check the number of times the farmer has send a gift for that particular day
	* @param f farmer user that logged in
	* @return the number of times a gift was send
	*/
	public int countNumSendGift(Farmer f) {
		ArrayList<Gift> gList = giftDM.loadGifts(f.getUsername());
		
		return gList.size();
	}
}

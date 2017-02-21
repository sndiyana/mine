package Controller;

import DataManager.*;
import Entity.*;

import java.util.*;
import java.io.*;

/**
 * A FriendDataManager manages the farmer's friend list
 */
public class FriendController {

	private FriendDataManager friendDM;
	private FarmerDataManager farmerDM;
	
	/**
	* Creates a Friend Controller object
	*/
	public FriendController() {
	
		friendDM = new FriendDataManager();
		farmerDM = new FarmerDataManager();
		
	}
	
	/**
	* Returns the confirmed friends of the farmer specified
	* @param farmer the farmer that logged in
	* @return an ArrayList of confirmed friends
	*/
	public ArrayList<Friend> friendsDisplay(Farmer farmer) {
	
		String username = farmer.getUsername();
		ArrayList<Friend> fList = friendDM.loadFriends(username);
		ArrayList<Friend> display = new ArrayList<Friend>();
		
		for(int i = 0; i < fList.size(); i++) {
			Friend f = fList.get(i);
			if(f.getStatus().equals("friends")) {
				display.add(f);
			}
		}
		
		return display;
	
	}
	
	/**
	* Process to unfriend a confirmed friend for the specified farmer and 
	* @param farmer the farmer that logged in
	* @param friendName the friend that will be removed
	* @param status the current status of the friend
	* @return returns success message
	*/
	public String unfriend(Farmer farmer, String friendName, String status) {
		
		String username = farmer.getUsername();
		ArrayList<Friend> friendList = friendDM.loadFriends(username);
		String stringToReturn=null;
		
		//delete friend from farmer list of friends
		for(int i = 0; i < friendList.size(); i++) {
			Friend f = friendList.get(i);
			if(f.getFriendName().equals(friendName) && f.getStatus().equals(status)) {
				friendList.remove(i);
				stringToReturn=friendName + " is no longer your friend.";
				friendDM.saveFriend(friendList, username);
				break;
			}
		}
		
		//delete farmer from friend list of friends
		//load friend list
		ArrayList<Friend> fList = friendDM.loadFriends(friendName);
		
		for(int i = 0; i < fList.size(); i++) {
			Friend f = fList.get(i);
			if(f.getFriendName().equals(username) && f.getStatus().equals("friends")) {
				fList.remove(i);
				friendDM.saveFriend(fList, friendName);
				break;
			}
		}
		
		return stringToReturn;
		
	}
	
	/**
	* Verify if the username specified is an existed farmer
	* @param username the username that farmer sent request to
	* @return if the farmer exists
	*/
	public boolean verifyUsername(String username) {
	
		ArrayList<Farmer> fList = farmerDM.retrieveAll();
		for(int i = 0; i < fList.size(); i++) {
			Farmer f = fList.get(i);
			if(f.getUsername().equals(username)) {
				return true;
			}
		}
		return false;
	}
	
	/**
	* Process friend request for the specified farmer and username
	* @param f the farmer that logged in
	* @param username the username that the request will be sent to
	* @return farmer username
	*/
	public String request(Farmer f, String username) {
	
		String farmerUsername = f.getUsername();
		ArrayList<Friend> farmerFList = friendDM.loadFriends(farmerUsername);
		boolean prevRequestExist = false;
		String stringToReturn=null;
		
		if(username.equals(f.getUsername())) {
				stringToReturn="Unable to send request to " + username + ".";
				prevRequestExist = true;
		}
		
		//checks if a request has been sent to the username before
		for(int i = 0; i < farmerFList.size(); i++) {
			Friend friend = farmerFList.get(i);
			if(friend.getFriendName().equals(username)) {
				prevRequestExist = true;
				stringToReturn="Friend request has been sent to " + username + " previously";
			}
		}
		
		if(!prevRequestExist) {
			//friend request will be added to farmer list of friends
			farmerFList.add(new Friend(username, "pending"));
			friendDM.saveFriend(farmerFList, farmerUsername);
			
			//friend request will be added to the username specified
			ArrayList<Friend> friendFList = friendDM.loadFriends(username);
			friendFList.add(new Friend(farmerUsername, "request"));
			friendDM.saveFriend(friendFList, username);
			
			stringToReturn="Friend request to " + username + " sent.";
		}
		
		return stringToReturn;
		
	}
}
package Controller;

import DataManager.*;
import Entity.*;

import java.util.*;
import java.io.*;

/**
 * A FriendRequestController manages the farmer's friend Request List
 */
public class FriendRequestController {

	private FriendDataManager friendDM;
	private FarmerDataManager farmerDM;
	
	/**
	* Creates a Friend Request Controller object
	*/
	public FriendRequestController() {
	
		friendDM = new FriendDataManager();
		farmerDM = new FarmerDataManager();
		
	}
	
	/**
	* Returns a list of friend request for the specified farmer
	* @param farmer user that loggin in
	* @return list of friend requests
	*/
	public ArrayList<Friend> friendRequestDisplay(Farmer farmer) {
	
		String username = farmer.getUsername();
		ArrayList<Friend> fList = friendDM.loadFriends(username);
		ArrayList<Friend> display = new ArrayList<Friend>();
		
		for(int i = 0; i < fList.size(); i++) {
			Friend f = fList.get(i);
			if(f.getStatus().equals("request")) {
				display.add(f);
			}
		}
		
		return display;
		
	}
	
	/**
	* Process a request for the specified farmer, username and action
	* @param f the user that logged in
	* @param username the username the username of the friend
	* @param action to reject or accept request
	* @return successfull message
	*/
	public String processFRequest(Farmer f, String username, boolean action) {
	
		String stringToReturn = null;
		String farmerUsername = f.getUsername();
		ArrayList<Friend> farmerFList = friendDM.loadFriends(farmerUsername);
		
		//update farmer friend list
		for(int i = 0; i < farmerFList.size(); i++) {
			Friend friend  = farmerFList.get(i);
			if(friend.getFriendName().equals(username)) {
				// accepts friend request, update status
				if(action) {
					friend.setStatus("friends");
					stringToReturn="You have accepted " + username + "'s friend request";
					friendDM.saveFriend(farmerFList, farmerUsername);
					break;
				// reject friend request, remove username 
				} else {
					farmerFList.remove(i);
					stringToReturn="You have rejected " + username + "'s friend request";
					friendDM.saveFriend(farmerFList, farmerUsername);
				}
			}
		} 
		
		//update friend specified friend list
		ArrayList<Friend> friendFList = friendDM.loadFriends(username);
		
		for(int i = 0; i < friendFList.size(); i++) {
			Friend friend = friendFList.get(i);
			if(friend.getFriendName().equals(farmerUsername)) {
				// update farmer status
				if(action) {
					friend.setStatus("friends");
					friendDM.saveFriend(friendFList, username);
				} else {
					//remove farmer from list
					friendFList.remove(i);
					friendDM.saveFriend(friendFList, username);
				}
			}
		}
		
		return stringToReturn;
		
	}
}
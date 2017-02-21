package Menu;

import Controller.*;
import Entity.*;

import java.util.*;

/**
 * A FriendMenu allows farmer to maintain his friend list by requesting a new friend, unfriend, or respond to a friend request
 */
public class FriendMenu{

	private FriendController friendCtrl;
	private FriendRequestController friendRCtrl;
	
	/**
	* Creates a Friend Menu
	*/
	public FriendMenu(){
	
		friendCtrl = new FriendController();
		friendRCtrl = new FriendRequestController();
		
	}
	
	/**
	* Display the friend menu for farmer
	* @param f user that logged in
	*/
	public void display(Farmer f) {
	
		Scanner sc = new Scanner(System.in);
		String sChoice = "";
	
		do {
		
			System.out.println();
			System.out.println("== Farm City :: My Friends == ");
			System.out.println("Welcome, " + f.getFullName() + "!");
			
			ArrayList<Friend> friendList = friendCtrl.friendsDisplay(f);
			int numOfFriends = friendList.size();
			
			ArrayList<Friend> friendRequestList = friendRCtrl.friendRequestDisplay(f);
			int numOfRequests = friendRequestList.size();
			
			int k = 0;
			
			//display friends
			System.out.println("\nMy Friends:");
			
			if(friendList == null || friendList.size() == 0) {
			
				System.out.println("You have no friends yet.");
			
			}
			
			if(friendList.size() > 0) {
			
				for(int i = 0; i < friendList.size(); i++) {
				
					Friend friend = friendList.get(i);
					System.out.println(++k + "." + friendList.get(i).getFriendName());
					
				}
				
			}
			
			//display friend requests
			System.out.println("\nMy Requests:");
			
			if(friendRequestList == null || friendRequestList.size() == 0) {
			
				System.out.println("You have no friend requests.");
				
			}
			
			if(friendRequestList.size() > 0) {
			
				for(int i = 0; i < friendRequestList.size(); i++) {
				
					Friend friend = friendRequestList.get(i);
					System.out.println(++k + "." + friendRequestList.get(i).getFriendName());
					
				}
				
			}
			
			System.out.println();
			int choice = 0;
			int choiceFR = 0;
				
			try {
			
				System.out.print("[M]ain | [U]nfriend | re[Q]uest | [A]ccept | [R]eject > ");
				sChoice = sc.nextLine();
				sChoice = sChoice.toUpperCase();
			
				if(sChoice.length() > 1) {
				
					choice = 0;
					
					try{
					
						choice = Integer.parseInt(sChoice.substring(1,2));
						
					} catch(Exception e){
					
						System.out.println("Invalid Input");
						return;
						
					}
					
					choiceFR = choice - numOfFriends;
					
				}
				
				System.out.println();
				
				if(sChoice.charAt(0) == 'U' && choice > 0 && !(choice > numOfFriends)) {
				
					unfriend(f, choice);
					
				} else if (sChoice.charAt(0) == 'U' && numOfFriends == 0) {
				
					System.out.println("\nYou have no friends yet.");
				
				} else if (sChoice.charAt(0) == 'U' && (choice > numOfFriends || choice < 0)) {
				
					System.out.println("\nThe selected choice is invalid. Unfriend function is only available till option " + numOfFriends);
				
				} else if (sChoice.charAt(0) == 'Q' && sChoice.length() == 1) {
				
					requestFriend(f);
				
				} else if ((sChoice.charAt(0) == 'A' || sChoice.charAt(0) == 'R') && !(choiceFR > numOfRequests) && choiceFR > 0 ) {
					
					processRequest(f, choiceFR, sChoice);
				
				} else if ((sChoice.charAt(0) == 'A' || sChoice.charAt(0) == 'R') && numOfRequests == 0) {
					
					System.out.println("\nYou currently have no requests.");
				
				} else if ((sChoice.charAt(0) == 'A' || sChoice.charAt(0) == 'R') && (choiceFR > numOfRequests || choiceFR < 0 )) {
					
					System.out.println("\nThe selected choice is invalid. Function is only available from option " + (numOfFriends + 1) + " till option " + k);
				
				} else if(sChoice.charAt(0) == 'M') {
					
					return;
				
				} else {
				
					System.out.print("\nInvalid Input");
					
				}
			
			} catch(Exception e) {
			
				System.out.println("Please choose a valid option");
			
			}
			
		} while(!sChoice.equals("M"));
		
	}
	
	/**
	* Process to unfriend a friend for the specified farmer
	* @param f user that logged in
	* @param choice user input
	*/
	public void unfriend(Farmer f, int choice) {
	
		//load ArrayList
		ArrayList<Friend> friendList = friendCtrl.friendsDisplay(f);
		
		//display friend info
		String fName = friendList.get(choice - 1).getFriendName();
		String status = friendList.get(choice - 1).getStatus();
		
		System.out.println(friendCtrl.unfriend(f, fName, status));
		
	}
	
	/**
	* Process to send a friend request
	* @param f user that logged in
	*/
	public void requestFriend(Farmer f) {
	
		Scanner sc = new Scanner(System.in);
		
		try {
			// user input for username
			System.out.print("Enter the username > ");
			String username = sc.nextLine();
			
			boolean usernameExist = friendCtrl.verifyUsername(username);
			
			if(usernameExist) {
			
				System.out.println(friendCtrl.request(f,username));
				
			} else {
			
				System.out.println("Username does not exist.");
				return;
				
			}
			
		} catch (Exception e) {
		
			System.out.println("Please enter a username");
		
		}
	}
	
	/**
	* Process to respond to a friend request
	* @param f user that logged in
	* @param choice user input
	* @param sChoice the friend request that will be responded
	*/
	public void processRequest(Farmer f, int choice, String sChoice) {
	
		ArrayList<Friend> requestList = friendRCtrl.friendRequestDisplay(f);
		String fName = requestList.get(choice - 1).getFriendName();
		
		//accept friend request
		if(sChoice.charAt(0) == 'A') {
		
			System.out.println(friendRCtrl.processFRequest(f, fName, true));
		//reject friend request
		} else {
			
			System.out.println(friendRCtrl.processFRequest(f, fName, false));
		
		}
	}
}

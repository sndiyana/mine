package Menu;

import Controller.*;
import DataManager.*;

import Entity.*;
import java.util.*;

/**
 * A GiftMenu allows a farmer to send gifts to a friend
 */
public class GiftMenu{

	private RankController rankingCtrl;
	private GiftController giftCtrl;
	private CropDataManager cropDM;
	private FarmerDataManager farmerDM;
	private FriendDataManager friendDM;
	
	/**
	* Creates a gift menu
	*/
	public GiftMenu(){
		rankingCtrl = new RankController();
		giftCtrl = new GiftController();
		cropDM = new CropDataManager();
		farmerDM = new FarmerDataManager();
		friendDM = new FriendDataManager();
	}
	
	/**
	* Display the gift menu to farmer
	* @param f user that logged in
	*/
	public void display(Farmer f) throws RuntimeException{
	
		Scanner sc = new Scanner(System.in);
		int counter = 0;
	
		//display farmer information
		System.out.println();
		System.out.println("== Farm City :: Send a Gift == ");
		System.out.println("Welcome, " + f.getFullName() + "!");
		System.out.println("Rank: " + rankingCtrl.currentRank(f).getRankName()   + "\t\t Gold: " + f.getGold() + "\n");
		
		//display gift list
		ArrayList<Crop> giftItems = cropDM.loadCrop();
		System.out.println("\nGifts Available:");
		
		for (Crop c : giftItems){
		
			System.out.println(++counter + ". 1 Bag of " + c.getName() + " Seeds" );
			
		}
			
		System.out.print("\n[M]ain | Select choice > ");
		String input = sc.nextLine();
		input = input.toUpperCase();
			
		if (input.charAt(0)=='M'){
		
			return;
			
		}
			int choice  = 0;
			Crop c = null;
			String friendName = null;
			
		try {
		
			choice = Integer.parseInt(input);
			c = giftItems.get(choice-1);
			
			System.out.print("Sent to > ");
			friendName = sc.nextLine();
			
			processSendGift(f, c, friendName);
			
		} catch(Exception e) {
			System.out.println("Invalid input");
			
		}
	}

	/**
	* Process to send gift to a friend by verifying the sending limit has not been met and friend has not received gift for the day
	* @param f user that logged in
	* @param c crop that will be sent as a gift
	* @param friendName the friend that will receive the gift
	*/
	public void processSendGift(Farmer f, Crop c, String friendName) {
		
		//checks if farmer has exceeded the sending limit
		boolean hasReachedSendLimit = giftCtrl.validateSendLimit(f.getUsername());
		//count the number of times gift was sent
		int counter = giftCtrl.countNumSendGift(f);
		
		if (!hasReachedSendLimit) {
			//if farmer exceeded sending limit
			System.out.println("You have reached the sending limit.");
			
		} else if(friendName == null || friendName.length() == 0) {
			//if farmer submit empty string
			System.out.println("Please enter a valid username");
		
		} else {
		
			String[] fList = giftCtrl.chosenFriendList(friendName);
			ArrayList<String> validatedFList = new ArrayList<String>();
			boolean isFriend = false;
			
			//checks if the sending list contains of confirmed friends only
			for(int i = 0; i < fList.length; i++) {
			
				String name = fList[i].trim();
				isFriend = giftCtrl.validateFriend(name, f.getUsername());
				
				if(isFriend) {
				
					validatedFList.add(name);
					
				} else {
				
					System.out.println("Unable to send gift to " + name + ". Add " + name + " to send a gift.\n");
					
					}
					
				}
				
				boolean sendSuccess = false;
				
				for(int i = 0; i < validatedFList.size(); i++) {
					
					//checks if the specific friend has already received a gift for the day
					String friendN = validatedFList.get(i);
					boolean hasReceived = giftCtrl.hasReceivedGift(f.getUsername(), friendN);
			
					if(!hasReceived && counter < 5) {
						//sends gift to friend
						sendSuccess = giftCtrl.sendGift(f.getUsername(), friendN, c.getName());
					
						if(sendSuccess) {
					
							System.out.println("Gift has been successfully sent to " + friendN);
							counter++;
						
						} else if((!sendSuccess) && counter > 5) {
						
							System.out.println("Exceeded sending limit.");
							break;
						
						} else {
					
							System.out.println("Sorry. You do not have enough inventory to send to " + friendN + ".");
							break;
						}
			
					} else {
			
						System.out.println("You have sent " + friendN + " a gift recently. Please wait 24hrs before sending another gift to " + friendN);
					
					}
					
				}
			}
	}
}
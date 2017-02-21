package DataManager;

import Entity.*;

import java.util.*;
import java.io.*;

/**
 * A FriendDataManager maintains farmer's friend list
 */
public class FriendDataManager{
	
	private final String FILEPATH = "data/Friend/";
	
	/**
	* Retrieve the friend list for the specified farmer
	* @param username username that logged in
	* @return friend list
	*/
	public ArrayList<Friend> loadFriends(String username){
		
		String path = FILEPATH + username + ".csv";
		File fFile = null;
		Scanner sc = null;
		String friendName;
		String status;
		
		ArrayList<Friend> fList = new ArrayList<Friend>();
		
		try{
		
			fFile = new File(path);
			sc = new Scanner(fFile);
			sc.useDelimiter(",|\r\n");
			
			sc.nextLine();
			
			while(sc.hasNext()){
				friendName =  sc.next();
				status = sc.next();
				fList.add(new Friend(friendName, status));
			}
			
		} catch (FileNotFoundException e){
			return null;
		}
		
		return fList;
	}
		
	/**
	* Save the updated friend list for the specified farmer and the updated list
	* @param friendList the updated friendList
	* @param username user that logged in
	*/
	public void saveFriend(ArrayList<Friend> friendList, String username){

		String path = FILEPATH + username+".csv";
		
		PrintStream fileOut = null;
		
		try {
		
			fileOut = new PrintStream(new FileOutputStream(path, false));
			
			fileOut.println("username, status");
			
			for (int i = 0; i < friendList.size(); i++) {
				Friend f = friendList.get(i);
				
				fileOut.print(f.getFriendName());
				fileOut.print(",");
				fileOut.println(f.getStatus());
			}
			
		} catch (IOException e) {
		  e.printStackTrace();
		  
		} finally {
			if (fileOut != null) {
				fileOut.close();
			}
		}	

	}
	
}
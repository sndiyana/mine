package DataManager;

import Entity.*;

import java.util.*;
import java.io.*;
import java.text.*;

/**
 * A GiftDataManager maintains the farmer's gift list
 */
public class GiftDataManager{
	
	private final String FILEPATH = "data/Gift/";
	
	/**
	* Retrieve the gift list for the specified farmer
	* @param username user that logged in
	* @return gift list
	*/
	public ArrayList<Gift> loadGifts(String username){
		
		String path = FILEPATH + username + ".csv";
		File fFile = null;
		Scanner sc = null;
		String friendName;
		String sDate;
		String cropName;
		Date date = null;
		
		ArrayList<Gift> gList = new ArrayList<Gift>();
		
		try{
		
			fFile = new File(path);
			sc = new Scanner(fFile);
			sc.useDelimiter(",|\r\n");
			
			sc.nextLine();
			
			while(sc.hasNext()){
				friendName =  sc.next();
				sDate = sc.next();
				cropName = sc.next();
				
				try {
				
					date = new SimpleDateFormat("dd/MM/yy").parse(sDate);
					
				} catch(ParseException e) {
					e.printStackTrace();
					
				}
				
				gList.add(new Gift(friendName, date, cropName));
			}
			
		} catch (FileNotFoundException e){
			return null;
		}
		
		return gList;
	}
	
	/**
	* Overwrites the current gift list for the specified username and gift list if date is different
	* @param gList updated gift list
	* @param username user that logged in
	*/
	public void overwriteGift(ArrayList<Gift> gList, String username){

		String path = FILEPATH + username+".csv";
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yy");
		PrintStream fileOut = null;
		
		try {
		
			fileOut = new PrintStream(new FileOutputStream(path, false));
			
			fileOut.println("friendName,date,crop");
			
			for (int i = 0; i < gList.size(); i++) {
				Gift f = gList.get(i);
				
				fileOut.print(f.getFriendName());
				fileOut.print(",");
				fileOut.print(formatter.format(f.getDate()));
				fileOut.print(",");
				fileOut.println(f.getCropName());
			}
			
		} catch (IOException e) {
		  e.printStackTrace();
		  
		} finally {
			if (fileOut != null) {
				fileOut.close();
			}
		}	

	}
	
	/**
	* Add gift to the current gift list
	* @param gift gift object
	* @param username user taht logged in
	*/
	public void saveGift(Gift gift, String username){

		String path = FILEPATH + username+".csv";
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yy");
		PrintStream fileOut = null;
		
		try {
		
			fileOut = new PrintStream(new FileOutputStream(path, true));
				
			fileOut.print(gift.getFriendName());
			fileOut.print(",");
			fileOut.print(formatter.format(gift.getDate()));
			fileOut.print(",");
				fileOut.println(gift.getCropName());
				
		} catch (IOException e) {
		  e.printStackTrace();
		  
		} finally {
			if (fileOut != null) {
				fileOut.close();
			}
		}	
	}
	

}
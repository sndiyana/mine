package DataManager;
import Entity.*;
import java.util.*;
import java.io.*;

/**
 * A CropDataManager maintains the crop list
 */
public class CropDataManager{
	
	private static String filePath = "data/crop.csv";
	
	/**
	* Retrieve the crop list
	* @return list of crops
	*/
	public ArrayList<Crop> loadCrop(){
		
		Scanner sc = null;
		File cropFile = null;
		
		String name = "";
		int cost = 0;
		int time = 0;
		int XP = 0;
		int minYield = 0;
		int maxYield = 0;
		int price = 0;
		
		ArrayList<Crop> cropList = new ArrayList<>();
		
		try{
		
			cropFile = new File(filePath);
			sc = new Scanner(cropFile);
			sc.useDelimiter(",|\r\n");
			
			sc.nextLine();
			
			while(sc.hasNext()){
				name = sc.next();
				cost = Integer.parseInt(sc.next());
				time = Integer.parseInt(sc.next());
				XP = Integer.parseInt(sc.next());
				minYield = Integer.parseInt(sc.next());
				maxYield = Integer.parseInt(sc.next());
				price = Integer.parseInt(sc.next());
				
				cropList.add(new Crop(name, cost, time, XP, minYield, maxYield, price));
			}
			
		} catch (FileNotFoundException e){
			return null;
		}
		
		return cropList;
	}

}
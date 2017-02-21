package DataManager;

import Entity.*;

import java.util.*;
import java.io.*;

/**
 * A PlotDataManager maintains the plot and crops grown by farmer
 */
public class PlotDataManager {
	
	private static String filePath = "data/Plot/";

	/**
	* Retrieve Plot list for the specified farmer
	* @param username the user that logged in
	* @return plot list
	*/
	public ArrayList<Plot> loadPlots(String username){
		
		String path = filePath + "/"+username+".csv";
		File plot = null;
		Scanner sc = null;
		String cropName;
		String status;
		String percentage;
		String plantDate;
		
		ArrayList<Plot> plotList = new ArrayList<Plot>();
		
		try{
		
			plot = new File(path);
			sc = new Scanner(plot);
			sc.useDelimiter(",|\r\n");
			
			sc.nextLine();
			
			while (sc.hasNext()){
				cropName = sc.next();
				status = sc.next();
				percentage = sc.next();
				plantDate = sc.next();
				plotList.add(new Plot(cropName, status, percentage, plantDate));
			}
			
		}catch(FileNotFoundException e){
			e.printStackTrace();
			return null;
		}
		
		return plotList;
	}
	
	/**
	* Updates the plot list with the updated plot list for specified username
	* @param pList updated plot list
	* @param username user that logged in
	*/	
	public void savePlot(ArrayList<Plot> pList, String username){
	
		String path = filePath + "/"+username+".csv";
		
		PrintStream fileOut = null;
		
		try {
		
			fileOut = new PrintStream(new FileOutputStream(path, false));
			
			fileOut.println("cropName,status,percentage,plantDate");
			
			for (int i = 0; i < pList.size(); i++) {
				Plot p = pList.get(i);
				
				fileOut.print(p.getName());
				fileOut.print(",");
				fileOut.print(p.getStatus());
				fileOut.print(",");
				fileOut.print(p.getPercentage());
				fileOut.print(",");
				fileOut.println(p.getPlantDate());
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
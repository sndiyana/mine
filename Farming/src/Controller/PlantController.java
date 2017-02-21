package Controller;

import DataManager.*;
import Entity.*;

import java.util.*;
import java.text.*;

/**
 * A PlantController manages the farmer's request to plant a crop
 */
public class PlantController{
	
	private PlotDataManager plotDM;
	private InventoryDataManager inventoryDM;
	private CropDataManager cropDM;
	
	/**
	* Creates a Plant Controller object
	*/
	public PlantController(){
		
		plotDM = new PlotDataManager();
		inventoryDM = new InventoryDataManager();
		cropDM= new CropDataManager();
		
	}
	
	/**
	* Retrieve the number of plots for the specified farmer
	* @param f user that logged in
	* @return the number of plots available
	*/
	public int plotAmt(Farmer f){
		
		String username  = f.getUsername();		
		ArrayList<Plot> plotList = plotDM.loadPlots(username);
		int amt = plotList.size();
		
		return amt;
		
	}
	
	/**
	* Plant the specified crop at the specified plot number for the specified farmer
	* @param f farmer that logged in
	* @param plotNo the location where the crop will be grown
	* @param cropName the crop that will be grown
	*/
	public void plant(Farmer f, int plotNo, String cropName){
		
		Crop c = retrieveCrop(cropName);
		
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm");
		Date date = new Date();
		String d = sdf.format(date);
		
		String username = f.getUsername();
		ArrayList<Plot> plotList = plotDM.loadPlots(username);
		plotList.remove(plotNo - 1);
		plotList.add(plotNo - 1, new Plot(cropName, "[----------]", "0%", d));
		
		// Update the Inventory.
		ArrayList<Inventory> inventoryList = inventoryDM.loadInventory(username);
		for (int i = 0; i < inventoryList.size(); i++){
			if(inventoryList.get(i).getCropName().equals(cropName)){
				inventoryList.get(i).setAmount(-1);
			}
		}
		
		inventoryDM.saveInventory(inventoryList, username);
		
		// Update the information of farmer's plots.
		plotDM.savePlot(plotList, username);
		
	}
	
	/**
	* Return a list of crop that can be planted for the specified farmer
	* @param f user that logged in
	* @return a list of crops that the farmer can plant
	*/
	public ArrayList<String> cropList(Farmer f){
		
		ArrayList<String> list = new ArrayList<>();
		ArrayList<Inventory> inventoryList = inventoryDM.loadInventory(f.getUsername());
		
		for(int i = 0; i < inventoryList.size(); i++){
			list.add(inventoryList.get(i).getCropName());
		}
		
		return list;
		
	}
	
	/**
	* Retrieve the Crop object by crop name.
	* @param cropName crop name
	* @return Crop crop object
	*/
	public Crop retrieveCrop(String cropName){
	
		ArrayList<Crop> croplotList = cropDM.loadCrop();
		
		for (int i = 0; i < croplotList.size(); i++){
			Crop c = croplotList.get(i);
			if(c.getName().equals(cropName)){
				return c;
			}
		}
		
		return null;
		
	}

	
	/**
	* Update the plot status before display for the specified farmer
	* @param f user that logged in
	*/
	public void updatePlot(Farmer f){
		
		Date currentDate = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy hh:mm");
		
		ArrayList<Plot> plotList = plotDM.loadPlots(f.getUsername());
		
		for (int i = 0; i < plotList.size(); i++){
			if(!plotList.get(i).getPlantDate().equals(" ")){
				Date plantDate = null;
				
				try{
				
					plantDate = sdf.parse(plotList.get(i).getPlantDate());
					
				}catch(ParseException e){
					e.printStackTrace();
					return;
				}
				
				long time = plantDate.getTime();
				Crop c = retrieveCrop(plotList.get(i).getName());
				long t = (long)c.getTime()*60*1000; // Time the crop need to be mature, convert minute to millisecond.
				time += t;
				Date matureDate = new Date(time);
				time += t;
				Date wiltedDate = new Date(time);
				
				if(currentDate.after(matureDate)){
					if(currentDate.before(wiltedDate)){ // crops that can be harvest
						plotList.get(i).setStatus(100);
						plotList.get(i).setPercentage(100);
					}else{ // crops that have been wilted.
						plotList.get(i).setWilted();
						plotList.get(i).setWilted();
					}
				}else { // crops that is not mature yet.
					long difference = currentDate.getTime() - plantDate.getTime();
					int percent = (int)((double)difference / t * 100);
					plotList.get(i).setStatus(percent);
					plotList.get(i).setPercentage(percent);
				}
			}
		}
		// Update the information.
		plotDM.savePlot(plotList, f.getUsername());
	}
}
package Controller;

import DataManager.*;

import Entity.*;
import java.util.*;

/**
 * A HarvestController harvests crops that have fully grown
 */
public class HarvestController{
	
	private PlotDataManager plotDM;
	private CropDataManager cropDM;
	private RankDataManager rankDM;
	private FarmerDataManager farmerDM;
	
	/**
	* Creates a Harvest Controller object
	*/
	public HarvestController(){
	
		rankDM = new RankDataManager();
		plotDM = new PlotDataManager();
		cropDM = new CropDataManager();
		farmerDM= new FarmerDataManager();
		
	}
	
	/**
	* Checks the plots of the specified farmer for crops that have fully grown
	* @param f farmer that logged in
	* @return information about harvested crops
	*/
	public ArrayList<String> harvest(Farmer f){
		
		String username = f.getUsername();
		ArrayList<Plot> plotList = plotDM.loadPlots(username);
		ArrayList<Plot> harvestedPlot = new ArrayList<>();
		
		for(int i = 0; i < plotList.size(); i++){
			Plot p = plotList.get(i);
			if(p.getPercentage().equals("100%")){
				harvestedPlot.add(p);
				
				// Replace the plot with an empty plot.
				plotList.remove(i);
				plotList.add(i, new Plot("<empty>", " ", " ", " "));
			}
		}
		
		// When there is no plot can be harvested.
		if(harvestedPlot.size() ==  0){
			return null;
		}
		
		// Put the information of unit, XP and gold from 
		// different plots with the same crop into one
		// HarvestedItem object.
		ArrayList<HarvestedItem> itemList = new ArrayList<>();
		for(int j = 0; j < harvestedPlot.size(); j++){
			Plot p = harvestedPlot.get(j);
			int unit = calculateUnit(p);
			int XP = calculateXP(p);
			int gold  = calculateGold(p);
			
			boolean hasExisted = false;
			
			for(int k = 0; k < itemList.size();  k++){
				HarvestedItem i = itemList.get(k);
				if(p.getName().equals(i.getName())){
					i.setUnit(unit);
					i.setXP(XP);
					i.setGold(gold);
					hasExisted = true;
				}
			}
			
			if(!hasExisted){
				itemList.add(new HarvestedItem(p.getName(), unit, XP, gold));
			}
		}
		
		ArrayList<String> output = new ArrayList<>();
		for (int i = 0; i < itemList.size(); i++){
			HarvestedItem item = itemList.get(i);
			String name = item.getName();
			int unit = item.getUnit();
			int XP = item.getXP();
			int gold = item.getGold();
			
			// Generate the information displayed after harvesting.
			String s = "You have harvested " + unit + "  units of " + name + " for " + XP + " XP and " + gold + " gold.";
			output.add(s);
			
			// Update farmer's information.
			f.setXP(XP);
			f.setGold(gold);
		}
		
		// Save the change of farmer's information.
		/*farmerDM.saveFarmer(f);*/
		// Update the farmer's plots.
		plotDM.savePlot(plotList, f.getUsername());
		String rankStatus = checkPlotAmt(f, plotList);
		
		if (rankStatus!=null){
			output.add(rankStatus);
		}
		
		farmerDM.saveUser(f);
		return output;
	}
	
	/**
	* Calculate the amount of units the farmer will harvest from the specified plot.
	* @param p the plot specified
	* @return the amount of units harvested
	*/
	public int calculateUnit(Plot p){
		
		String cropName = p.getName();
		Crop c = retrieveCrop(cropName);
		int max = c.getMaxYield();
		int min = c.getMinYield();
		
		Random rd = new Random();
		int num = rd.nextInt(max - min + 1);
		
		return min + num;
		
	}
	
	
	/**
	* Calculate the XP the farmer can earn by harvesting a certain plot.
	* @param p the plot specified
	* @return the amount XP earned
	*/
	public int calculateXP(Plot p){
		
		String cropName = p.getName();
		Crop c = retrieveCrop(cropName);
		return c.getXP();
		
	}
	
	/**
	* Calculate the gold the farmer can earn by harvesting a certain plot.
	* @param p the plot specified
	* @return the amount of gold gained
	*/
	public int calculateGold(Plot p){
		
		String cropName = p.getName();
		Crop c = retrieveCrop(cropName);
		return c.getPrice();
		
	}
	
	/**
	* Retrieve the Crop object by crop name.
	* @param cropName the crop name
	* @return the crob object
	*/
	public Crop retrieveCrop(String cropName){
		
		ArrayList<Crop> cList = cropDM.loadCrop();
		for (int i = 0; i < cList.size(); i++){
			Crop c = cList.get(i);
			if(c.getName().equals(cropName)){
				return c;
			}
		}
		
		return null;
	}
	
	/**
	* Checks for number of plots for specified farmer
	* @param f user that logged in
	* @param pList an ArrayList of Plots
	* @return successful message
	*/
	public String checkPlotAmt (Farmer f, ArrayList<Plot> pList){
		
		Rank r = rankDM.retrieveRank(f.getXP());
		f.setRank(r);
		int plotAmt = r.getPlotAmt();
		
		if( plotAmt> pList.size()){
			int difference = plotAmt - pList.size();
			
			for (int i = 0; i < difference; i++){
				pList.add(new Plot());
			}
			
			return "Congratulations, you have up-ranked to a(n) " + r.getRankName() + " ! You now have " + plotAmt + " plots of land!\n";
			
		}
		
		return null;
	}
}
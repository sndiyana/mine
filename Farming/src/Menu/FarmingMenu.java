package Menu;

import Controller.*;
import Entity.*;
import DataManager.*;

import java.util.*;

/**
 * A FarmingMenu allows Farmer to maintain his plots by planting a crop, harvesting crops or clearing wilted crops
 */
public class FarmingMenu{

	private RankController rankCtrl;
	private PlantController plantCtrl;
	private HarvestController harvestCtrl;
	private ClearController clearCtrl;
	private PlotDataManager plotDM;
	
	/**
	* Creates a Farming Menu
	*/
	public FarmingMenu(){
	
		rankCtrl=new RankController();
		plantCtrl=new PlantController();
		harvestCtrl=new HarvestController();
		clearCtrl=new ClearController();
		plotDM = new PlotDataManager();
		
	}
	
	/**
	* Display the farming menu for the specified farmer
	* @param f user that logged in
	*/
	public void display(Farmer f){
		
		Scanner sc = new Scanner(System.in);
		String choice="";
		
		do{
			
			try {
				
				//display farmer information
				System.out.println();
				System.out.println("\n== Farm City :: My Farm == ");
				System.out.println("Welcome, " + f.getFullName() + "!");
				System.out.println("Rank: " + rankCtrl.currentRank(f).getRankName() + "    Gold: " + f.getGold());
				System.out.println();
				plantCtrl.updatePlot(f);
				System.out.println("\nYou have " + plantCtrl.plotAmt(f) + " plots of land.");
				
				//display plot information
				ArrayList<Plot> plotList = plotDM.loadPlots(f.getUsername());
		
				for(int i = 0; i < plotList.size(); i++){
					Plot p = plotList.get(i);
					String name = p.getName();
					String status = p.getStatus();
					String percent = p.getPercentage();
			
					System.out.println(i + 1 + ". " + name + "\t" + status + "\t" + percent);
				}
				
				System.out.println();			
				System.out.print("[M]ain | [P]lant | C[L]ear | [H]arvest  > ");
				choice = sc.nextLine();
				choice = choice.toUpperCase();
				System.out.println();
				
				switch(choice.charAt(0)){
				case 'M':
					return;
				case 'P':
					plant(f, choice);
					break;
				case 'L':
					clear(f, choice);
					break;
				case 'H':
					harvest(f);
					break;
				default:
					System.out.println("Please enter a valid choice\n");
				}
			
			} catch(Exception e) {
			
				System.out.println("Please enter a valid option");
			
			}
			
		} while(!choice.equals("M"));
	}
	
	/**
	* Process planting a crop
	* @param f user that logged in
	* @param choice user input option
	*/
	public void plant(Farmer f, String choice){
	
		int plotNo=0;
		Scanner sc=new Scanner(System.in);
		
		try{
		
			plotNo=Integer.parseInt(choice.substring(1,2));
			
		}
		
		catch(Exception e){
		
			System.out.println("Invalid Input");
			return;
			
		}
		
		ArrayList<Plot> display=plotDM.loadPlots(f.getUsername());
		
		if(display.size()==0){
		
			System.out.println("No plot available.");
			return;
			
		}

		if(!(display.get(plotNo-1).getName().equals("<empty>"))){
		
			System.out.println("Please choose an empty plot");
			return;
			
		}
		
		// if there is an empty plot, display crops that can be planted
		System.out.println("Select the crop:");
		ArrayList<String> cropList= plantCtrl.cropList(f);
		
		if(cropList.size() == 0){
		
			System.out.println("Your inventory is empty.");
			System.out.println();
			return;
			
		} else{
		
			for(int i = 0; i < cropList.size(); i++){
			
				System.out.println(i + 1 + ". " + cropList.get(i));
				
			}
		}
		
		System.out.print("[M]ain | Select Choice > ");
		String choice1 = sc.nextLine();
		
		if(choice1.equals("M")){
		
			return;
			
		} else {	
		
			int cropNo = Integer.parseInt(choice1);
			plantCtrl.plant(f, plotNo, cropList.get(cropNo - 1));
			
			System.out.println(cropList.get(cropNo - 1) + " planted on plot " + plotNo);
			System.out.println();		
		}
		
	}
	
	/**
	* Process clear for any wilted crop that exist for the specified farmer
	* @param f user that logged in
	* @param choice user input option
	*/
	public void clear(Farmer f, String choice){
		int plotNo=0;
		Scanner sc=new Scanner(System.in);
		
		try{
		
			plotNo=Integer.parseInt(choice.substring(1,2));
			
		}
		
		catch(Exception e){
		
			System.out.println("Invalid Input");
			return;
			
		}
		
		
		boolean isClear = clearCtrl.clear(f, plotNo);
		
		if(!isClear){
		
			System.out.println("There is no plot needed to clear.");
		
		} else{
		
			System.out.println("All the wilted crops have been cleared.");
			System.out.println("This operation costed you 5 gold coins.");
		}
		
		System.out.println();
	}	

	/**
	* Process harvest for any fully grown crop for the specified farmer
	* @param f user that logged in
	*/
	public void harvest(Farmer f){
	
		ArrayList<String> display = harvestCtrl.harvest(f);
		
		if(display ==  null){
		
			System.out.println("You have no plot can be harvested.");
			System.out.println();
			
		}else {
		
			for (int i = 0; i < display.size(); i++){
			
				System.out.println(display.get(i));
				
			}
			
			System.out.println();
		}		
	}

}
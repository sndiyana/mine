package Controller;

import DataManager.*;
import Entity.*;

import java.util.*;

/**
 * A ClearController clears wilted crops
 */
public class ClearController{
	
	private PlotDataManager pDM;
	private FarmerDataManager fDM;
	
	/**
	* Creates a Clear Controller object
	*/
	public ClearController(){
		
		pDM = new PlotDataManager();
		
	}
	
	/**
	* Checks for any wilted crops for the specified farmer. If wilted crops exits, it will be removed from the plot.
	* @param f the farmer selected. System will check all of the farmer's plots
	* @param choice plot the farmer chose
	* @return if plots have been cleared
	*/
	public boolean clear(Farmer f, int choice){
		
		boolean isClear = false;
		ArrayList<Plot> pList = pDM.loadPlots(f.getUsername());
		
		
		//check for wilted crop, if wilted crops exists, it will be removed
			if(pList.get(choice-1).getStatus().equals("[  wilted  ]")){
				pList.remove(choice-1);
				// plot list will be updated with a empty plot
				pList.add(choice-1, new Plot("<empty>", " ", " ", " "));
				isClear = true;
			}
		
		
		//if any crop was cleared, the farmer's gold will be reduced by 5
		if(isClear){
			if(f.getGold()>=5){
				f.setGold(-5);
			}
		}
		
		pDM.savePlot(pList, f.getUsername());
		fDM.saveUser(f);
		
		return isClear;
		
	}
}
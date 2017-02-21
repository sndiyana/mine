package Controller;

import DataManager.*;

import Entity.*;

/**
 * A RankController manages the farmer's rank
 */
public class RankController{
	
	private RankDataManager rankDM;
	
	/**
	* Creates a Rank Controller object
	*/
	public RankController(){
	
		rankDM= new RankDataManager();
		
	}
	
	/**
	* Retrieve the specified farmer's current rank
	* @param f user that logged in
	* @return farmer's rank
	*/
	public Rank currentRank(Farmer f){
	
        Rank rankToReturn=rankDM.retrieveRank(f.getXP());
		
		return rankToReturn;
		
	}
}
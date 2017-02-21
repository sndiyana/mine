package DataManager;

import Entity.*;

import java.util.*;
import java.io.*;

public class RankDataManager{

	private final static String FILEPATH = "data/rank.csv";
	
	/**
	* Retrieve a list of different ranks
	* @return rank list
	*/
	public static ArrayList<Rank> loadRank(){
		
		Scanner sc = null;
		File rFile = null;
		
		String rankName = "";
		int XP = 0;
		int plotAmt = 0;
		
		ArrayList<Rank> rList = new ArrayList<>();
		
		try{
		
			rFile = new File(FILEPATH);
			sc = new Scanner(rFile);
			sc.useDelimiter(",|\r\n");
			
			sc.nextLine();
			
			while(sc.hasNext()){
				rankName = sc.next();
				XP = Integer.parseInt(sc.next());
				plotAmt = Integer.parseInt(sc.next());
				
				rList.add(new Rank(rankName, XP, plotAmt));
			}
			
		} catch (FileNotFoundException e){
			return null;
		}
		
		return rList;
	}
	
	/**
	* Retrieve the rank for the specified xp
	* @param XP the value to check
	* @return the rank associated with the xp amount
	*/
	public Rank retrieveRank(int XP){
	
		Rank rankToReturn = null;
		ArrayList<Rank> rankList =loadRank();
		
		for(Rank r : rankList){
			if (XP>=r.getXP()){
				rankToReturn = r;
			}
		}
		
		return rankToReturn;
	}

}

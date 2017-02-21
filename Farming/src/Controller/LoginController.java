package Controller;

import DataManager.*;

import Entity.*;
import java.util.*;

/**
 * A LoginController manages user login to the app
 */
public class LoginController{

	private FarmerDataManager farmerDM;
	private ArrayList<Farmer> fList;
	
	/**
	* Creates a Login Controller object
	*/
	public LoginController(){
	
		farmerDM = new FarmerDataManager();
		
	}
	
	/**
	* Verify if the username specified is already existing
	* @param username the username requested
	* @param password the password user requested
	* @return if the account exists
	*/
	
	public Farmer verifyAccount(String username, String password){
		
		fList = farmerDM.retrieveAll();
		Farmer farmer = null;
		for (Farmer f : fList){
			if (f.getUsername().equals(username) && f.getPassword().equals(password)){
				farmer=f;
			}
		}
		return farmer;
	}
}
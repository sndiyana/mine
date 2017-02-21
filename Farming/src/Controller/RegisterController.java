package Controller;

import DataManager.*;

import java.util.*;

/**
 * A RegisterController manages a user request to create a new farmer
 */
public class RegisterController{
	
	private FarmerDataManager farmerDM;
	
	/**
	* Creates a Register Controller object
	*/
	public RegisterController(){
	
		farmerDM = new FarmerDataManager();
		
	}
	
	/**
	* Verifies if username is available
	* @param username username requested
	* @return if username is available
	*/
	public boolean checkAvailable(String username){
	
		if(farmerDM.retrieveFarmer(username)== null){
			return false;
		}
		
		return true;
		
	}
	
	/**
	* Creates a new farmer with the specified values
	* @param username new farmer will be created with this username
	* @param fullName the full name of the new farmer
	* @param password the password of the new farmer
	*/
	public void addFarmer(String username, String fullName, String password){
	
		farmerDM.add(username,fullName,password);
		
	}
}
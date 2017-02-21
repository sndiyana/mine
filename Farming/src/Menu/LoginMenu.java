package Menu;

import DataManager.*;
import Entity.*;
import Controller.*;

import java.util.*;

/**
 * A LoginMenu for user to login
 */
public class LoginMenu{

	private MainMenu mainMenu;
	private LoginController loginCtrl;
	
	/**
	* Creates a Login Menu
	*/
	public LoginMenu(){
	
		mainMenu=new MainMenu();
		loginCtrl = new LoginController();
		
	}
	
	/**
	* Display login menu
	*/
	public void display(){
		
		Scanner sc = new Scanner(System.in);
		String usernameInput = null;
		String passwordInput = null;
		Farmer farmer = null;
		
		do {
		
			System.out.print("Enter your username > ");
			usernameInput = sc.nextLine();
			
			if(usernameInput.length() == 0 ) {
			
				System.out.println("\nUsername field has been left empty. Please enter your username");
				
			}
			
			System.out.print("\nEnter your password > ");
			passwordInput = sc.nextLine();
			
			if(passwordInput.length() == 0 ) {
			
				System.out.println("\nPassword field has been left empty. Please enter your password");
				
			}
			
		} while(usernameInput.length() == 0 || passwordInput.length() == 0);
		
		Farmer f = loginCtrl.verifyAccount(usernameInput,passwordInput);
		if(f==null){
			System.out.println("Login failed! Please check your username and password.\n");
		}else{
			mainMenu.display(f);
		}
	}
}
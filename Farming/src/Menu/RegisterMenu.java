package Menu;

import Controller.*;

import java.util.*;

/**
 * A RegisterMenu for new users to register
 */
public class RegisterMenu{

	private RegisterController registerCtrl;
	
	/**
	* Creates a Register Menu
	*/
	public RegisterMenu(){
	
		registerCtrl = new RegisterController();
		
	}
	
	/**
	* Display register menu
	*/
	public void display(){
	
		int choice = 0;
		Scanner sc = new Scanner(System.in);
		boolean registerSuccess = true;
		String username = "";
		String fullName = "";
		String password = "";
		String confirmPw = "";
		
		
		System.out.println("== Farm City :: Registration ==");
		
		//user enter username
		do {
		
			System.out.print("Enter your username > ");
			username = sc.nextLine();
			
			if(username.length() == 0) {
				
				System.out.println("Please enter a username\n");
				
			}
		
		} while (username.length() == 0);
    
		//Verify if username is 'free' to use
		while(registerCtrl.checkAvailable(username) || !username.matches("[a-zA-Z0-9]*") || username.length() ==0){
		
		  if (registerCtrl.checkAvailable(username)){
		  
			System.out.print("\nUsername is in use. Please choose another > ");
			username = sc.nextLine();
			
		  } else if (!username.matches("[a-zA-Z0-9]*") || username.length() ==0){
		  
			System.out.println("Username should only contain alphanumeric characters. \n");
			username = null;
			
			do {
			
				System.out.print("\nPlease choose another > ");
				username = sc.nextLine();
				
				if(username.length() == 0) {
				
				System.out.println("\nPlease enter an alternative username");
				
				}
				
			} while(username.length() == 0);
			
		  } 
		  
		}
		
		do {
		
			System.out.print("\nEnter your Full name > ");
			fullName = sc.nextLine();
			
			if(fullName.length() == 0) {
				
				System.out.println("\nPlease enter your full name");
				
			}
		
		} while(fullName.length() == 0);
		
		String test = fullName.trim();
			
			//verify if name contains only alphanumeric
			while(!fullName.matches("[a-zA-Z ]*") ||test.length() ==0){
			
				System.out.println("Please enter a proper full name. \n");
				
				do {
				
					System.out.print("\nEnter your Full name > ");
					fullName = sc.nextLine();
					
					if(fullName.length() == 0) {
				
						System.out.println("\nName should consists of letters only. Please enter your full name again.");
				
					}	
					
				} while(fullName.length() == 0)	;
				
				test = fullName.trim();
				
			}

		do{  
		
		  System.out.print("\nEnter your password > ");
		  password = sc.nextLine();
		  test = password.trim();
		  
		  while( test.length() ==0){
		  
			System.out.println("Your password cannot be empty. \n");
			System.out.print("\nPlease enter a different password > ");
			password = sc.nextLine();
			test = password.trim();
			
		  }
		  
		  System.out.print("\nConfirm your password > ");
		  confirmPw = sc.nextLine();
		
		  while( confirmPw.length() ==0){
		  
			System.out.println("Your confirmed password cannot be empty. \n");
			System.out.print("\nPlease enter your confirmed password > ");
			confirmPw = sc.nextLine();
			
		  }
		
      if(confirmPw.equals(password)){
	  
        break;
		
      } else{
	  
        System.out.println("Passwords do not match! Please try again. \n");
		registerSuccess = false;
		
      }
	  
    } while(!registerSuccess);
		System.out.println();
		
		registerCtrl.addFarmer(username,fullName,password);
		System.out.println("Hi, " + username + "! Your account is successfully created!\n");
		System.out.println();
	}
}
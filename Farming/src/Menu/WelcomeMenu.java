package Menu;

import java.util.*;

public class WelcomeMenu {
	
	private RegisterMenu registerMenu;
	private LoginMenu loginMenu;
	
	/**
	* Creates a Welcome Menu
	*/
	public WelcomeMenu(){
		
		registerMenu = new RegisterMenu();
		loginMenu = new LoginMenu();
	}
	
	/**
	* Display welcome menu
	*/
	public void display(){
		
		Scanner sc = new Scanner(System.in);
		int choice = 0;
		
		do{
		
			System.out.println("== Farm City :: Welcome ==");
			System.out.println("Hi,");
			System.out.println("1. Register");
			System.out.println("2. Login");
			System.out.println("3. Exit");
			System.out.print("Enter your choice > ");
			
			try{	
			
				choice = sc.nextInt();
				sc.nextLine();
				System.out.println();
				
				switch (choice){
				case 1:
					registerMenu.display();
					break;
				case 2:
					loginMenu.display();
					break;
				case 3:
					break;
				default:
					System.out.println("Please enter a valid integer value from 1 to 3");
					break;
				}
				
			}catch(Exception e){
				System.out.println("Invalid input! Please enter number [1], [2] or [3]");
				sc.nextLine();
			}
			
		}while(choice != 3);
	}
}
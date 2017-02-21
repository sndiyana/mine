package Entity;

/**
 * A Inventory represents a farmer's Inventory with the crop name and amount
 */
public class Inventory{
	
	private int amount;
	private String cropName;
	
	/**
	* Creates a Inventory object with the specified amount and cropName
	* @param amount the quantity of the crop
	* @param cropName the name of the crop
	*/
	public Inventory(int amount, String cropName){
		
		this.amount = amount;
		this.cropName = cropName;
	
	}
	
	/**
	* Gets quantity of the crop available in inventory
	* @return quantity of crop available
	*/
	public int getAmount(){
	
		return amount;
	
	}
	
	/**
	* Gets the crop name
	* @return crop name
	*/
	public String getCropName(){
	
		return cropName;
	
	}
	
	/**
	* Updates the quantity available with the specified value
	* @param x amount will be updated by x value
	*/
	public void setAmount(int x){
	
		amount += x;
	
	}
}
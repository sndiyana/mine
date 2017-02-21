package Entity;

/**
 * A Crop represents a crop with a name, cost, time, XP, the minYield, maxYield and price
 */
public class Crop{
	
	private String name;
	private int cost;
	private int time;
	private int XP;
	private int minYield;
	private int maxYield;
	private int price;
	
	/**
	* Creates a Crop object with the specified name, cost, XP, minYield, maxYield and price
	* @param name the crop name
	* @param cost the amt of gold gained
	* @param time the time taken to grow the crop
	* @param XP the amount of XP gained from this crop
	* @param minYield the minYield of growing the crop
	* @param maxYield the maxYield of growing the crop
	* @param price the cost of the crop
	*/
	public Crop(String name, int cost, int time, int XP, int minYield, int maxYield, int price){
		
		this.name = name;
		this.cost = cost;
		this.time = time;
		this.XP = XP;
		this.minYield = minYield;
		this.maxYield = maxYield;
		this.price = price;
		
	}
	
	/**
	* Gets the name of the crop
	* @return the name of the crop
	*/
	public String getName(){
	
		return name;
	
	}
	
	/**
	* Gets the gold gained from the crop
	* @return the gold gained from the crop
	*/
	public int getCost(){
	
		return cost;
	
	}
	
	/**
	* Gets the time taken to grow the crop
	* @return the duration of growing the crop
	*/
	public int getTime(){
		
		return time;
	
	}
	
	/**
	* Gets the XP gained from growing the crop
	* @return the XP gained from growing the crop
	*/
	public int getXP(){
		
		return XP;
	
	}
	
	/**
	* Gets the least amount of yield from growing the crop
	* @return the min yield
	*/
	public int getMinYield(){
	
		return minYield;
	
	}
	
	/**
	* Gets the most amount of yield from growing the crop
	* @return the max yield
	*/
	public int getMaxYield(){
	
		return maxYield;
	
	}
	
	/**
	* Gets the price of purchasing the crop
	* @return the price of crop
	*/
	public int getPrice(){
	
		return price;
	
	}
}
package Entity;

/**
 * A HarvestedItem represents a harvested crop with a name, units harvested, XP and Gold gained
 */
public class HarvestedItem{
	
	private String cropName;
	private int unit;
	private int XP;
	private int gold;
	
	/**
	* Creates a HarvestedItem object with the specified name, unit, XP, gold
	* @param cropName the crop that has harvested
	* @param unit the amount of crop grown
	* @param XP the number of xp gained
	* @param gold the amount of gold gained
	*/
	public HarvestedItem(String cropName, int unit, int XP, int gold){
		
		this.cropName = cropName;
		this.unit = unit;
		this.XP = XP;
		this.gold = gold;
	
	}
	
	/**
	* Gets the name of the harvested crop
	* @return cropName the name of crop
	*/
	public String getName(){
	
		return cropName;
	
	}
	
	/**
	* Gets the amount of crop grown
	* @return the amount of crop grown
	*/
	public int getUnit() {
	
		return unit;
	
	}
	
	/**
	* Gets the XP gained from growing this crop
	* @return XP gained
	*/
	public int getXP(){
	
		return XP;
	
	}
	
	/**
	* Gets the amount of gold gained from growing this crop
	* @return amount of gold gained
	*/
	public int getGold(){
	
		return gold;
	
	}
	
	/**
	* Sets the amount of crop grown with the specified value
	* @param u unit
	*/
	public void setUnit(int u){
	
		unit +=  u;
	
	}
	
	/**
	* Sets the XP of the crop with the specified value
	* @param xp crop xp
	*/
	public void setXP(int xp){
	
		XP += xp;
	
	}
	
	/**
	* Sets the gold gained with the specified value
	* @param g gold
	*/
	public void setGold(int g){
	
		gold += g;
	
	}
}
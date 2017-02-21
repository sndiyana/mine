package Entity;

/**
 * A Farmer represents a farmer with username, full name, password, XP, gold and rank
 */
public class Farmer {
	
	private String username;
	private String fullName;
	private String password;
	private int XP;
	private int gold;
	private Rank rank;
	
	/**
	* Creates a Farmer object with the specified username, fullName, password with default xp and gold values
	* @param username the farmer's username
	* @param fullName the farmer's fullName
	* @param password the farmer's password
	*/
	public Farmer(String username, String fullName, String password){
		
		this.username = username;
		this.fullName = fullName;
		this.password = password;
		XP = 0;
		gold = 1000;
	}
	
	/**
	* Creates a Farmer object with the specified username, fullName, password, xp, gold
	* @param username the farmer's username
	* @param fullName the farmer's fullName
	* @param password the farmer's password
	* @param XP the farmer's initial xp
	* @param gold the farmer's initial gold
	*/
	public Farmer(String username, String fullName, String password, int XP, int gold){
		
		this.username = username;
		this.fullName = fullName;
		this.password = password;
		this.XP = XP;
		this.gold = gold;
	
	}
	
	/**
	* Gets the farmer's username
	* @return farmer username
	*/
	public String getUsername(){
	
		return username;
	}
	
	/**
	* Gets the farmer's full name
	* @return farmer full name
	*/
	public String getFullName(){
	
		return fullName;
	}
	
	/**
	* Gets the farmer's password
	* @return farmer password
	*/
	public String getPassword(){
	
		return password;
	}
	
	/**
	* Gets the farmer's rank name
	* @return farmer rank name
	*/
	public String getRankName(){
	
		return rank.getRankName();
	}
	
	
	/**
	* Gets the farmer's rank
	* @return farmer rank
	*/
	public Rank getRank(){
	
		return rank;
	
	}
	
	/**
	* Gets the farmer's XP value
	* @return farmer current XP
	*/
	public int getXP(){
	
		return XP;
	
	}
	
	/**
	* Gets the farmer's amount of gold
	* @return farmer current gold
	*/
	public int getGold(){
	
		return gold;
	
	}
	
	/**
	* Update the farmer's XP with the specified value
	* @param x the specified value will be added to farmer's XP
	*/
	public void setXP(int x){
	
		XP += x;
	
	}
	
	/**
	* Update the farmer's gold with the specified value
	* @param g the specified value will be added to farmer's gold
	*/
	public void setGold(int g){
	
		gold += g;
	
	}
	
	/**
	* Update the farmer's rank with the specified rank
	* @param rank the farmer's rank will be updated
	*/
	public void setRank(Rank rank){
	
		this.rank= rank;
	
	}
}
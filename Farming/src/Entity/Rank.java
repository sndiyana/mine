package Entity;

/**
 * A Rank represents a rank with a name, XP and number of plots
 */
public class Rank {
	
	private String rankName;
	private int XP;
	private int plotAmt;
	
	/**
	* Creates a Rank object with the specified name, XP and plot amount
	* @param rankName the rank name
	* @param XP xp assigned to the rank
	* @param plotAmt the number of plots assigned to the rank
	*/
	public Rank(String rankName, int XP, int plotAmt){
	
		this.rankName = rankName;
		this.XP = XP;
		this.plotAmt = plotAmt;
	
	}
	
	/**
	* Gets the name of the rank.
	* @return the name of the rank
	*/
	public String getRankName(){
	
		return rankName;
	
	}
	
	/**
	* Gets the XP of this rank.
	* @return the XP of the rank
	*/
	public int getXP(){
	
		return XP;
	
	}
	
	/**
	* Gets the plot amount assigned to rank.
	* @return the plot amount
	*/
	public int getPlotAmt(){
	
		return plotAmt;
	}
}
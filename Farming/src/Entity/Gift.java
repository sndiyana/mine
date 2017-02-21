package Entity;

import java.util.*;

/**
 * A Gift represents a farmer's gift to a friend with their name, date sent and the crop name
 */
public class Gift {

	private String friendName;
	private Date date;
	private String cropName;
	
	/**
	* Creates a Gift object with the specified friendName, date, cropName
	* @param friendName the username of the friend that receives the gift
	* @param date the date the gift is send
	* @param cropName the crop sent
	*/
	public Gift(String friendName, Date date, String cropName) {
	
		this.friendName =  friendName;
		this.date = date;
		this.cropName = cropName;
	
	}
	
	/**
	* Gets the username of the friend that will receive the gift
	* @return username
	*/
	public String getFriendName() {
	
		return friendName;
	
	}
	
	/**
	* Gets the date that the gift was sent
	* @return date
	*/
	public Date getDate() {
	
		return date;
	
	}
	
	/**
	* Gets the crop sent
	* @return cropName
	*/
	public String getCropName() {
	
		return cropName;
	
	}
	
	/**
	* Sets the date that the gift is sent
	* @param date the date sent
	*/
	public void setDate(Date date) {
	
		this.date = date;
	
	}
	
	/**
	* Sets the username of the friend that will receive the gift
	* @param friendName friend's username
	*/
	public void setFriendName(String friendName) {
	
		this.friendName = friendName;
	
	}
	
	/**
	* Sets the crop sent to friend
	* @param cropName name of the crop sent
	*/
	public void setCropName(String cropName) {
	
		this.cropName = cropName;
	
	}
}
package Entity;

/**
 * A Friend represents a farmer's friend with their name and status
 */
public class Friend {
	
	private String friendName;
	private String status;
	
	/**
	* Creates a Friend object with the specified friendName and status
	* @param friendName the friend's username
	* @param status the status of the friend
	*/
	public Friend(String friendName, String status) {
	
		this.friendName = friendName;
		this.status = status;
	
	}
	
	/**
	* Gets the username of the friend
	* @return username
	*/
	public String getFriendName() {
	
		return friendName;
	
	}
	
	/**
	* Gets the status of the friend.
	* Friends = confirmed friends, pending = friend request has been sent but has not been accepted, request = request received from other farmers
	* @return status
	*/
	public String getStatus() {
	
		return status;
	
	}
	
	/**
	* Set the username of friend with the specified value
	* @param friendName friend username will be updated
	*/
	public void setFriendName(String friendName) {
	
		this.friendName = friendName;
	
	}
	
	/**
	* Update the status of the friend with the specified value
	* @param status update status
	*/
	public void setStatus(String status) {
	
		this.status = status;
	
	}
}
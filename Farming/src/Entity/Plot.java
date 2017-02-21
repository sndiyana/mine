package Entity;

/**
 * A Plot represents a farmer's plot with the name of the crop, the status, percentage growth and the date planted
 */
public class Plot{
	
	private String cropName;
	private String status;
	private String percentage;
	private String plantDate;
	
	/**
	* Creates a Plot object with no constructors
	*/
	public Plot(){
	
		cropName = "<empty>";
		status = " ";
		percentage = " ";
		plantDate = " ";
		
	}
	
	/**
	* Creates a Plot object with the specified cropName, status, percentage, plantDate
	* @param cropName the crop grown
	* @param status displays the status of the cropName
	* @param percentage displays the crop growing rate
	* @param plantDate the date the crop was planted
	*/
	public Plot(String cropName, String status, String percentage, String plantDate){
	
		this.cropName = cropName;
		this.status = status;
		this.percentage = percentage;
		this.plantDate =  plantDate;
		
	}
	
	/**
	* Gets the crop name
	* @return name of crop
	*/
	public String getName(){
	
		return cropName;
	
	}
	
	/**
	* Gets the plot status
	* @return status
	*/
	public String getStatus(){
	
		return status;
	
	}
	
	/**
	* Gets the crop's growing rate 
	* @return percentage
	*/
	public String getPercentage(){
	
		return percentage;
	
	}
	
	/**
	* Gets the date that the plant was planted
	* @return date planted
	*/
	public String getPlantDate(){
	
		return plantDate;
	
	}
	
	/**
	* Sets the name of crop that will be planted
	* @param newName the crop specified will be planted at the plot chosen
	*/
	public void setName(String newName){
	
		cropName = newName;
	
	}
	
	/**
	* Sets the status of the plot by the specified value
	* @param percent the status of the crop planted at the plot chosen
	*/
	public void setStatus(int percent){
	
		int range = percent / 10;
		status = "[";
		
		for (int i = 0; i < range; i++){
			status += "#";
		}
		
		for (int j = 0; j < 10 - range; j++) {
			status += "-";
		}
		status += "]";
	
	}
	
	/**
	* Sets the status as wilted if crop was not harvested 
	*/
	public void setWilted(){
	
		status = "[  wilted  ]";
		percentage="";
	
	}
	
	/**
	* Sets the percentage of the crop growing rate
	* @param percent the growing rate
	*/
	public void setPercentage(int percent){
	
		percentage = "" + percent + "%";
	
	}

	/**
	* Sets the date the crop was planted with the specified date
	* @param plantDate the date the crop was planted
	*/
	public void setPlantDate(String plantDate){
	
		this.plantDate = plantDate;
	
	}
}
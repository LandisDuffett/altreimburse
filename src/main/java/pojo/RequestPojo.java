package pojo;

public class RequestPojo {

	private int requestId;
	private int userId;
	private double requestAmount;
	private String requestDescription;
	private String requestStatus;
	private String requestImageURL;
	private String requestTime;
	private String resolvedTime;
	
	public RequestPojo() {
		super();
}
	public RequestPojo(int requestId, int userId, double requestAmount, String requestDescription, String requestStatus, String requestImageURL, String requestTime, 
			String resolvedTime) {
		super();
		this.requestId = requestId;
		this.userId = userId;
		this.requestStatus = requestStatus;
		this.requestTime = requestTime;
		this.resolvedTime = resolvedTime;
		this.requestAmount = requestAmount;
		this.requestDescription = requestDescription;
		this.requestImageURL = requestImageURL;
	}
	/**
	 * @return the requestId
	 */
	public int getRequestId() {
		return requestId;
	}
	/**
	 * @param requestId the requestId to set
	 */
	public void setRequestId(int requestId) {
		this.requestId = requestId;
	}
	/**
	 * @return the userId
	 */
	public int getUserId() {
		return userId;
	}
	/**
	 * @param userId the userId to set
	 */
	public void setUserId(int userId) {
		this.userId = userId;
	}
	/**
	 * @return the requestStatus
	 */
	public String getRequestStatus() {
		return requestStatus;
	}
	/**
	 * @param requestStatus the requestStatus to set
	 */
	public void setRequestStatus(String requestStatus) {
		this.requestStatus = requestStatus;
	}
	/**
	 * @return the requestTime
	 */
	public String getRequestTime() {
		return requestTime;
	}
	/**
	 * @param requestTime the requestTime to set
	 */
	public void setRequestTime(String requestTime) {
		this.requestTime = requestTime;
	}
	/**
	 * @return the resolvedTime
	 */
	public String getResolvedTime() {
		return resolvedTime;
	}
	/**
	 * @param resolvedTime the resolvedTime to set
	 */
	public void setResolvedTime(String resolvedTime) {
		this.resolvedTime = resolvedTime;
	}
	/**
	 * @return the requestAmount
	 */
	public double getRequestAmount() {
		return requestAmount;
	}
	/**
	 * @param requestAmount the requestAmount to set
	 */
	public void setRequestAmount(double requestAmount) {
		this.requestAmount = requestAmount;
	}
	/**
	 * @return the requestDescription
	 */
	public String getRequestDescription() {
		return requestDescription;
	}
	/**
	 * @param requestDescription the requestDescription to set
	 */
	public void setRequestDescription(String requestDescription) {
		this.requestDescription = requestDescription;
	}
	/**
	 * @return the requestImageURL
	 */
	public String getRequestImageURL() {
		return requestImageURL;
	}
	/**
	 * @param requestImageURL the requestImageURL to set
	 */
	public void setRequestImageURL(String requestImageURL) {
		this.requestImageURL = requestImageURL;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((requestStatus == null) ? 0 : requestStatus.hashCode());
		result = prime * result + requestId;
		result = prime * result + ((requestTime == null) ? 0 : requestTime.hashCode());
		result = prime * result + ((resolvedTime == null) ? 0 : resolvedTime.hashCode());
		result = prime * result + ((requestDescription == null) ? 0 : requestDescription.hashCode());
		result = prime * result + ((requestImageURL == null) ? 0 : requestImageURL.hashCode());
		result = prime * result + userId;
		result = prime * result + (int)requestAmount;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		RequestPojo other = (RequestPojo) obj;
		if (requestStatus == null) {
			if (other.requestStatus != null)
				return false;
		} else if (!requestStatus.equals(other.requestStatus))
			return false;
		if (requestAmount != other.requestAmount)
			return false;
		if (resolvedTime == null) {
			if (other.resolvedTime != null)
				return false;
		} else if (!resolvedTime.equals(other.resolvedTime))
			return false;
		if (requestTime == null) {
			if (other.requestTime != null)
				return false;
		} else if (!requestTime.equals(other.requestTime))
			return false;
		if (requestDescription == null) {
			if (other.requestDescription != null)
				return false;
		} else if (!requestDescription.equals(other.requestDescription))
			return false;
		if (requestImageURL == null) {
			if (other.requestImageURL != null)
				return false;
		} else if (!requestImageURL.equals(other.requestImageURL))
			return false;
		if (requestId != other.requestId)
			return false;
		if (userId != other.userId)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "RequestPojo [requestId=" + requestId + "userId=" + userId + ", requestDescription=" + requestDescription + ", requestImageURL=" + requestImageURL + ", requestTime="
				+ requestTime + ", requestAmount=" + requestAmount + ", requestStatus=" + requestStatus + ", resolvedTime=" + resolvedTime + "]";
	}
	
}

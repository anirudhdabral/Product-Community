package com.productcommunity.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
	@Id
	@Column(length = 30)
	private String userEmail;

	@Column(length = 30)
	private String password;

	@Column(length = 30)
	private String firstName;

	@Column(length = 30)
	private String lastName;

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(String userEmail, String password, String firstName, String lastName) {
		super();
		this.userEmail = userEmail;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}

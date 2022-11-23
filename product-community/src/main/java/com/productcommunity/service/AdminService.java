package com.productcommunity.service;

import java.util.List;

import com.productcommunity.model.Admin;

public interface AdminService {
	public List<Admin> getAllAdmin();
	public Admin adminLogin(int adminId, String password);
}

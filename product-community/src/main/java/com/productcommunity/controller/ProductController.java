package com.productcommunity.controller;

import java.io.IOException;
import java.sql.Blob;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.productcommunity.model.Product;
import com.productcommunity.service.ProductService;

@RestController
@RequestMapping("/product")
@CrossOrigin
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@GetMapping("/getProducts")
	public List<Product> getProducts() {
		return productService.getProducts();
	}
	
	@GetMapping("/search/{type}/{query}")
	public List<Product> searchProducts(@PathVariable String type,@PathVariable String query) {
		return productService.searchProducts(type,query);
	}
	
	@GetMapping("/{productCode}")
	public Product getProduct(@PathVariable String productCode) {
		System.out.println(productService.getProduct(productCode));
		return productService.getProduct(productCode);
	}
	
	@PostMapping("/addProduct")
	public Product saveProduct(@RequestBody Product product) {
		return productService.saveProduct(product);
	}
	
	@PutMapping("/addImage/{productCode}")
	public void uplaodImage(MultipartFile file) throws IOException {
		System.out.println("Original Image Byte Size - " + file.getBytes().length);
//		ImageModel img = new ImageModel(file.getOriginalFilename(), file.getContentType(),
//				compressBytes(file.getBytes()));
//		imageModelRepo.save(img);
//		return ResponseEntity.status(HttpStatus.OK);
	}
	
	public void addImage(@PathVariable String productCode, @RequestBody Blob image) {
		
	}
	
	
}
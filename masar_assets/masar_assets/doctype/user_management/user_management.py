# Copyright (c) 2024, KCSC and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class UserManagement(Document):
	def on_submit(self):
		if self.is_exist_user == 1:
			self.update_user_data()
		elif self.is_exist_user == 0 :
			self.create_new_user()
	
	
	@frappe.whitelist(allow_guest=True)
	def update_user_data(self):
		user_doc = frappe.get_doc('User' , self.link_user)
		if self.has_role_profile == 1:
			if self.role_profile:
				user_doc.role_profile_name = self.role_profile
		elif self.has_role_profile == 0 : 
			user_role = frappe.db.sql("SELECT role FROM `tabUser Management Details` WHERE Parent = %s" , (self.name) , as_dict = True)
			if user_role and user_role[0]:
				for role in user_role:
					user_doc.append('roles' , {
						"doctype" : "Has Role" , 
						"role" : role.role
					})
		user_doc.enabled = self.is_enable 
		user_doc.save(ignore_permissions=True)
		frappe.db.commit()

	@frappe.whitelist(allow_guest=True)
	def create_new_user(self):
		allowed_module = [ 'Masar Assets']
		core_role = ['JKB Admin' , 'JKB User Management-Maker' , 'JKB User Management-Checker']
		user_doc = frappe.new_doc('User')
		user_doc.email = self.user_email
		user_doc.first_name = self.first_name
		user_doc.last_name = self.last_name
		if self.has_role_profile == 1: #
			user_doc.role_profile_name = self.role_profile
			role_profile_roles = frappe.db.sql("""
				SELECT thr.`role` FROM `tabRole Profile` trp 
				INNER JOIN `tabHas Role` thr ON trp.name = thr.parent AND thr.parenttype  = 'Role Profile'
				WHERE trp.name = %s
				""" , (self.role_profile) , as_dict = True )
			if role_profile_roles and role_profile_roles[0]:
				for role in role_profile_roles:
					profile_role = role.role
					if profile_role in core_role:
						allowed_module.append('Core')
		elif self.has_role_profile == 0 : 
			user_role = frappe.db.sql("SELECT role FROM `tabUser Management Details` WHERE Parent = %s" , (self.name) , as_dict = True)
			for role in user_role:
				user_doc.append('roles' , {
					"doctype" : "Has Role" , 
					"role" : role.role
				})
			if role in core_role:
				allowed_module.append('Core')
		
		user_doc.block_modules = []
		all_modules = frappe.get_all('Module Def', fields=['module_name'])
		for module in all_modules:
			if module.module_name not in allowed_module:
				user_doc.append('block_modules' , {
					"doctype" : "Block Module" , 
					"module" : module.module_name,
					"is_blocked" : 0 
				})
		user_doc.enabled = self.is_enable 
		user_doc.save(ignore_permissions=True)
		frappe.db.commit()



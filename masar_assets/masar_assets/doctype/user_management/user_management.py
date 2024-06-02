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
	def update_user_data(self):
		user_doc = frappe.get_doc('User' , self.link_user)
		if self.has_role_profile == 1:
			user_doc.role_profile_name = self.role_profile
		elif self.has_role_profile == 0 : 
			user_role = frappe.db.sql("SELECT role FROM `tabUser Management Details` WHERE Parent = %s" , (self.name) , as_dict = True)
			for role in user_role:
				user_doc.append('roles' , {
					"doctype" : "Has Role" , 
					"role" : role.role
				})
		user_doc.enabled = self.is_enable 
		user_doc.save(ignore_permissions=True)
		frappe.db.commit()
	def create_new_user(self):
		user_doc = frappe.new_doc('User')
		user_doc.email = self.user_email
		user_doc.first_name = self.first_name
		user_doc.last_name = self.last_name
		user_doc.save()
		if self.has_role_profile == 1:
			user_doc.role_profile_name = self.role_profile
		elif self.has_role_profile == 0 : 
			user_role = frappe.db.sql("SELECT role FROM `tabUser Management Details` WHERE Parent = %s" , (self.name) , as_dict = True)
			for role in user_role:
				user_doc.append('roles' , {
					"doctype" : "Has Role" , 
					"role" : role.role
				})
		user_doc.enabled = self.is_enable 
		user_doc.save(ignore_permissions=True)
		frappe.db.commit()



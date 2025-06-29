# Copyright (c) 2024, KCSC and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class AssetQRPrint(Document):
	def validate(self):
		self.validate_date_range()
		self.asset_filters()
  
	def validate_date_range(self):
		if self.from_date and self.to_date and self.to_date < self.from_date:
			frappe.throw("The 'To Date' cannot be earlier than the 'From Date'.")
	
	def asset_filters(self):
		if not self.asset_name and not self.filtered_assets_table:
			self.filtered_assets_table = []
		asset_name_filter = self.asset_name
		location_filter = self.location
		item_code_filter = self.item_code
		asset_category_filter = self.asset_category
		from_date_filter = self.from_date
		to_date_filter = self.to_date
		from_barcode = self.from_barcode
		to_barcode = self.to_barcode

		conditions = ''
		if asset_name_filter:
			conditions +=f" AND name = '{asset_name_filter}'"
		if location_filter:
			conditions += f" AND location = '{location_filter}'"
		if item_code_filter:
			conditions += f" AND item_code = '{item_code_filter}'"
		if asset_category_filter:
			conditions += f" AND asset_category = '{asset_category_filter}'"
		if from_date_filter and to_date_filter:
			conditions += f" AND modified BETWEEN '{from_date_filter}' AND '{to_date_filter}'"
		if from_barcode and to_barcode:
			conditions += f" AND name BETWEEN '{from_barcode}' AND '{to_barcode}'"
   
		if not conditions:
			return

		asset_data = frappe.db.sql(f""" 
							SELECT name, asset_name, custom_qr_code_text
							FROM `tabAsset`
							WHERE 1=1 {conditions} AND docstatus = 1
										""", as_dict = True)
		if asset_data and asset_data[0]:
			for data in asset_data:
				filtered_asset_code = data.name
				filtered_asset_name = data.asset_name
				filtered_qr_code_text = data.custom_qr_code_text
				self.append('filtered_assets_table', {
					"asset_code" : str(filtered_asset_code),
					"asset_name" : str(filtered_asset_name),
					"custom_qr_code_text" : str(filtered_qr_code_text),
				})
			frappe.db.commit()
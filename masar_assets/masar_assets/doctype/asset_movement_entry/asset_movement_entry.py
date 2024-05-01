# Copyright (c) 2024, KCSC and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class AssetMovementEntry(Document):
	def on_submit(self):
		self.create_asset_movement()
	@frappe.whitelist()
	def get_asset(self):
		cond  = "1=1 "
		if self.status:
			cond += f" AND tact.status = '{self.status}'"
		if self.location:
			cond += f" AND tact.current_location = '{self.location}'"
		if self.asset_counts:
			cond += f" AND tac.name ='{self.asset_counts}' "
		frappe.db.delete('Asset Movement Entry Detail',{'parent':self.name})
		results = frappe.db.sql(f"""
			SELECT *			
			FROM 
				`tabAsset Counts` tac
			INNER JOIN `tabAsset Count Table` tact on tac.name = tact.parent
			WHERE 
				{cond}
			""" , as_dict = True)
		for result in results:
			row = self.append('items', {})
			row.asset_id = result.asset_id
			row.asset_name = result.asset_name
			row.item_code = result.item_code
			row.current_location = result.current_location
			row.register_location = result.register_location
			row.status = result.status
			row.insert()
		self.num_of_asset = len(results)
		return 'done'
	
	def create_asset_movement(self):
		assets = frappe.db.sql("""
				SELECT tamed.asset_id , tamed.asset_name , tamed.target_location, tamed.register_location
				FROM `tabAsset Movement Entry` tame
				INNER JOIN `tabAsset Movement Entry Detail` tamed on tame.name = tamed.parent
				WHERE tame.name = %s""", (self.name), as_dict = True)
		for asset in assets:
			if asset.target_location:
				target_location = asset.target_location
			else:
				target_location = self.target_location
			new_movement = frappe.new_doc('Asset Movement')
			new_movement.company = self.company
			new_movement.purpose = 'Transfer'
			child_entry = { 
				'company': self.company , 
				'asset' : asset.asset_id , 
				'asset_name' : asset.asset_name, 
				'source_location': asset.register_location,
				'target_location' : target_location
			}
			new_movement.append('assets', child_entry)
			new_movement.reference_doctype = 'Asset Movement Entry'
			new_movement.reference_name = self.name
			new_movement.insert(ignore_permissions =True)



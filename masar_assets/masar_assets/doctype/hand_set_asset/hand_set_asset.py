# Copyright (c) 2025, KCSC and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import copy


class HandSetAsset(Document):
	def validate(self):
		if frappe.session.user != 'Administrator':
			frappe.throw("You are not allowed to edit this document. Please contact the Administrator.")
		else:
			main_locations , sub_locations, assets = execute(self, 'validate')
			self.main_locations = main_locations
			self.sub_locations = sub_locations
			self.assets = assets
 
 
 
 
def execute(self , method):
    dict_ml, count_ml , main_locations = main_location()
    location_dict , sub_locations = sub_location(dict_ml, count_ml)
    assets = assets_data(location_dict)
    return main_locations , sub_locations, assets

def main_location():
    msg = ''
    dict_ml = {}
    sql = frappe.db.sql("SELECT name FROM tabLocation WHERE parent_location IS NULL", as_dict=True)
    count_ml = 1
    for ml in sql:
        dict_ml[ml.name] = count_ml
        count_ml += 1
    for name, id in dict_ml.items():
        if any('\u0600' <= char <= '\u06FF' for char in name):
            name = f"\u200F{name}\u200F"
        msg += f"{id},{name}<br>"
    
    return dict_ml, count_ml , msg

def sub_location(dict_ml, count_ml):
    msg = ''
    location_dict = copy.deepcopy(dict_ml)
    for location, id in dict_ml.items():
        msg, count_ml  , location_dict = sub_location_2(location, id, count_ml, msg , location_dict)
    return location_dict , msg

def sub_location_2(location, id, count_ml, msg , location_dict):
    sub_loc = frappe.db.sql(
        "SELECT name, is_group FROM tabLocation WHERE parent_location = %s", (location), as_dict=True
    )
    if len(sub_loc) != 0:
        for sub in sub_loc:
            if sub.name == "AM-Head Office":
                msg += f"{id},{sub.name},{count_ml}<br>"
                location_dict[sub.name] = count_ml
                count_ml += 1
                
                msg, count_ml  , location_dict= sub_location_2(sub.name, count_ml - 1, count_ml, msg , location_dict)
            else:
                msg += f"{id},{sub.name},{count_ml}<br>"
                location_dict[sub.name] = count_ml
                count_ml += 1
                if sub.is_group:
                    msg, count_ml  , location_dict= sub_location_2(sub.name, id, count_ml, msg , location_dict)
    return msg, count_ml , location_dict


def assets_data(location_dict): 
    assets = frappe.db.sql("SELECT name , asset_name , location FROM tabAsset" , as_dict=True)
    msg = ''
    cc = 1 
    for a in assets:
        loc_str = str()
        location = a.location
        r = 0 
        while location: 
            if r == 2:
                break
            r+=1 
            doc = frappe.get_doc('Location' , location)
            loc_str = f"{location},{loc_str}"
            if doc.parent_location: 
                location = doc.parent_location
            else:
                break   
        location_id = str()
        loc_list = loc_str.split(',')
        for i in loc_list:
            if i and i in location_dict:
                location_id+=f",{location_dict[i]}"
        msg+= f"{a.name},{a.name},{a.asset_name}{location_id}<br>"
    return msg

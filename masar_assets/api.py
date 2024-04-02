from __future__ import unicode_literals
import frappe, erpnext
from frappe.utils import flt, cstr, nowdate, comma_and
from frappe import throw, msgprint, _
from frappe.custom.doctype.custom_field.custom_field import create_custom_field
import requests , json
from frappe import _
import pymysql
import math


@frappe.whitelist()
def get_qr_code(name=None):
    result = frappe.db.sql("""
        SELECT *
        FROM `tabAsset` ta
        WHERE ta.name = %s
        ORDER BY ta.creation DESC;
        """, (name), as_dict=True)
    
    return result

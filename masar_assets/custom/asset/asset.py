import frappe
import xml.etree.ElementTree as ET
from xml.etree.ElementTree import Element, SubElement, tostring 
import json
import requests
import base64
import qrcode
from io import BytesIO


def before_submit(self, method):
	generate_qr_code_py(self)

def get_qr_code(data: str) -> str:
	qr_code_bytes = get_qr_code_bytes(data, format="PNG")
	base_64_string = bytes_to_base64_string(qr_code_bytes)
	return add_file_info(base_64_string)


def add_file_info(data: str) -> str:
	"""Add info about the file type and encoding.
	
	This is required so the browser can make sense of the data."""
	return f"data:image/png;base64, {data}"


def get_qr_code_bytes(data, format: str) -> bytes:
	"""Create a QR code and return the bytes."""
	img = qrcode.make(data)

	buffered = BytesIO()
	img.save(buffered, format=format)

	return buffered.getvalue()


def bytes_to_base64_string(data: bytes) -> str:
	"""Convert bytes to a base64 encoded string."""
	return base64.b64encode(data).decode("utf-8")

# @frappe.whitelist(allow_guest=True)
# def generate_qr_code(name):
# 	qr_code = str(name)
# 	qr = get_qr_code(qr_code)
# 	return qr

@frappe.whitelist(allow_guest=True)
def generate_qr_code_py(self):
	qr_code = str(self.name)
	qr = get_qr_code(qr_code)
	self.custom_qr_code = qr
	self.custom_qr_code_text = qr

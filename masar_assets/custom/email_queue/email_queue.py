import re
import frappe
def masked_message(self, method):
    if self.message:
        message_content = str(self.message)
        masked_message = re.sub(r'\b\d{6}\b', '######', message_content)
        frappe.db.set_value('Email Queue', self.name, 'custom_masked_message', str(masked_message))
        frappe.db.commit()
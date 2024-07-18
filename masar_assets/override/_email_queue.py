import frappe
import re
from frappe.email.doctype.email_queue.email_queue import EmailQueue
# class EmailQueueOverride:
@classmethod
def new(cls, doc_data, ignore_permissions=False) -> "EmailQueue":
    data = doc_data.copy()
    if not data.get("recipients"):
        return

    recipients = data.pop("recipients")
    doc = frappe.new_doc(cls.DOCTYPE)
    doc.update(data)
    message_content = str(data.get("message", ""))
    masked_message = re.sub(r'\b\d{6}\b', '######', message_content)
    doc.custom_masked_message = masked_message
    doc.set_recipients(recipients)
    doc.insert(ignore_permissions=ignore_permissions)
    print(str(data))
    return doc



    	# 	message_content = str(data.get("message", ""))
		# masked_message = re.sub(r'\b\d{6}\b', '######', message_content)
		# # doc.update(masked_message)
		# # doc.message = masked_message
		# doc.custom_masked_message = str(data['message'])
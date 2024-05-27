import frappe

@frappe.whitelist()
def gen_hash():
    password = frappe.generate_hash(length=16)
    print_password = frappe.msgprint('Password Generated Successfully:' + str(password) + '\n' + 'Copy the Password and Set it in the Field and Save')

    return {
        'password': password,
        'print_password': print_password
    }
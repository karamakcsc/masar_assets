import frappe
import string 
import random 
@frappe.whitelist()
def gen_hash():
    uppercase = string.ascii_uppercase
    lowercase = string.ascii_lowercase
    special_chars = ''.join([char for char in string.punctuation if char not in '()'])
    numbers = string.digits
    pwd = ''
    all_characters = uppercase + lowercase + numbers + special_chars 
    for _ in range(16):
        pwd += ''.join(random.choice(all_characters))
    print_password = frappe.msgprint('Password Generated Successfully: (' + str(pwd) + ')\n' + 'Copy the Password and Set it in the Field and Save')

    return {
        'password': pwd,
        'print_password': print_password
    }
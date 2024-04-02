// frappe.pages['asset-query'].on_page_load = function(wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Asset Query',
// 		single_column: true
// 	});
// }

frappe.pages['asset-query'].on_page_load = function(wrapper) {
    new MyPage(wrapper);
}

class MyPage {
    constructor(wrapper) {
        this.page = frappe.ui.make_app_page({
            parent: wrapper,
            title: 'Asset Query',
            single_column: true
        });
        this.make();
    }

    make() {
        const body = `
            <h1>Asset ID</h1>
            <form id="asset-form">
                <label for="asset">ID:</label>
                <input type="text" id="asset" name="asset"><br><br>
            </form>
            <p>Enter the Asset ID, and the information will be displayed automatically.</p><br><br>
            <div id="result-container"></div> <!-- Container to display the result -->
        `;
        $(frappe.render_template(body, this)).appendTo(this.page.main);

        // Add event listeners for the input fields
        $("#asset").on("keypress", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                this.submitForm();
            }
        });
    }

    submitForm() {
        let asset = $("#asset").val();
    
        if (asset) {
            // Call the server method via AJAX to fetch data//
            frappe.call({
                method: "masar_assets.api.get_qr_code",
                args: { name: asset },
                callback: (response) => {
                    // Handle the response here and display the result
                    let resultContainer = $("#result-container");
                    resultContainer.empty();
    
                    if (response.message && response.message.length > 0) {
                        let message = "<b>Result:</b><br><table class='datatable'><thead><tr><th style='width:500px'>Asset ID</th><th style='width:200px'>Asset Name</th><th style='width:200px'>Item Code</th><th style='width:200px'>Item Name</th><th style='width:500px'>Location</th><th style='width:200px'>Department</th><th style='width:200px'>Custodian</th><th style='width:200px'>Asset Image</th><th style='width:200px'>Qr Code</th><th style='width:200px'>Asset Status</th></tr></thead><tbody>";
                        $.each(response.message, (index, item) => {
                            message += `<tr><td>${item.name}</td><td>${item.asset_name}</td><td>${item.item_code}</td><td>${item.item_name}</td><td>${item.location}</td><td>${item.department}</td><td>${item.custodian}</td><td><img src="${item.image}" style="max-width: 100px; max-height: 100px;"></td><td><img src="${item.custom_qr_code_text}" style="max-width: 100px; max-height: 100px;"></td><td>${item.status}</td></tr>`; 
                        });
                        message += "</tbody></table>";
    
                        resultContainer.html(message);
                        $('.datatable').DataTable();

                        // Display QR code
                        if (response.custom_qr_code_text) {
                            $("#qr_code_image").html(`<img src="${response.custom_qr_code_text}">`);
                        }
                    } else {
                        resultContainer.html("No data found for the given asset ID.");
                    }
                }
            });
        }
    }
}

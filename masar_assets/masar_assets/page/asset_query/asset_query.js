// frappe.pages['asset-query'].on_page_load = function(wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Asset Query',
// 		single_column: true
// 	});
// }
frappe.pages['asset-query'].on_page_load = function(wrapper) {
    new MyPage(wrapper);
};

class MyPage {
    constructor(wrapper) {
        this.wrapper = $(wrapper);
        this.page = frappe.ui.make_app_page({
            parent: wrapper,
            title: 'Asset Query',
            single_column: true
        });
        this.selectedLocation = '';
        this.selectedCategory = '';
        this.make();
    }

    make() {
        const body = `
            <h1>Asset Query</h1>
            <button type="button" id="asset-button">By Asset</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" id="location-button">By Location</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" id="category-button">By Category</button><br><br>
            <form id="asset-form" style="display: none;"> 
                <label for="asset-input">ID:</label>
                <input type="text" id="asset-input" name="asset"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" id="asset-back-button">Back</button><br><br><br><br>
            </form>
            <form id="location-form" style="display: none;">
                <label for="location" style="margin-right: 10px;">Location:</label>
                <select id="location" name="location">
                    <option value="">Select Location</option>
                </select> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" id="start-new-process-button">Get Assets</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" id="location-back-button">Back</button><br><br><br><br>
            </form>
            <form id="category-form" style="display: none;">
                <label for="category" style="margin-right: 10px;">Category:</label>
                <select id="category" name="category">
                    <option value="">Select Category</option>
                </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" id="get-new-asset-by-category">Get Assets</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" id="category-back-button">Back</button><br><br><br><br>
            </form>
            <p>Enter the Asset ID, and the information will be displayed automatically.</p><br><br>
            <div id="result-container"></div>
            <div id="location-result-container"></div>
            <div id="category-result-container"></div>
        `;
        this.page.main.html(body);

        // Event listeners
        $("#asset-button").on("click", () => {
            $("#asset-button").hide();
            $("#asset-form").show();
            $("#location-button").hide();
            $("#result-container").show();
            $("#category-button").hide();
        });

        $("#category-button").on("click", () => {
            $("#asset-button").hide();
            $("#asset-form").hide();
            $("#location-button").hide();
            $("#result-container").hide();
            $("#category-button").hide();
            $("#category-form").show();
        });

        $("#category-back-button").on("click", () => {
            $("#asset-button").show();
            $("#asset-form").hide();
            $("#location-button").show();
            $("#result-container").hide();
            $("#category-button").show();
            $("#category-form").hide();
            $("#category-result-container").hide();
        });

        $("#asset-back-button").on("click", () => {
            $("#asset-button").show();
            $("#asset-form").hide();
            $("#location-button").show();
            $("#result-container").hide();
            $("#category-button").show();
        });

        $("#location-back-button").on("click", () => {
            $("#location-form").hide();
            $("#asset-button").show();
            $("#location-button").show();
            $("#result-container").hide();
            $("#location-result-container").hide();
            $("#category-button").show();
        });

        $("#location-button").on("click", () => {
            $("#asset-button").hide();
            $("#location-form").show();
            $("#asset-form").hide();
            $("#location-button").hide();
            $("#result-container").hide();
            $("#category-button").hide();
        });

        $("#get-new-asset-by-category").on("click", () => {
            $("#category-result-container").show();
            let category = $("#category").val();
            if (!category) {
                frappe.msgprint("Please select a Category before starting the process.");
                return;
            }
            this.selectedCategory = category;
            this.getAssetInCategory();
        });

        $("#start-new-process-button").on("click", () => {
            $("#location-result-container").show();
            let location = $("#location").val();
            if (!location) {
                frappe.msgprint("Please select a Location before starting the process.");
                return;
            }
            this.selectedLocation = location;
            this.GetAssetInThisLocation();
        });

        $("#asset-input").on("keypress", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                this.submitForm();
                $("#asset-input").val("");
            }
        });

        this.populateLocationDropdown();
        this.GetAssetCategoryOptions();
    }

    getAssetInCategory() {
        let category = $("#category").val();
        frappe.call({
            method: "masar_assets.api.get_asset_in_category",
            args: { category: category },
            callback: (response) => {
                let resultContainer = $("#category-result-container");
                resultContainer.empty();

                if (response.message && response.message.length > 0) {
                    let message = `
                        <b>Result:</b>
                        <br>
                        <table class='datatable'>
                            <thead>
                                <tr>
                                    <th style='width:200px'>Asset ID</th>
                                    <th style='width:200px'>Asset Name</th>
                                    <th style='width:200px'>Item Code</th>
                                    <th style='width:200px'>Item Name</th>
                                    <th style='width:200px'>Location</th>
                                    <th style='width:200px'>Asset Category</th>
                                    <th style='width:200px'>Department</th>
                                    <th style='width:200px'>Custodian</th>
                                    <th style='width:200px'>Asset Image</th>
                                    <th style='width:200px'>QR Code</th>
                                    <th style='width:200px'>Asset Status</th>
                                </tr>
                            </thead>
                            <tbody>`;

                    $.each(response.message, (index, item) => {
                        message += `
                            <tr>
                                <td>${item.name || ''}</td>
                                <td>${item.asset_name || ''}</td>
                                <td>${item.item_code || ''}</td>
                                <td>${item.item_name || ''}</td>
                                <td>${item.location || ''}</td>
                                <td>${item.asset_category || ''}</td>
                                <td>${item.department || ''}</td>
                                <td>${item.custodian || ''}</td>
                                <td><img src="${item.image || ''}" style="max-width: 100px; max-height: 100px;"></td>
                                <td><img src="${item.custom_qr_code_text || ''}" style="max-width: 100px; max-height: 100px;"></td>
                                <td>${item.status || ''}</td>
                            </tr>`;
                    });

                    message += `</tbody></table>`;
                    resultContainer.html(message);
                    $('.datatable').DataTable();

                    // Display QR code if available
                    if (response.custom_qr_code_text) {
                        $("#qr_code_image").html(`<img src="${response.custom_qr_code_text || ''}">`);
                    }
                } else {
                    resultContainer.html("No data found for the selected category.");
                }
            }
        });
    }

    GetAssetInThisLocation() {
        let location = $("#location").val();
        frappe.call({
            method: "masar_assets.api.get_asset_in_this_location",
            args: { location: location },
            callback: (response) => {
                let resultContainer = $("#location-result-container");
                resultContainer.empty();

                if (response.message && response.message.length > 0) {
                    let message = `
                        <b>Result:</b>
                        <br>
                        <table class='datatable'>
                            <thead>
                                <tr>
                                    <th style='width:200px'>Asset ID</th>
                                    <th style='width:200px'>Asset Name</th>
                                    <th style='width:200px'>Item Code</th>
                                    <th style='width:200px'>Item Name</th>
                                    <th style='width:200px'>Location</th>
                                    <th style='width:200px'>Asset Category</th>
                                    <th style='width:200px'>Department</th>
                                    <th style='width:200px'>Custodian</th>
                                    <th style='width:200px'>Asset Image</th>
                                    <th style='width:200px'>QR Code</th>
                                    <th style='width:200px'>Asset Status</th>
                                </tr>
                            </thead>
                            <tbody>`;

                    $.each(response.message, (index, item) => {
                        message += `
                            <tr>
                                <td>${item.name || ''}</td>
                                <td>${item.asset_name || ''}</td>
                                <td>${item.item_code || ''}</td>
                                <td>${item.item_name || ''}</td>
                                <td>${item.location || ''}</td>
                                <td>${item.asset_category || ''}</td>
                                <td>${item.department || ''}</td>
                                <td>${item.custodian || ''}</td>
                                <td><img src="${item.image || ''}" style="max-width: 100px; max-height: 100px;"></td>
                                <td><img src="${item.custom_qr_code_text || ''}" style="max-width: 100px; max-height: 100px;"></td>
                                <td>${item.status || ''}</td>
                            </tr>`;
                    });

                    message += `</tbody></table>`;
                    resultContainer.html(message);
                    $('.datatable').DataTable();

                    // Display QR code if available
                    if (response.custom_qr_code_text) {
                        $("#qr_code_image").html(`<img src="${response.custom_qr_code_text || ''}">`);
                    }
                } else {
                    resultContainer.html("No data found for the selected location.");
                }
            }
        });
    }

    GetAssetCategoryOptions() {
        frappe.call({
            method: "masar_assets.api.get_category",
            callback: (response) => {
                let options = '<option value="">Select Category</option>';
                response.message.forEach((category) => {
                    options += `<option value="${category.name}">${category.name}</option>`;
                });
                $("#category").html(options);
                if (this.selectedCategory) {
                    $("#category").val(this.selectedCategory);
                }
            }
        });
    }

    populateLocationDropdown() {
        frappe.call({
            method: "masar_assets.api.get_location",
            callback: (response) => {
                let options = '<option value="">Select Location</option>';
                response.message.forEach((item) => {
                    options += `<option value="${item.name}">${item.name}</option>`;
                });
                $("#location").html(options);
                if (this.selectedLocation) {
                    $("#location").val(this.selectedLocation);
                }
            }
        });
    }

    submitForm() {
        let asset = $("#asset-input").val().trim();
        if (!asset) return;

        frappe.call({
            method: "masar_assets.api.get_qr_code_query",
            args: { name: asset },
            callback: (response) => {
                let resultContainer = $("#result-container");
                resultContainer.empty();

                if (response.message && response.message.length > 0) {
                    let message = `
                        <b>Result:</b>
                        <br>
                        <table class='datatable'>
                            <thead>
                                <tr>
                                    <th style='width:200px'>Asset ID</th>
                                    <th style='width:200px'>Asset Name</th>
                                    <th style='width:200px'>Item Code</th>
                                    <th style='width:200px'>Item Name</th>
                                    <th style='width:200px'>Location</th>
                                    <th style='width:200px'>Asset Category</th>
                                    <th style='width:200px'>Department</th>
                                    <th style='width:200px'>Custodian</th>
                                    <th style='width:200px'>Asset Image</th>
                                    <th style='width:200px'>QR Code</th>
                                    <th style='width:200px'>Asset Status</th>
                                </tr>
                            </thead>
                            <tbody>`;

                    $.each(response.message, (index, item) => {
                        message += `
                            <tr>
                                <td>${item.name || ''}</td>
                                <td>${item.asset_name || ''}</td>
                                <td>${item.item_code || ''}</td>
                                <td>${item.item_name || ''}</td>
                                <td>${item.location || ''}</td>
                                <td>${item.asset_category || ''}</td>
                                <td>${item.department || ''}</td>
                                <td>${item.custodian || ''}</td>
                                <td><img src="${item.image || ''}" style="max-width: 100px; max-height: 100px;"></td>
                                <td><img src="${item.custom_qr_code_text || ''}" style="max-width: 100px; max-height: 100px;"></td>
                                <td>${item.status || ''}</td>
                            </tr>`;
                    });

                    message += `</tbody></table>`;
                    resultContainer.html(message);
                    $('.datatable').DataTable();

                    // Display QR code if available
                    if (response.custom_qr_code_text) {
                        $("#qr_code_image").html(`<img src="${response.custom_qr_code_text || ''}">`);
                    }
                } else {
                    resultContainer.html("No data found for the given asset ID.");
                }
            }
        });
    }
}

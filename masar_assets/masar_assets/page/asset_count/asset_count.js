frappe.pages['asset-count'].on_page_load = function(wrapper) {
    new MyPage(wrapper);
}

class MyPage {
    constructor(wrapper) {
        this.page = frappe.ui.make_app_page({
            parent: wrapper,
            single_column: true
        });
        this.locationSelected = false; 
        this.selectedLocation = null;
        this.DocName = null; 
        this.AssetPostionStatus = null; 
        this.AssetPostionStatusColor = null;
        this.make();
    }

    make() {
        const body = `
            <h1>Asset Count</h1>
            <h3>Asset ID</h3>
            <form id="location-form" style="display: flex; align-items: center;">
                <label for="location" style="margin-right: 10px;">Location:</label>
                <select id="location" name="location">
                    <option value="">Select Location</option>
                </select>
                <button type="button" id="start-process-button" style="margin-left: 10px;">Start Process</button>
            </form>

            <form id="asset-form" style="display: none;">
                <label for="asset-input">ID:</label>
                <input type="text" id="asset-input" name="asset">
                <button type="button" id="end-process-button">End Process</button><br><br>
            </form>

            <p>Enter the Asset ID, and the information will be displayed automatically.</p><br><br>
            <div id="result-container"></div> <!-- Container to display the result -->
        `;
        $(body).appendTo(this.page.main);

        $("#asset-input").on("keypress", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                this.submitForm();
            }
        });

        $("#start-process-button").on("click", () => {
            if (!this.locationSelected) {
                frappe.msgprint("Please select a location before starting the process.");
                return;
            }
            this.selectedLocation = $("#location").val();
            frappe.call({
                method: "masar_assets.api.create_asset_count",
                args: {
                    location: this.selectedLocation 
                },
                callback: (response) => {
                    this.DocName = response.message ; 
                }
            });
            $("#asset-form").show(); 
            $("#location-form").hide(); 
            $("#start-process-button").hide(); 
        });

        $("#end-process-button").on("click", () => {
            frappe.call({
                method: 'masar_assets.api.submit_asset_count', 
                args:{
                    doc_name: this.DocName,
                    selected_location: this.selectedLocation ,
                },
                callback: (response) => {  
                }
            });
            $("#asset-form").hide(); 
            $("#location-form").show();
            $("#start-process-button").show();
        });
        this.populateLocationDropdown();
        $("#location").on("change", () => {
            this.locationSelected = ($("#location").val() !== "");
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
        let asset = $("#asset-input").val();

        if (asset) {
            frappe.call({
                method: 'masar_assets.api.insert_asset_in_table', 
                args:{
                    doc_name: this.DocName,
                    asset : asset,
                    selected_location: this.selectedLocation ,
                },
                callback: (response) => {
                }
            });
            frappe.call({
                method: "masar_assets.api.get_qr_code",
                args: { selected_location: this.selectedLocation, name: asset },
                callback: (response) => {
                    this.AssetPostionStatus = response.message.status;
                    if (response.message.status === 'Match') {
                        this.AssetPostionStatusColor = 'green';
                    } else if (response.message.status === 'Additional') {
                        this.AssetPostionStatusColor = 'orange';
                    }
                    let resultContainer = $("#result-container");
                    resultContainer.empty();
                    if (response.message && response.message.result.length > 0) {
                        let message = `
                        <b>Result:</b>
                        <br>
                        <table class='datatable'>
                            <thead>
                                <tr>
                                    <th style='width:500px'>Asset ID</th>
                                    <th style='width:180px'>Asset Name</th>
                                    <th style='width:180px'>Item Code</th>
                                    <th style='width:180px'>Item Name</th>
                                    <th style='width:300px'>Location</th>
                                    <th style='width:200px'>Department</th>
                                    <th style='width:200px'>Asset Image</th>
                                    <th style='width:200px'>QR Code</th>
                                    <th style='width:200px'>Asset Status</th>
                                    <th style='width:250px'>Asset Count Status</th>
                                </tr>
                            </thead>
                        <tbody>`;
                        $.each(response.message.result, (index, item) => {
                            message += `<tr>
                                            <td>${item.name}</td>
                                            <td>${item.asset_name}</td>
                                            <td>${item.item_code}</td>
                                            <td>${item.item_name}</td>
                                            <td>${item.location}</td>
                                            <td>${item.department == null ? '' : item.department }</td>
                                            <td><img src="${item.image}" style="max-width: 100px; max-height: 100px;">
                                            </td><td><img src="${item.custom_qr_code_text}" style="max-width: 100px; max-height: 100px;">
                                            </td><td>${item.status}</td>
                                            <td style="color: ${this.AssetPostionStatusColor}"><b>${this.AssetPostionStatus}</b></td>
                                        </tr>`;
                        });
                        message += "</tbody></table>";
                        resultContainer.html(message);
                        $('.datatable').DataTable();
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

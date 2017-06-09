sap.ui.define(
	["sap/ui/core/mvc/Controller",
	'sap/m/MessageBox'],
	function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("sap.ui.demo.cart.controller.BaseController", {

		/**
		 * Convenience method for accessing the router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		/**
		 * Convenience method for getting the view model by name.
		 * @public
		 * @param {string} [sName] the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Getter for the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},
		
		onSwitchDeviceButtonPress: function(){
			var oCartModel = this.getView().getModel("cartProducts");

			//all relevant cart properties are set back to default. Content is deleted.
			var cartEntries = oCartModel.getProperty("/cartEntries");
			var aProducts = [];
			var aQuantities = [];

			for (var entry in cartEntries){
				if (!cartEntries.hasOwnProperty(entry)) {
					continue;
				}
				aProducts.push(cartEntries[entry]["ProductId"]);
				aQuantities.push(cartEntries[entry]["Quantity"]);
			}
			
			var currentHash = sap.ui.core.routing.HashChanger.getInstance().getHash();
			
			// we add all products, all quanitites and the current hash to the url
			// refer to WelcomeController._loadCardFromUrl for resolvement
			var oParameters = { 
				"query" : {
					"products":aProducts.join(","),
					"quantities":aQuantities.join(","),
					"navTarget":encodeURIComponent(currentHash)
				}
			};
			
			var sUrl = window.location.origin + 
					window.location.pathname + 
					"#/" + 
					this.getRouter().getURL("home", oParameters);
			MessageBox.show("URL: " + sUrl);
		}

	});
});
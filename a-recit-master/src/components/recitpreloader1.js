(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Define class for restoring.
 *
 * @package     VRtopics
 * @copyright   RECITFAD
 * @author      RECITFAD
 * @originalauthor	gladeye/aframe-preloader-component https://www.npmjs.com/package/@gladeye/aframe-preloader-component
 * @license     {@link http://www.gnu.org/licenses/gpl-3.0.html} GNU GPL v3 or later
 */


	/* global AFRAME */

	if (typeof AFRAME === 'undefined') {
	    throw new Error('Component attempted to register before AFRAME was available.');
	}

	// First, checks if it isn't implemented yet.
	if (!String.prototype.format) {
	    String.prototype.format = function() {
	        var args = arguments;
	        return this.replace(/{(\d+)}/g, function(match, number) {
	            return typeof args[number] != 'undefined'
	                ? args[number]
	                : match
	                ;
	        });
	    };
	}

	/**
	 * Visual preloader system for A-Frame.
	 *
	 * When applied to the <scene> will automatically display a preloader modal that reflects the current loading progress
	 * of resources in <a-assets> that have been flagged for preloading and will auto-close the modal when it reaches 100%.
	 * Alternately, the modal can be manually closed
	 *
	 * Emits a 'preloading-complete' event when done.
	 */
	AFRAME.registerSystem('preloader', {
	    schema: {
	        type: { type: 'string', default: 'bootstrap' }, //type of CSS framework to use - acceptable values are: 'bootstrap' or 'custom'
	        id: {type: 'string', default: 'preloader-modal'}, //ID of the auto injected preloader modal
	        autoInject: { type: 'boolean', default: true }, //whether or not to auto-inject the preloader html into the page
	        target: { type: 'selector', default: '#preloader-modal'}, //the html target selector
	        progressValueAttr:  { type: 'string', default: 'aria-valuenow' },//an attribute of the progress bar to set when progress is updated
	        barProgressStyle: { type: 'string', default: 'width'}, //target css style to set as a percentage on the bar
	        bar: { type: 'selector', default: '#preloader-modal .progress-bar'}, //html class of progress bar in preloader - used to set the width
	        label: { type: 'selector', default: '#preloader-modal .progress-label'}, //html class of label in preloader - used to set the percentage
	        labelText: { type: 'string', default: '{0}% Chargement termin??e'}, //loading text format {0} will be replaced with the percent progress e.g. 30%
	        autoClose: { type: 'boolean', default: true}, //automatically close preloader by default - not supported if clickToClose is set to 'true'
	        clickToClose: { type: 'boolean', default: false}, //whether the user must click a button to close the modal when preloading is finished
	        closeLabelText: { type: 'string', default: 'Continuer'}, //default label text of click to close button
			consigneText:{ type: 'string', default: 'Continuer'},
	        title: { type: 'string', default: ''}, //title of preloader modal
	        debug: { type: 'boolean', default: false}, //whether or not to enable logging to console
	        disableVRModeUI: { type: 'boolean', default: true}, //whether or not to disable VR Mode UI when preloading
	        slowLoad: { type: 'boolean', default: false}, //deliberately slow down the load progress by adding 2 second delays before updating progress - used to showcase loader on fast connections and should not be enabled in production
	        doneLabelText: { type: 'string', default: 'L\'activit?? est maintenait disponible'} //text to set on label when loading is complete
	    },

	    /**
	     * Set if component needs multiple instancing.
	     */
	    multiple: false,

	    loadedAssetCount: 0, //total number of assets loaded
	    totalAssetCount: 0, //total number of assets to load
	    slowLoadTimeAssetUpdate: 1000, //length of time to slow down asset load progress if slowLoad is set to 'true'
	    slowLoadTimePreloadFinish: 4000, //length of time to slow down preload finish if slowLoad is set to 'true'

	    /**
	     * Called once when component is attached. Generally for initial setup.
	     */
	    init: function () {

	        if(this.data.debug){
	            console.log('Initialized preloader');
	        }

	        if(this.data.type === 'bootstrap' && typeof $ === 'undefined'){
	            console.error('jQuery is not present, cannot instantiate Bootstrap modal for preloader!');
	        }

	        document.querySelector('a-assets').addEventListener('loaded',function(){
	            if(this.data.debug){
	                console.info('All assets loaded');
	            }
	            this.triggerProgressComplete();

	        }.bind(this));

	        var assetItems = document.querySelectorAll('a-assets a-asset-item,a-assets img,a-assets audio,a-assets video');

	        this.totalAssetCount = assetItems.length;

	        this.watchPreloadProgress(assetItems);

	        if(!this.data.target && this.data.autoInject){
	            if(this.data.debug){
	                console.info('No preloader html found, auto-injecting');
	            }
	            this.injectHTML();
	        }else{
	            switch(this.data.type){
	                case 'bootstrap':
	                    this.initBootstrapModal($(this.data.target));
	                    break;
	                default:
	                    //do nothing
	                    break;
	            }
	        }

	        if(this.data.disableVRModeUI){
	            this.el.setAttribute('vr-mode-ui','enabled','false');
	        }
	    },

	    /**
	     * Called when component is attached and when component data changes.
	     * Generally modifies the entity based on the data.
	     */
	    update: function (oldData) { },

	    /**
	     *
	     * @param assetItems A NodeList with a list of <a-asset-item> elements that you wish to watch
	     */
	    watchPreloadProgress: function(assetItems){
	        for (var a = 0; a < assetItems.length; a++) {

	            var eventName;

	            switch(assetItems[a].nodeName){
	                case 'A-ASSET-ITEM':
	                    eventName = 'loaded';
	                    break;
	                case 'img':
	                    eventName = 'load';
	                    break;
	                case 'audio':
	                case 'video':
	                    eventName = 'loadeddata';
	                    break;
	            }

	            assetItems[a].addEventListener(eventName,function(e){
	                this.loadedAssetCount++;
	                if(this.data.debug) {
	                    console.info('Loaded ' + this.loadedAssetCount + '/' + this.totalAssetCount + ' asset items');
	                }
	                this.onAssetLoaded();
	            }.bind(this));
	        }
	    },

	    onAssetLoaded: function(){
	        if(this.loadedAssetCount === this.totalAssetCount){
	            this.triggerProgressComplete();
	        }else{
	            var percentage = Math.floor(this.loadedAssetCount/this.totalAssetCount*100);
	            if(this.data.slowLoad) {
	                setTimeout(function () {
	                    this.drawProgress(percentage);
	                }.bind(this), this.slowLoadTimeAssetUpdate)
	            }else{
	                this.drawProgress(percentage);
	            }
	        }
	    },

	    triggerProgressComplete: function(){

	        if(this.data.slowLoad){
	            setTimeout(function(){
	                if(this.data.type === 'bootstrap') $(this.data.bar).addClass('progress-bar-success');
	                this.drawProgress(100);
	                this.data.target.classList.add('preloader-modal__complete');
	            }.bind(this),this.slowLoadTimePreloadFinish-1000);
	        }else{
	            if(this.data.type === 'bootstrap') $(this.data.bar).addClass('progress-bar-success');
	            this.drawProgress(100);
	            //this.data.target.classList.add('preloader-modal__complete');
	        }

	        if(this.data.autoClose && !this.data.clickToClose){
	            if(this.data.slowLoad){
	                setTimeout(function(){
	                    this.triggerPreloadingComplete();
	                    this.closeModal();
	                }.bind(this),this.slowLoadTimePreloadFinish)
	            }else{
	                this.triggerPreloadingComplete();
	                this.closeModal();
	            }

	        }else{
	            if(this.closeBtn && this.data.clickToClose){
	                if(this.data.slowLoad){
	                    setTimeout(function(){
	                        this.closeBtn.setAttribute('style','display: inline-block');
	                    }.bind(this),this.slowLoadTimePreloadFinish)
	                }else{
	                    this.closeBtn.setAttribute('style','display: inline-block');
	                }

	            }
	        }
	    },

	    drawProgress: function(percentage){
	        //update loading bar if exists
	        if(this.data.label){
	            this.data.label.innerHTML = (percentage === 100) ? this.data.doneLabelText : this.data.labelText.format(percentage);
	        }

	        if(this.data.bar){
	            this.data.bar.setAttribute(this.data.progressValueAttr,percentage);
	            this.data.bar.setAttribute('style',this.data.barProgressStyle+':'+percentage+'%');
	        }
	    },

	    injectHTML: function(){
	        switch(this.data.type){
	            case 'bootstrap':
	                this.injectBootstrapModal();
	                break;
	            default:
	                //do nothing
	                break;
	        }
	    },

	    injectBootstrapModal: function(){

	        if(this.data.debug){
	            console.info('Injecting bootstrap modal');
	        }

	       
	            var $modal = $('' +
				'<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'+
 '<div class="modal-dialog modal-dialog-centered" role="document">'+
    '<div class="modal-content">'+
     ' <div class="modal-header">'+
	 '<h4 class="modal-title"> Le monte-charge'+this.data.title+'</h4>'+
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
          '<span aria-hidden="true">&times;</span>'+
        '</button>'+
      '</div>'+
     ' <div class="modal-body">'+
	 '<div class="progress">'+
	 '<div class="progress-bar progress-bar bg-success active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 25%">'+
	 '<span class="progress-label">Loading 0% Complete</span>'+
	 '</div>'+
	 '</div>'+
	 '<div class="p-2">'+
	 this.data.consigneText +
					'</div>'+
					'</div>'+
					' </div>'+
     ' <div class="modal-footer">'+
       
    
      '</div>'+
   ' </div>'+
 ' </div>'+
'</div>'+
	               
	                '');
		        

	        $('body').append($modal);

	        this.data.target = $modal[0];
	        this.data.label = $modal.find('.progress-label')[0];
	        this.data.bar = $modal.find('.progress-bar')[0];

	        this.initBootstrapModal($modal);
	    },

	    initBootstrapModal: function($modal){
	        $modal.modal({
	            backdrop: 'static',
	            keyboard: false
	        });

	        if(!this.data.title){
	            var $modalStyle = $('<style>' +
	                '.vertical-align {'+
	                'display: flex;'+
	                'align-items: center;'+
	                '}'+
	                '.modal-dialog__full {'+
	                'width: 100%;'+
	                'height: 100%;'+
	                'margin: 0;'+
	                'padding: 0;'+
	                '}'+
	                '.modal-dialog__full .modal-content {'+
	                'height: auto;'+
	                'min-height: 100%;'+
	                'border-radius: 0;'+
	                '}' +
	                '</style>');
	            $('head').append($modalStyle);
	        }

	        if(this.data.clickToClose){
	            var $closeBtn = $modal.find('[data-dismiss=modal]');

	            if($closeBtn.length > 0){
	                this.closeBtn = $closeBtn[0];

	                this.closeBtn.setAttribute('style','display: none');

	                $modal.on('hidden.bs.modal', function (e) {
	                    this.triggerPreloadingComplete();
	                }.bind(this))
	            }else{
	                console.error('No Bootstrap modal close button is set in the HTML. Please add a button with the data-dismiss="modal" attribute to use clickToClose.');
	            }
	        }
	    },

	    triggerPreloadingComplete: function(){
	        if(this.data.debug){
	            console.info('Preloading complete');
	        }
	        if(this.data.disableVRModeUI){
	            this.el.setAttribute('vr-mode-ui','enabled','true');
	        }
	        this.el.emit('preloading-complete');
	    },

	    closeModal: function(){
	        switch(this.data.type){
	            case 'bootstrap':
	                $(this.data.target).modal('hide');
	                break;
	            default:
	                //do nothing
	                break;
	        }
	    }
	});


},{}]},{},[1]);

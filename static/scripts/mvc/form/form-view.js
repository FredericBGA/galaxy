define(["utils/utils","mvc/ui/ui-portlet","mvc/ui/ui-misc","mvc/form/form-section","mvc/form/form-data"],function(a,b,c,d,e){return Backbone.View.extend({initialize:function(a){this.model=new Backbone.Model({initial_errors:!1,cls:"ui-portlet-limited",icon:null,always_refresh:!0,status:"warning",hide_operations:!1,onchange:function(){}}).set(a),this.setElement("<div/>"),this.render()},update:function(a){var b=this;this.data.matchModel(a,function(a,c){var d=b.input_list[c];if(d&&d.options&&!_.isEqual(d.options,a.options)){d.options=a.options;var e=b.field_list[c];if(e.update){var f=[];if(-1!=["data","data_collection","drill_down"].indexOf(d.type))f=d.options;else for(var g in a.options){var h=a.options[g];h.length>2&&f.push({label:h[0],value:h[1]})}e.update(f),e.trigger("change"),Galaxy.emit.debug("form-view::update()","Updating options for "+c)}}})},wait:function(a){for(var b in this.input_list){var c=this.field_list[b],d=this.input_list[b];d.is_dynamic&&c.wait&&c.unwait&&c[a?"wait":"unwait"]()}},highlight:function(a,b,c){var d=this.element_list[a];if(d&&(d.error(b||"Please verify this parameter."),this.portlet.expand(),this.trigger("expand",a),!c)){var e=this.$el.parents().filter(function(){return-1!=["auto","scroll"].indexOf($(this).css("overflow"))}).first();e.animate({scrollTop:e.scrollTop()+d.$el.offset().top-120},500)}},errors:function(a){if(this.trigger("reset"),a&&a.errors){var b=this.data.matchResponse(a.errors);for(var c in this.element_list){{this.element_list[c]}b[c]&&this.highlight(c,b[c],!0)}}},render:function(){var a=this;this.off("change"),this.off("reset"),this.field_list={},this.input_list={},this.element_list={},this.data=new e.Manager(this),this._renderForm(),this.data.create(),this.model.get("initial_errors")&&this.errors(this.model.attributes);var b=this.data.checksum();return this.on("change",function(c){var d=a.input_list[c];if(!d||d.refresh_on_change||a.model.get("always_refresh")){var e=a.data.checksum();e!=b&&(b=e,a.model.get("onchange")())}}),this.on("reset",function(){_.each(a.element_list,function(a){a.reset()})}),this},_renderForm:function(){$(".tooltip").remove();var a=this.model.attributes;this.message=new c.UnescapedMessage,this.section=new d.View(this,{inputs:a.inputs}),this.portlet=new b.View({icon:a.icon,title:a.title,cls:a.cls,operations:!a.hide_operations&&a.operations,buttons:a.buttons,collapsible:a.collapsible,collapsed:a.collapsed,onchange_title:a.onchange_title}),this.portlet.append(this.message.$el),this.portlet.append(this.section.$el),this.$el.empty(),a.inputs&&this.$el.append(this.portlet.$el),a.message&&this.message.update({persistent:!0,status:a.status,message:a.message}),Galaxy.emit.debug("form-view::initialize()","Completed")}})});
//# sourceMappingURL=../../../maps/mvc/form/form-view.js.map
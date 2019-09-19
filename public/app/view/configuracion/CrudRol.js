Geper.Cmp.CrudRol={
    getWinAdd:function(st){
        this.permisos=[];
        this.base = Ext.getDom('base').value;
        var me=this;
        var root = new Ext.tree.AsyncTreeNode({	//Paso 3
            expanded: true
        });
        var loader = new Ext.tree.TreeLoader({		//Paso 1
            url: this.base+'/configuracion/modulo/arbol_modulos_con_acciones'
        });
        var tree = new Ext.tree.TreePanel({     //step 1
            border: false,
            autoScroll:true,
            useArrows:true,
            animate:true,
            enableDD:true,
            containerScroll: true,
            rootVisible: false,
            root: root,
            loader:loader,
            listeners: {
                'checkchange': function(node, checked){
                    if(checked){
                       me.permisos.push(node.id)
                    }else{
                        me.permisos.remove(node.id)
                    }
                }
            }
        });

        var form = new Ext.FormPanel({
            layout:'border',

            baseParams: {
                acciones:Ext.encode(me.permisos)
            },
            bodyStyle:'padding:5px 5px 0',
            defaultType: 'textfield',
            items: [
                {
                    region: 'center',
                    xtype: 'panel',
                    width: 300,
                    title: 'Permisos',
                    items: [tree]
                },
                {
                    region: 'west',
                    xtype: 'panel',
                    layout:'form',
                    collapsible: false,
                    padding:10,
                    width: 300,
                    items:[
                        {
                            xtype:'textfield',
                            fieldLabel:'Denominación',
                            name:'nombre',
                            id:'nombre_rol',
                            allowBlank:false,
                            width: '95%'
                        },
                        {
                            fieldLabel:'Descripción',
                            xtype: 'textarea',
                            name: 'descripcion',
                            id:'descripcion_rol',
                            anchor: '98% -60'  // anchor width by percentage and height by raw adjustment
                        }
                    ]
                }
            ]
        });
        var win = new Ext.Window({
            layout:'fit',
            title: 'Adicionar Rol',
            closeAction:'close',
            modal:true,
            items:[form],
            width: 600,
            height:400,
            buttons: [{
                text:'Aceptar',
                handler: function(){
                    if(me.permisos.length == 0)
                    {
                        Ext.Msg.show({
                            title: 'Error',
                            msg: 'Debe seleccionar al menos un permiso',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                    }
                    else
                    {
                        me.insertarRol(form,win,st)
                    }
                }
            },{
                text: 'Cerrar',
                handler: function(){
                    form.getForm().reset();
                    win.close();
                }
            }]
        });
        return win;
    },
    insertarRol:function(form,win,st){
        var me = this;
        if(!form.getForm().isValid())
        {
            Ext.Msg.show({
                title: 'Error',
                msg: 'Existen campos inv\xe1lidos o vacios',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
        else
        {
            Ext.Msg.wait('Adicionando el rol... por favor espere!');
            Ext.Ajax.request({
                url: this.base+'/configuracion/rol/insertar',
                params: {
                    acciones:Ext.encode(me.permisos),
                    nombre:  Ext.get('nombre_rol').getValue(),
                    descripcion:  Ext.get('descripcion_rol').getValue()
                },
                callback: function (options, success, response) {
                    Ext.Msg.hide();
                    if (success) {
                        var info = Ext.decode(response.responseText);
                        if (info.success) {
                            win.close();
                            st.reload();
                            Ext.example.msg('Modificar', info.msg);
                        }
                        else
                            Ext.Msg.show({title:'Error',msg:info.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.ERROR});
                    }
                    else
                        Ext.Msg.show({title:'Error',msg:'Fall\xf3 la conecci\xf3n con el servidor',buttons:Ext.Msg.OK,icon:Ext.Msg.ERROR});
                }
            });
        }
    },
    eliminarRol:function(gd,st){
        Ext.Msg.wait('Eliminando el rol... por favor espere!');
        this.base = Ext.getDom('base').value;
        Ext.Ajax.request({
            url: this.base+'/configuracion/rol/eliminar',
            params: {
                id_rol: gd.getSelectionModel().getSelected().json.id_rol
            },
            callback: function (options, success, response) {
                Ext.Msg.hide();
                if (success) {
                    var info = Ext.decode(response.responseText);
                    if (info.success) {
                        st.reload();
                        Ext.Msg.show({
                            title: 'Información',
                            msg: info.msg,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                    }
                    else
                        Ext.example.msg('Error', info.msg);
                }
            }
        });
    },
    getWinMod:function(st,record){
        this.permisos=[];
        this.base = Ext.getDom('base').value;
        var me=this;
        var root = new Ext.tree.AsyncTreeNode({	//Paso 3
            expanded: true
        });
        var loader = new Ext.tree.TreeLoader({		//Paso 1
            url: this.base+'/configuracion/modulo/arbol_modulos_con_acciones_marcadas_rol',
            baseParams:{id_rol: record.json.id_rol},
            listeners:{
                load : function( el,  node, response ){
                   var r="";
                    var nodes= Ext.decode(response.responseText);
                    Ext.each(nodes,function(items,index,allItems){
                        var file=items.files;
                        if(items.files=!undefined){
                            Ext.each(file,function(items,index,allItems){
                                if(items.checked && me.permisos.indexOf( items.id )==-1 )
                                {
                                    me.permisos.push(items.id)
                                }
                            })
                        }
                    })
        }

            }
        });
        var tree = new Ext.tree.TreePanel({     //step 1
            border: false,
            autoScroll:true,
            useArrows:true,
            animate:true,
            enableDD:true,
            containerScroll: true,
            rootVisible: false,
            root: root,
            loader:loader,
            listeners: {
                'checkchange': function(node, checked){
                    if(checked){
                        me.permisos.push(node.id)
                    }else{
                        me.permisos.remove(node.id)
                    }
                }
            }

        });

        var form = new Ext.FormPanel({
            layout:'border',

            baseParams: {
                acciones:Ext.encode(me.permisos)
            },
            bodyStyle:'padding:5px 5px 0',
            defaultType: 'textfield',
            items: [
                {
                    region: 'center',
                    xtype: 'panel',
                    width: 300,
                    title: 'Permisos',
                    items: [tree]
                },
                {
                    region: 'west',
                    xtype: 'panel',
                    layout:'form',
                    collapsible: false,
                    padding:10,
                    width: 300,
                    items:[
                        {
                            xtype:'textfield',
                            fieldLabel:'Denominación',
                            name:'rol',
                            id:'mnombre_rol',
                            allowBlank:false,
                            width: '95%'
                        },
                        {
                            fieldLabel:'Descripción',
                            xtype: 'textarea',
                            name: 'descripcion',
                            id:'mdescripcion_rol',
                            anchor: '98% -60'  // anchor width by percentage and height by raw adjustment
                        }
                    ]
                }
            ]
        });
        form.getForm().loadRecord(record);
        var win = new Ext.Window({
            layout:'fit',
            title: 'Modificar Rol',
            closeAction:'close',
            modal:true,
            items:[form],
            width: 600,
            height:400,
            buttons: [{
                text:'Aceptar',
                handler: function(){
                    if(me.permisos.length == 0)
                    {
                        Ext.Msg.show({
                            title: 'Error',
                            msg: 'Debe seleccionar al menos un permiso',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                    }
                    else
                    {
                        me.modificarRol(form,win,st,record.id)
                    }
                }
            },{
                text: 'Cerrar',
                handler: function(){
                    form.getForm().reset();
                    win.close();
                }
            }]
        });
        return win;
    },
    modificarRol:function(form,win,st,id){
        var me = this;
        if(!form.getForm().isValid())
        {
            Ext.Msg.show({
                title: 'Error',
                msg: 'Existen campos inv\xe1lidos o vacios',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
        else
        {
            Ext.Msg.wait('Modificando el rol... por favor espere!');
            Ext.Ajax.request({
                url: this.base+'/configuracion/rol/modificar',
                params: {
                    id:id,
                    acciones:Ext.encode(me.permisos),
                    nombre:  Ext.get('mnombre_rol').getValue(),
                    descripcion:  Ext.get('mdescripcion_rol').getValue()
                },
                callback: function (options, success, response) {
                    Ext.Msg.hide();
                    if (success) {
                        var info = Ext.decode(response.responseText);
                        if (info.success) {
                            win.close();
                            st.reload();
                            Ext.example.msg('Modificar', info.msg);
                        }
                        else
                            Ext.Msg.show({title:'Error',msg:info.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.ERROR});
                    }
                    else
                        Ext.Msg.show({title:'Error',msg:'Fall\xf3 la conecci\xf3n con el servidor',buttons:Ext.Msg.OK,icon:Ext.Msg.ERROR});
                }
            });
        }
    }
};

Ext.ns('Geper.Inicio');
Ext.QuickTips.init();

Geper.Inicio.Componente = {
    init: function(){
        this.base = Ext.getDom('base').value;
        this.form = new Ext.form.FormPanel({
            url: this.base+'/login',
            bodyStyle: 'padding:10px;margin:15px',
            frame:true,
            labelWidth: 80,
            defaults: {
                xtype:'textfield',
                width: 150
            },
            items:[
                // le asignamos la instancia que creamos anteriormente
                {
                    fieldLabel:'Usuario', // creamos un campo
                    name:'user', // a partir de una
                    id:"id-user",
                    allowBlank:false
                },
                {
                    fieldLabel:'Contrase\xf1a', // creamos un campo
                    name:'pass', // a partir de
                    allowBlank:false,
                    inputType: 'password',
                    id:"id-pas"
                }
            ]
        });
        this.win = new Ext.Window({
            id:'mywin',
            title: 'Autenticar',
            width:320,
            height:180,
            frame:true,
            closable:false,//quita el boton de cerrar
            resizable : false,//evita que se cambie el tamanno de la ventana
            draggable:false,//evita que se cambie de posicion la ventana
            items:[this.form],
            keys: [{
                key: Ext.EventObject.ENTER,
                fn: function() {
                    this.sendData()
                },
                scope: this
            }],
            buttons: [{text:'Aceptar',handler:this.sendData,scope:this}]
        });
        this.win.show();
    },
    sendData: function(){
        var me=this;
        //submit the form
       me.form.getForm().submit({
            success: function(form,action){
                window.location = me.base;
            },
            failure: function(form,action){
                switch (action.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        Ext.Msg.show({
                            title: 'Error',
                            msg: 'Existen campos invalidos o vacios',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                        break;
                    case Ext.form.Action.CONNECT_FAILURE:
                        Ext.Msg.show({
                            title: 'Error',
                            msg: 'Fallo la comunicaci\xf3n con el servidor',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                        break;
                    case Ext.form.Action.SERVER_INVALID:
                        Ext.Msg.show({
                            title: 'Error',
                            msg: action.result.msg,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                        break;
                }
            }
        });
    }
}
Ext.onReady(Geper.Inicio.Componente.init,Geper.Inicio.Componente);


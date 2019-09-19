
Ext.QuickTips.init();
Geper.Cmp.Viewport={

    init:function(){
        var base = Ext.getDom('base').value;
        var me =this;
       eval('var mod= '+ Ext.getDom('acciones').value);
        var m=[];
        if(mod.CONFIGURACION!=undefined){
            var moduloconf= Geper.Cmp.Configuracion;
            m.push(moduloconf.cargar(mod.CONFIGURACION))
        }
        if(mod.RRHH!=undefined){
            var modulrs= Geper.Cmp.Persona;
            m.push(modulrs.cargar(mod.RRHH))
        }
            var wmain=new Ext.Viewport({
                layout: 'border',
                autoShow:true,
                items: [
                    {
                        region: 'north',
                        bodyCssClass :'header',
                        height:30,
                        html:'<h1>Sistema de Gestión del Personal</h1>',
                        cls:'header',
                        items: [
                            {
                                xtype:'splitbutton',
                                iconCls: 'apagar',
                                scale: 'medium',
                                menu: [
                                    {text: 'Salir',
                                        iconCls: 'apagar',
                                        handler:function () {
                                            Ext.Msg.confirm('Confirmacion', '\xbfEst\xe1 seguro de cerrar sesión?', function (btn) {
                                                if (btn == "yes") {

                                                    Ext.Ajax.request({
                                                        url: base+'/logout',
                                                        callback: function (options, success, response) {
                                                            Ext.Msg.hide();
                                                            if (success) {
                                                                var info = Ext.decode(response.responseText);
                                                                if (info.success) {
                                                                    window.location = base;
                                                                }
                                                                else
                                                                    Ext.example.msg('Error', info.msg);
                                                            }
                                                        }
                                                    });

                                                }
                                            },this);
                                        }
                                    }],
                                style: {
                                    float:'right',
                                    padding:0
                                }
                            }
                        ]
                    },
                    {
                        region: 'center',
                        xtype: 'tabpanel',
                        activeTab: 0,
                        items: [m]
                    }
                ]
            });


        return wmain;

    },
    cargarModulos:function(mod){

        Ext.each(mod,
            function(i){
                var modulo= Geper.Cmp.Configuracion;
                console.log(i)
            })

    }
};
Ext.onReady(Geper.Cmp.Viewport.init,Geper.Cmp.Viewport);

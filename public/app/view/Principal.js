
Ext.ns('Geper.Cmp');
Geper.Cmp.Principal={

    init:function(){
        var base = Ext.getDom('base').value;
     /*   Ext.DomHelper.append( 'meta', '<script src="'+ base+'app/view/Configuracion.js'+'"></script>' );*/
       /* var wmain=new Ext.Viewport({
            layout: 'border',
            autoShow:true,
            items: [
                {
                    region: 'center',
                    xtype: 'tabpanel',
                    activeTab: 0,
                    items: [n.init()]
                }
            ]
        });*/
    }
};
Ext.onReady(Geper.Cmp.Principal.init,Geper.Cmp.Principal);


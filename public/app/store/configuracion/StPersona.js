Geper.Cmp.StPersona={
    init: function(){
    },
    getStore:function(campos,url){
       this.base = Ext.getDom('base').value;

       var stpers = new Ext.data.JsonStore({
           autoLoad:true,
           fields: campos,
           url: this.base+url,
           root: 'data',
           idProperty: 'id_persona'
        });
        return stpers;
    },
    getCamposDominio:function(){
        return  ['id_persona','nombre','ci','pri_apellido','seg_apellido','user_dominio','email','sexo','no_solapin',
            'nombre_completo'];
    },
    getCamposPersona:function(){
        return  ['id_persona','nombre','ci','pri_apellido','seg_apellido','user_dominio','email','sexo','fecha_alta',
            'fecha_baja','direccion','municipio','provincia','telef_contacto','telef_movil','scolaridad','especialidad',
            'fecha_naci','estado_civil','cant_hijos','lugar_nacimiento','idioma_domina','domina_computacion','organizaciones',
            'nacionalidad','no_solapin','deleted','area','departamento','foto_nombre','local_trabajo','piso','telefono_local',
            'nombre_completo','cargo','salario'];
    },
    getStPersDominio:function(){
        var campos=this.getCamposDominio();
        var store= this.getStore(campos,'/rrhh/personas/personas-del-dominio-sin-sistema');
        store.filterBy(function(record,id){
            return record.get('user_dominio') != '';
        });
        return store;
    },
    getStPersonas:function(){
        var campos=this.getCamposPersona();
        return this.getStore(campos,'/rrhh/personas/all');

    }
};

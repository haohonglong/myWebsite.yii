(function(window,undefined,System){
	if(!System) {
		alert('without nothing the class of System');
		return 0;
	}
	function BiObject(){
		this._hashCode=BiObject._hashCodePrefix+Math.round(Math.random()*1000)+BiObject._hashCodePrefix+BiObject._hashCodeCounter++;
	}
	BiObject._hashCodeCounter=1;
	BiObject._hashCodePrefix="hc";
	BiObject.toHashCode=function(o){
		if(o._hashCode!=null)
			return o._hashCode;
		return o._hashCode=BiObject._hashCodePrefix+Math.round(Math.random()*1000)+BiObject._hashCodePrefix+BiObject._hashCodeCounter++;
	};
	BiObject.prototype={
		'constructor':BiObject,
		'__constructor':function(){},
		'_className':'BiObject',
		'_disposed':false,
		'_id':null,
		'getDisposed':function(){
			return this._disposed;
		},
		'getId':function(){
			return this._id;
		},
		'setId':function(v){
			this._id=v;
		},
		'getUserData':function(){
			return this._userData;
		},
		'setUserData':function(v){
			this._userData=v;
		},
		'toHashCode':function(){
			return BiObject.toHashCode(this);
		},
		'dispose':function(){
			this._disposed=true;
			delete this._userData;
		},
		'toString':function(){
			if(this._className)
				return"[object "+this._className+"]";
			return"[object Object]";
		},
		'getProperty':function(sPropertyName){
			var getterName="get"+sPropertyName.charAt(0).toUpperCase()+sPropertyName.substr(1);
			if("function" === typeof this[getterName])
				return this[getterName]();
			throw new Error("No such property, "+sPropertyName);
		},
		'setProperty':function(sPropertyName,oValue){
			var setterName="set"+sPropertyName.charAt(0).toUpperCase()+sPropertyName.substr(1);
			if("function" === typeof this[setterName])
				this[setterName](oValue);
			else throw new Error("No such property, "+sPropertyName);
		}


	};
	System['BiObject']=BiObject;
})(window,undefined,window[LHH_NAMESPACE_20150715_]);



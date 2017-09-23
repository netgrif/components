define([],function () {
    function HalResource(links) {
        if(links)
            this._links = links;
    }

    HalResource.prototype.link = function (rel) {
        if(!this._links) return null;
        if(this._links[rel]) return this._links[rel].href;
        else return null;
    };

    return HalResource;
});
